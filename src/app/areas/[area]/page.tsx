import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areas, getArea } from "@/data/areas";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { linkCards } from "@/lib/links";
import ContentPage from "@/components/content/ContentPage";
import RelatedLinks from "@/components/content/RelatedLinks";
import Icon from "@/components/ui/Icon";
import styles from "../areas.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[area]">): Promise<Metadata> {
  const area = getArea((await params).area);
  if (!area) return {};
  return buildMetadata({ title: area.seo.title, description: area.seo.description, path: `/areas/${area.slug}` });
}

export default async function AreaPage({ params }: PageProps<"/areas/[area]">) {
  const area = getArea((await params).area);
  if (!area) notFound();

  const path = `/areas/${area.slug}`;
  const services = linkCards([
    "/nbn-installation-adelaide",
    "/fttp-upgrade-adelaide",
    "/services/fttn-installation-adelaide",
    "/cctv-installation-adelaide",
    "/services/fttp-installation-adelaide",
    "/services/cctv-installation-adelaide",
  ]);
  const nearby = linkCards(area.nearby.map((slug) => `/areas/${slug}`));

  return (
    <ContentPage
      eyebrow={`Service area · ${area.name}`}
      title={area.heading}
      lead={area.lead}
      breadcrumbs={[
        { name: "Service areas", path: "/areas" },
        { name: area.name, path },
      ]}
      image={area.image}
      content={area.content}
      faqTitle={`${area.name} FAQs`}
      aside={
        <div className={styles.suburbCard}>
          <p className={styles.suburbTitle}>
            <Icon name="location" /> Suburbs we service
          </p>
          <ul className={styles.suburbList}>
            {area.suburbs.map((suburb) => (
              <li key={suburb}>{suburb}</li>
            ))}
          </ul>
          <p className={styles.suburbNote}>Not listed? Ask us – we likely cover you.</p>
        </div>
      }
      related={
        <>
          <RelatedLinks id="related-services" eyebrow="Services" title={`Popular services in the ${area.name.replace(/ Suburbs$/, " suburbs")}`} items={services} />
          <RelatedLinks id="nearby-areas" eyebrow="Nearby" title="Nearby areas we service" items={nearby} tone="white" />
        </>
      }
      ctaTitle={`Need an nbn or CCTV technician in the ${area.name.replace(/ Suburbs$/, " suburbs")}?`}
      jsonLd={[
        serviceJsonLd({
          name: area.heading,
          serviceType: "nbn installation and CCTV installation",
          description: area.seo.description,
          path,
          areaServed: [
            { "@type": "Place", name: `${area.name}, Adelaide, South Australia` },
            ...area.suburbs.map((suburb) => ({ "@type": "Place", name: `${suburb}, SA` })),
          ],
        }),
      ]}
    />
  );
}
