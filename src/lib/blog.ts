// Server-only: reads the file system at build time.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { authors, blogCategories, type Author, type BlogCategory } from "@/data/blog";
import { markdownToText, wordCount } from "./markdown";

/**
 * Blog posts live in src/content/blog/<slug>.md as Markdown with a small frontmatter block:
 *
 *   ---
 *   title: Post title (the H1)
 *   seoTitle: Optional shorter <title> (≤ 47 chars)
 *   description: Meta description (≤ 155 chars)
 *   date: 2026-11-18
 *   updated: 2026-11-18        (optional)
 *   category: nbn-guides       (a key from src/data/blog.ts)
 *   author: terralink-team     (a key from src/data/blog.ts)
 *   tags: FTTP, FTTN           (comma-separated)
 *   related: /services/fttp-installation-adelaide, /fttp-upgrade-adelaide   (internal links)
 *   ---
 *
 * Files whose name starts with "_" are drafts and are not published.
 */
const BLOG_DIR = join(process.cwd(), "src", "content", "blog");

export interface Post {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  updated: string;
  category: BlogCategory;
  author: Author;
  tags: string[];
  related: string[];
  body: string;
  words: number;
  readingMinutes: number;
}

function parseFrontmatter(raw: string, file: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

const list = (value?: string) => (value ? value.split(",").map((s) => s.trim()).filter(Boolean) : []);

let cache: Post[] | null = null;

/** All published posts, newest first. */
export function getAllPosts(): Post[] {
  if (cache) return cache;
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  cache = files
    .map((file) => {
      const { data, body } = parseFrontmatter(readFileSync(join(BLOG_DIR, file), "utf8"), file);
      for (const key of ["title", "description", "date", "category", "author"]) {
        if (!data[key]) throw new Error(`${file}: frontmatter "${key}" is required`);
      }
      const category = blogCategories.find((c) => c.slug === data.category);
      if (!category) throw new Error(`${file}: unknown category "${data.category}"`);
      const author = authors[data.author];
      if (!author) throw new Error(`${file}: unknown author "${data.author}"`);
      const words = wordCount(body);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        seoTitle: data.seoTitle || data.title,
        description: data.description,
        date: data.date,
        updated: data.updated || data.date,
        category,
        author,
        tags: list(data.tags),
        related: list(data.related),
        body,
        words,
        readingMinutes: Math.max(1, Math.round(words / 220)),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return cache;
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((post) => post.category.slug === category);
}

/** Related posts: same category first, then shared tags, excluding the current post. */
export function getRelatedPosts(post: Post, limit = 3) {
  const score = (other: Post) =>
    (other.category.slug === post.category.slug ? 2 : 0) + other.tags.filter((t) => post.tags.includes(t)).length;
  return getAllPosts()
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

/** Headings (##) of a post, for its table of contents. */
export function postHeadings(post: Post) {
  return [...post.body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

export function postExcerpt(post: Post, length = 160) {
  const text = markdownToText(post.body);
  return text.length > length ? `${text.slice(0, length).replace(/\s+\S*$/, "")}…` : text;
}
