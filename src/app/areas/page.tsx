import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/data/areas";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import CtaBanner from "@/components/sections/CtaBanner";
import Icon from "@/components/ui/Icon";
import styles from "./areas.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas – NBN & CCTV Across Adelaide",
  description: `Where ${company.name} installs nbn cabling and CCTV: Adelaide's northern and eastern suburbs, the Adelaide Hills and surrounding areas. Based in ${company.address.suburb}.`,
  path: "/areas",
});

const areaByName = new Map(areas.map((area) => [area.name, area]));

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title={
          <>
            NBN &amp; CCTV installation <span className="text-gradient">across Adelaide</span>
          </>
        }
        lead={`We're based in ${company.address.suburb} and work across metropolitan Adelaide and nearby regions. Choose your area for local information, or just ask if you're not sure we cover you.`}
        breadcrumbs={[{ name: "Service areas", path: "/areas" }]}
      >
        <Link href="/contact" className="btn btn--cta btn--lg">
          Check my area <Icon name="arrowRight" />
        </Link>
        <a href={company.phone.href} className="btn btn--outline-light btn--lg">
          <Icon name="phone" /> {company.phone.display}
        </a>
      </PageHero>

      <section className="section section--light">
        <div className="container">
          <ul className={styles.grid}>
            {areas.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className={`card card--hover ${styles.areaCard}`}>
                  <span className="eyebrow">{area.name}</span>
                  <h2>{area.heading}</h2>
                  <p>{area.lead}</p>
                  <p className={styles.areaSuburbs}>
                    <strong>Including:</strong> {area.suburbs.slice(0, 6).join(", ")} and more
                  </p>
                  <span className={styles.more}>
                    {area.name} details <Icon name="arrowRight" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.allAreas}>
            <h2>All the regions we cover</h2>
            <p>We regularly work in each of these regions. Areas with their own page are linked.</p>
            <ul className={styles.regionList}>
              {company.serviceAreas.map((name) => {
                const page = areaByName.get(name);
                return <li key={name}>{page ? <Link href={`/areas/${page.slug}`}>{name}</Link> : name}</li>;
              })}
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner title="Not sure if we cover your suburb?" text="Send us your suburb and what you need, and we'll let you know within one business day." />
    </>
  );
}
