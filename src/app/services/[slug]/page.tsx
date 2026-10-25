import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRelatedServices, getService, services } from "@/data/services";
import { company } from "@/data/company";
import { buildMetadata, faqJsonLd, siteUrl } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import HowItWorks from "@/components/sections/home/HowItWorks";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import ServiceCard from "@/components/sections/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Icon, { type IconName } from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import styles from "./service.module.css";

// Only the slugs in src/data/services.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    keywords: service.seo.keywords,
  });
}

const processIcons: IconName[] = ["survey", "schedule", "tool", "checkCircle"];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug);
  const steps = service.process.map((step, i) => ({ ...step, icon: processIcons[i % processIcons.length] }));

  return (
    <>
      <PageHero
        eyebrow={service.category === "nbn" ? "NBN installation" : "Security systems"}
        title={service.title}
        lead={service.tagline}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ]}
        image={service.image}
      >
        <Link href={`/contact?service=${service.slug}`} className="btn btn--cta btn--lg">
          Get a Free Quote <Icon name="arrowRight" />
        </Link>
        <a href={company.phone.href} className="btn btn--outline-light btn--lg">
          <Icon name="phone" /> {company.phone.display}
        </a>
      </PageHero>

      {/* Overview + what's included */}
      <section className="section section--white" aria-labelledby="overview-title">
        <div className={`container ${styles.overview}`}>
          <Reveal className={styles.description}>
            <span className="eyebrow">Overview</span>
            <h2 id="overview-title" className="section-title">
              About our {service.shortTitle.toLowerCase().includes("cctv") ? "CCTV" : service.shortTitle} service
            </h2>
            {service.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className={styles.includedWrap} delay={0.1}>
            <aside className={`card ${styles.included}`} aria-labelledby="included-title">
              <h3 id="included-title">
                <Icon name="checkCircle" /> What&apos;s included
              </h3>
              <ul className="check-list">
                {service.included.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.includedCta}>
                <Link href={`/contact?service=${service.slug}`} className="btn btn--cta btn--block">
                  Request a quote <Icon name="arrowRight" />
                </Link>
                <p>Fixed-price quotes · Fully insured · Local SA team</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="section section--dark" aria-labelledby="benefits-title">
        <div className="container">
          <SectionHeading
            id="benefits-title"
            eyebrow="Benefits"
            title={
              <>
                Why it&apos;s <span className="text-gradient">worth doing right</span>
              </>
            }
          />
          <Stagger className="grid grid--4">
            {service.benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <article className={`glass-card glass-card--hover ${styles.benefit}`}>
                  <span className="icon-tile icon-tile--glass">
                    <Icon name={benefit.icon} />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="section section--light" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading id="process-title" eyebrow="Our process" title={`How your ${service.shortTitle} job works`} />
          <HowItWorks steps={steps} />
        </div>
      </section>

      <FaqSection items={service.faqs} eyebrow={`${service.shortTitle} FAQs`} title="Common questions" />

      {/* Related services */}
      <section className="section section--light" aria-labelledby="related-title">
        <div className="container">
          <SectionHeading id="related-title" eyebrow="Related services" title="You might also need" />
          <Stagger className="grid grid--3">
            {related.map((item) => (
              <StaggerItem key={item.slug}>
                <ServiceCard service={item} index={services.findIndex((s) => s.slug === item.slug)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner title={`Ready to book your ${service.shortTitle.toLowerCase().includes("cctv") ? "CCTV installation" : service.shortTitle}?`} />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.seo.description,
            serviceType: service.title,
            url: `${siteUrl}/services/${service.slug}`,
            image: service.image.src,
            provider: { "@id": `${siteUrl}/#business` },
            areaServed: { "@type": "State", name: "South Australia" },
          },
          faqJsonLd(service.faqs),
        ]}
      />
    </>
  );
}
