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

export const metadata: Metadata = buildMetadata({
  title: "NBN & CCTV Installation Services Adelaide",
  description:
    "Explore TerraLink's services: FTTP, FTTN, FTTC and HFC NBN installation plus CCTV and security camera installation for homes and businesses across Adelaide and South Australia.",
  path: "/services",
  keywords: services.flatMap((s) => s.seo.keywords),
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            NBN &amp; security installations, <span className="text-gradient">done properly</span>
          </>
        }
        lead={`Whether you're connecting to full fibre, fixing a flaky FTTN line or protecting your property with CCTV, ${company.name}'s local technicians deliver tidy, tested work across South Australia.`}
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

      <CtaBanner tone="white" />
    </>
  );
}
