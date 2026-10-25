import Image from "next/image";
import { features } from "@/data/home";
import { images } from "@/lib/images";
import { company } from "@/data/company";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import styles from "./WhyChoose.module.css";

export default function WhyChoose() {
  return (
    <section className="section section--dark" aria-labelledby="why-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <SectionHeading
            id="why-title"
            align="left"
            eyebrow={`Why choose ${company.name}`}
            title={
              <>
                Installers who <span className="text-gradient">take pride</span> in the details
              </>
            }
            lead="We're not a call centre that subcontracts your job. We're a local team of technicians who answer the phone, show up on time and leave every site better than we found it."
          />
          <Reveal className={styles.imageWrap} delay={0.1}>
            <Image
              src={images.technician.src}
              alt={images.technician.alt}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className={styles.image}
            />
            <div className={`glass-card ${styles.imageBadge}`}>
              <span className="icon-tile icon-tile--sm">
                <Icon name="safety" />
              </span>
              <span>
                <strong>Workmanship guarantee</strong>
                <small>Every install tested before we leave</small>
              </span>
            </div>
          </Reveal>
        </div>

        <Stagger className={styles.grid} stagger={0.08}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <article className={`glass-card glass-card--hover ${styles.feature}`}>
                <span className="icon-tile icon-tile--glass">
                  <Icon name={feature.icon} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
