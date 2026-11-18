import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingPage, landingPages } from "@/data/landing-pages";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { splitLinks } from "@/lib/links";
import ContentPage from "@/components/content/ContentPage";
import RelatedLinks from "@/components/content/RelatedLinks";

/** Keyword landing pages at the site root, e.g. /nbn-installation-adelaide (src/data/landing-pages.ts). */
export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((page) => ({ landing: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[landing]">): Promise<Metadata> {
  const page = getLandingPage((await params).landing);
  if (!page) return {};
  return buildMetadata({ title: page.seo.title, description: page.seo.description, path: `/${page.slug}` });
}

export default async function LandingPage({ params }: PageProps<"/[landing]">) {
  const page = getLandingPage((await params).landing);
  if (!page) notFound();

  const path = `/${page.slug}`;
  const others = landingPages.filter((p) => p.slug !== page.slug).map((p) => `/${p.slug}`);
  const related = splitLinks([...page.related, ...others], [path]);

  return (
    <ContentPage
      eyebrow={page.eyebrow}
      title={page.heading}
      lead={page.lead}
      breadcrumbs={[{ name: page.heading, path }]}
      image={page.image}
      quoteHref={`/contact?service=${page.quoteService}`}
      content={page.content}
      related={
        <>
          <RelatedLinks id="related-services" eyebrow="Related services" title="Related services and guides" items={related.services} />
          <RelatedLinks id="related-articles" eyebrow="Related articles" title="Read next" items={related.articles} tone="white" />
        </>
      }
      jsonLd={[serviceJsonLd({ name: page.schema.name, serviceType: page.schema.serviceType, description: page.seo.description, path })]}
    />
  );
}
