import Link from "next/link";
import type { LinkCard } from "@/lib/content";
import Icon from "@/components/ui/Icon";
import styles from "./RelatedLinks.module.css";

interface RelatedLinksProps {
  id: string;
  eyebrow: string;
  title: string;
  items: LinkCard[];
  tone?: "white" | "light";
}

/** "Related services / guides / areas" block – descriptive anchor text for internal linking. */
export default function RelatedLinks({ id, eyebrow, title, items, tone = "light" }: RelatedLinksProps) {
  if (!items.length) return null;
  return (
    <section className={`section section--tight section--${tone}`} aria-labelledby={id}>
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
        </div>
        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`card card--hover ${styles.card}`}>
                {item.eyebrow && <span className={styles.eyebrow}>{item.eyebrow}</span>}
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.desc}>{item.description}</span>
                <span className={styles.more} aria-hidden="true">
                  Read more <Icon name="arrowRight" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
