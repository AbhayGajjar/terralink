import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getRelatedPosts, postHeadings } from "@/lib/blog";
import { linkCards } from "@/lib/links";
import { renderMarkdown } from "@/lib/markdown";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { company } from "@/data/company";
import PageHero from "@/components/sections/PageHero";
import RelatedLinks from "@/components/content/RelatedLinks";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/ui/JsonLd";
import Icon from "@/components/ui/Icon";
import styles from "../blog.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    article: { publishedTime: post.date, modifiedTime: post.updated, authors: [post.author.name], section: post.category.name, tags: post.tags },
  });
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const formatDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const headings = postHeadings(post);
  // Give every H2 an id so the table of contents can link to it.
  const html = renderMarkdown(post.body).replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    return `<h2 id="${slugify(text)}">${inner}</h2>`;
  });
  const relatedServices = linkCards(post.related);
  const relatedPosts = linkCards(getRelatedPosts(post).map((p) => `/blog/${p.slug}`));

  return (
    <>
      <PageHero
        eyebrow={post.category.name}
        title={post.title}
        lead={post.description}
        breadcrumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]}
      >
        <p className={styles.meta}>
          <span>
            By <strong>{post.author.name}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated !== post.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </p>
      </PageHero>

      <section className="section section--white">
        <div className={`container ${styles.layout}`}>
          <article className={styles.article}>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

            <footer className={styles.authorBox}>
              <span className="icon-tile icon-tile--soft">
                <Icon name="team" />
              </span>
              <div>
                <p className={styles.authorName}>{post.author.name}</p>
                <p className={styles.authorRole}>{post.author.role}</p>
                <p className={styles.authorBio}>{post.author.bio}</p>
              </div>
            </footer>
          </article>

          <aside className={styles.side} aria-label="Article navigation and quote">
            <div className={styles.sticky}>
              {headings.length > 2 && (
                <nav className={styles.toc} aria-label="In this article">
                  <p className={styles.tocTitle}>In this article</p>
                  <ol>
                    {headings.map((heading) => (
                      <li key={heading}>
                        <a href={`#${slugify(heading)}`}>{heading}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className={styles.quote}>
                <p className={styles.quoteTitle}>Need a hand?</p>
                <p className={styles.quoteText}>Local Adelaide technicians. Free, fixed quotes.</p>
                <Link href="/contact" className="btn btn--cta btn--block">
                  Get a free quote <Icon name="arrowRight" />
                </Link>
                <a href={company.phone.href} className={styles.quotePhone}>
                  <Icon name="phone" /> {company.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <RelatedLinks id="related-services" eyebrow="Related services" title="How we can help" items={relatedServices} />
      <RelatedLinks id="related-articles" eyebrow="Related articles" title="Keep reading" items={relatedPosts} tone="white" />
      <CtaBanner />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path,
          datePublished: post.date,
          dateModified: post.updated,
          author: { name: post.author.name },
          section: post.category.name,
          wordCount: post.words,
        })}
      />
    </>
  );
}
