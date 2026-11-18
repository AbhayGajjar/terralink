import type { Metadata } from "next";
import { blogCategories } from "@/data/blog";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import CtaBanner from "@/components/sections/CtaBanner";
import PostList, { CategoryNav } from "./PostList";

export const metadata: Metadata = buildMetadata({
  title: "nbn & CCTV Guides for Adelaide Homes",
  description:
    "Practical guides from Adelaide technicians: nbn technologies, FTTP installation and upgrades, fixing connection problems and choosing security cameras.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = blogCategories.filter((c) => posts.some((p) => p.category.slug === c.slug));
  return (
    <>
      <PageHero
        eyebrow="Blog & guides"
        title={
          <>
            nbn &amp; CCTV guides for <span className="text-gradient">Adelaide homes</span>
          </>
        }
        lead="Plain-English advice from technicians who install and fix nbn connections and security cameras across Adelaide every week."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section className="section section--light">
        <div className="container">
          <CategoryNav categories={categories} />
          <PostList posts={posts} />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
