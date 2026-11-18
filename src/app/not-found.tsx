import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import Icon from "@/components/ui/Icon";
import styles from "./status.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={styles.screen}>
      <div className={styles.rings} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={`container ${styles.content}`}>
        <span className="eyebrow eyebrow--dark">Error 404 · Signal lost</span>
        <p className={styles.code} aria-hidden="true">
          4<span className={styles.zero}>0</span>4
        </p>
        <h1 className={styles.title}>We couldn&apos;t find a connection to that page</h1>
        <p className={styles.lead}>
          The link may be broken or the page may have moved. Let&apos;s get you back online.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn--cta btn--lg">
            Back to home <Icon name="arrowRight" />
          </Link>
          <Link href="/contact" className="btn btn--outline-light btn--lg">
            Contact us
          </Link>
        </div>
        <nav aria-label="Popular pages" className={styles.links}>
          <span>Popular:</span>
          <Link href="/nbn-installation-adelaide">NBN installation</Link>
          <Link href="/fttp-upgrade-adelaide">FTTP upgrades</Link>
          <Link href="/cctv-installation-adelaide">CCTV installation</Link>
          <Link href="/services">All services</Link>
          <Link href="/blog">Guides</Link>
          <Link href="/faq">FAQ</Link>
          <a href={company.phone.href}>Call {company.phone.display}</a>
        </nav>
      </div>
    </section>
  );
}
