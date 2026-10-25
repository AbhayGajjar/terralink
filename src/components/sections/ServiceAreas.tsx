import Link from "next/link";
import { company } from "@/data/company";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import styles from "./ServiceAreas.module.css";

export default function ServiceAreas() {
  return (
    <section className="section section--white" aria-labelledby="areas-title">
      <div className={`container ${styles.layout}`}>
        <div>
          <SectionHeading
            id="areas-title"
            align="left"
            eyebrow="Service areas"
            title="Proudly servicing Adelaide & regional SA"
            lead="Our technicians cover metropolitan Adelaide and surrounding regions every day. Not sure if we reach you? Just ask – we regularly travel for larger jobs."
          />
          <Stagger className={styles.areas} stagger={0.04}>
            {company.serviceAreas.map((area) => (
              <StaggerItem key={area} className={styles.area}>
                <Icon name="location" /> {area}
              </StaggerItem>
            ))}
          </Stagger>
          <Link href="/contact" className={`btn btn--primary ${styles.cta}`}>
            Check your area <Icon name="arrowRight" />
          </Link>
        </div>

        <Reveal className={styles.mapWrap} delay={0.1}>
          <iframe
            src={company.mapEmbedUrl}
            title={`Map showing ${company.name}'s location in ${company.address.suburb}, South Australia`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.map}
          />
          <div className={`glass-card ${styles.mapBadge}`}>
            <span className="icon-tile icon-tile--sm">
              <Icon name="location" />
            </span>
            <span>
              <strong>Based in {company.address.suburb}</strong>
              <small>Servicing all of South Australia</small>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
