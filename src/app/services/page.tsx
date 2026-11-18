import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import HowItWorks from "@/components/sections/home/HowItWorks";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import styles from "./services.module.css";
import RelatedLinks from "@/components/content/RelatedLinks";
import { linkCards } from "@/lib/links";
import { landingPages } from "@/data/landing-pages";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "NBN & CCTV Installation Services Adelaide",
  description:
    "FTTP, FTTN, FTTC and HFC nbn installation and cabling, plus CCTV and security camera installation, for homes and businesses across Adelaide.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            <span className="text-gradient">NBN &amp; CCTV installation services</span> in Adelaide
          </>
        }
        lead={`Whether you're connecting to full fibre, fixing a flaky FTTN line or protecting your property with CCTV, ${company.name}'s local technicians deliver tidy, tested work across Adelaide and surrounding areas.`}
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      >
        <Link href="/contact" className="btn btn--cta btn--lg">
          Get a Free Quote <Icon name="arrowRight" />
        </Link>
        <a href={company.phone.href} className="btn btn--outline-light btn--lg">
          <Icon name="phone" /> {company.phone.display}
        </a>
      </PageHero>

      <section className="section section--light" aria-label="All services">
        <div className={`container ${styles.list}`}>
          {services.map((service, i) => (
            <Reveal key={service.slug}>
              <article className={`card ${styles.row} ${i % 2 ? styles.reverse : ""}`} id={service.slug}>
                <div className={styles.media}>
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className={styles.image}
                  />
                  <span className={styles.badge}>{service.category === "nbn" ? "NBN" : "Security"}</span>
                </div>
                <div className={styles.body}>
                  <span className="icon-tile">
                    <Icon name={service.icon} />
                  </span>
                  <h2 className={styles.title}>{service.title}</h2>
                  <p className={styles.tagline}>{service.tagline}</p>
                  <ul className={`check-list ${styles.highlights}`}>
                    {service.included.slice(0, 4).map((item) => (
                      <li key={item}>
                        <Icon name="checkCircle" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.actions}>
                    <Link href={`/services/${service.slug}`} className="btn btn--primary">
                      Learn more <Icon name="arrowRight" />
                    </Link>
                    <Link href="/contact" className="btn btn--outline">
                      Get a quote
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--white" aria-labelledby="services-process">
        <div className="container">
          <SectionHeading
            id="services-process"
            eyebrow="How it works"
            title="A simple, transparent process"
            lead="Every job – big or small – follows the same proven steps, so you always know what's happening."
          />
          <HowItWorks />
        </div>
      </section>

      <RelatedLinks id="adelaide-guides" eyebrow="Adelaide guides" title="Not sure which service you need?" items={linkCards(landingPages.map((p) => `/${p.slug}`))} />
      <RelatedLinks id="related-articles" eyebrow="Related articles" title="Guides from our technicians" items={linkCards(getAllPosts().slice(0, 3).map((p) => `/blog/${p.slug}`))} tone="white" />
      <CtaBanner />
    </>
  );
}
