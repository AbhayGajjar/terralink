import Link from "next/link";
import type { BlogCategory } from "@/data/blog";
import type { Post } from "@/lib/blog";
import Icon from "@/components/ui/Icon";
import styles from "./blog.module.css";

const formatDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

export default function PostList({ posts, headingLevel = 2 }: { posts: Post[]; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ul className={styles.posts}>
      {posts.map((post) => (
        <li key={post.slug}>
          <article className={`card card--hover ${styles.postCard}`}>
            <Link href={`/blog/category/${post.category.slug}`} className={styles.postCategory}>
              {post.category.name}
            </Link>
            <Heading className={styles.postTitle}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </Heading>
            <p className={styles.postDesc}>{post.description}</p>
            <p className={styles.postMeta}>
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
            </p>
            <Link href={`/blog/${post.slug}`} className={styles.postMore} aria-label={`Read: ${post.title}`}>
              Read the guide <Icon name="arrowRight" />
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function CategoryNav({ categories, active }: { categories: BlogCategory[]; active?: string }) {
  return (
    <nav className={styles.categories} aria-label="Blog categories">
      <Link href="/blog" className={!active ? styles.categoryActive : undefined} aria-current={!active ? "page" : undefined}>
        All guides
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={active === category.slug ? styles.categoryActive : undefined}
          aria-current={active === category.slug ? "page" : undefined}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
