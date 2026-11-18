import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogCategories } from "@/data/blog";
import { getAllPosts, getPostsByCategory } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import CtaBanner from "@/components/sections/CtaBanner";
import PostList, { CategoryNav } from "../../PostList";

export const dynamicParams = false;

const activeCategories = () => blogCategories.filter((c) => getAllPosts().some((p) => p.category.slug === c.slug));

export function generateStaticParams() {
  return activeCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} – Guides`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const { category: slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) notFound();
  const posts = getPostsByCategory(category.slug);

  return (
    <>
      <PageHero
        eyebrow="Blog category"
        title={`${category.name}: guides for Adelaide homes`}
        lead={category.description}
        breadcrumbs={[
          { name: "Blog", path: "/blog" },
          { name: category.name, path: `/blog/category/${category.slug}` },
        ]}
      />
      <section className="section section--light">
        <div className="container">
          <CategoryNav categories={activeCategories()} active={category.slug} />
          <PostList posts={posts} />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
