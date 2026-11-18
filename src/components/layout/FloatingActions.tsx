"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/data/company";
import styles from "./FloatingActions.module.css";

/** Mobile: sticky "Call Now" + "Quote" bar. Desktop: floating quote button after scrolling past the hero. */
export default function FloatingActions({ callIcon, quoteIcon }: { callIcon: ReactNode; quoteIcon: ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const onContact = pathname === "/contact";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={styles.mobileBar}>
        <a href={company.phone.href} className={`btn btn--primary ${styles.mobileCall}`}>
          {callIcon} Call Now
        </a>
        {!onContact && (
          <Link href="/contact" className={`btn btn--cta ${styles.mobileQuote}`}>
            Free Quote
          </Link>
        )}
      </div>

      {!onContact && (
        <div className={`${styles.desktop} ${visible ? styles.desktopVisible : ""}`} inert={!visible}>
          <Link href="/contact" className={`btn btn--cta btn--lg ${styles.desktopBtn}`}>
            <span className={styles.pulse} aria-hidden="true" />
            {quoteIcon} Get a Free Quote
          </Link>
        </div>
      )}
    </>
  );
}
