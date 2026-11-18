import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getRelatedServices, getService, services } from "@/data/services";
import { legacyRedirects } from "@/data/redirects";
import { absoluteUrl, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { splitLinks } from "@/lib/links";
import ContentPage from "@/components/content/ContentPage";
import RelatedLinks from "@/components/content/RelatedLinks";
import Icon from "@/components/ui/Icon";
import styles from "./service.module.css";

// Only the slugs in src/data/services.ts (plus old redirected URLs) exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  // Old URLs (src/data/redirects.ts) are generated too, as permanent redirects to the new ones.
  const legacy = legacyRedirects.filter((r) => r.source.startsWith("/services/")).map((r) => r.source.replace("/services/", ""));
  return [...services.map((service) => service.slug), ...legacy].map((slug) => ({ slug }));
}

function findLegacy(slug: string) {
  return legacyRedirects.find((r) => r.source === `/services/${slug}`)?.destination;
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    const moved = findLegacy(slug);
    return moved ? { title: "Page moved", robots: { index: false, follow: true }, alternates: { canonical: absoluteUrl(moved) } } : {};
  }
  return buildMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    const moved = findLegacy(slug);
    // On a server this is a 308; on the static export Next writes a page with an instant meta refresh.
    if (moved) permanentRedirect(moved);
    notFound();
  }

  const path = `/services/${service.slug}`;
  const otherServices = getRelatedServices(service.slug).map((s) => `/services/${s.slug}`);
  const related = splitLinks([...service.related, ...otherServices], [path]);

  return (
    <ContentPage
      eyebrow={service.category === "nbn" ? "nbn installation" : "Security cameras"}
      title={service.heading}
      lead={service.tagline}
      breadcrumbs={[
        { name: "Services", path: "/services" },
        { name: service.shortTitle, path },
      ]}
      image={service.image}
      quoteHref={`/contact?service=${service.slug}`}
      content={service.content}
      faqTitle={`${service.shortTitle} FAQs`}
      aside={
        <div className={styles.included}>
          <p className={styles.includedTitle}>
            <Icon name="checkCircle" /> What&apos;s included
          </p>
          <ul className="check-list">
            {service.included.map((item) => (
              <li key={item}>
                <Icon name="check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      }
      related={
        <>
          <RelatedLinks id="related-services" eyebrow="Related services" title="Related services and Adelaide guides" items={related.services} />
          <RelatedLinks id="related-articles" eyebrow="Related articles" title="Helpful guides" items={related.articles} tone="white" />
        </>
      }
      ctaTitle={`Ready to book your ${service.category === "cctv" ? "CCTV installation" : service.shortTitle}?`}
      jsonLd={[
        serviceJsonLd({
          name: service.heading,
          serviceType: service.serviceType,
          description: service.seo.description,
          path,
          image: service.image.src,
        }),
      ]}
    />
  );
}
