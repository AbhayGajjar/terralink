import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/lib/images";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import Icon from "@/components/ui/Icon";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Trail after "Home", e.g. [{ name: "Services", path: "/services" }] */
  breadcrumbs: { name: string; path: string }[];
  image?: SiteImage;
  children?: ReactNode;
}

/** Dark hero used at the top of every inner page. */
export default function PageHero({ eyebrow, title, lead, breadcrumbs, image, children }: PageHeroProps) {
  const trail = [{ name: "Home", path: "/" }, ...breadcrumbs];

  return (
    <section className={`${styles.hero} ${image ? styles.withImage : ""}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <nav aria-label="Breadcrumb" className={`${styles.crumbs} ${styles.enter}`}>
            <ol>
              {trail.map((item, i) => (
                <li key={item.path}>
                  {i < trail.length - 1 ? (
                    <>
                      <Link href={item.path}>{item.name}</Link>
                      <Icon name="arrowRight" className={styles.sep} />
                    </>
                  ) : (
                    <span aria-current="page">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <span className={`eyebrow eyebrow--dark ${styles.enter}`} style={{ animationDelay: "0.05s" }}>
            {eyebrow}
          </span>
          <h1 className={`${styles.title} ${styles.enter}`} style={{ animationDelay: "0.1s" }}>
            {title}
          </h1>
          {lead && (
            <p className={`${styles.lead} ${styles.enter}`} style={{ animationDelay: "0.15s" }}>
              {lead}
            </p>
          )}
          {children && (
            <div className={`${styles.actions} ${styles.enter}`} style={{ animationDelay: "0.2s" }}>
              {children}
            </div>
          )}
        </div>

        {image && (
          <div className={`${styles.media} ${styles.enter}`} style={{ animationDelay: "0.2s" }}>
            <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 520px, 100vw" className={styles.image} />
            <div className={styles.mediaShine} aria-hidden="true" />
          </div>
        )}
      </div>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </section>
  );
}
