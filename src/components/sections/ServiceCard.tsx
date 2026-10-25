import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import Icon from "@/components/ui/Icon";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/services/${service.slug}`} className={`card card--hover ${styles.card}`}>
      <div className={styles.media}>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className={styles.image}
        />
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.category}>{service.category === "nbn" ? "NBN" : "Security"}</span>
      </div>
      <div className={styles.body}>
        <span className={`icon-tile ${styles.icon}`}>
          <Icon name={service.icon} />
        </span>
        <h3 className={styles.title}>{service.shortTitle}</h3>
        <p className={styles.excerpt}>{service.excerpt}</p>
        <span className={styles.more}>
          Learn more <Icon name="arrowRight" />
        </span>
      </div>
    </Link>
  );
}
