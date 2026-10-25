"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { company } from "@/data/company";
import Icon from "@/components/ui/Icon";
import styles from "./FloatingActions.module.css";

/** Mobile: sticky "Call Now" + "Quote" bar. Desktop: floating quote button after scrolling past the hero. */
export default function FloatingActions() {
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
          <Icon name="phone" /> Call Now
        </a>
        {!onContact && (
          <Link href="/contact" className={`btn btn--cta ${styles.mobileQuote}`}>
            Free Quote
          </Link>
        )}
      </div>

      <AnimatePresence>
        {visible && !onContact && (
          <motion.div
            className={styles.desktop}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <Link href="/contact" className={`btn btn--cta btn--lg ${styles.desktopBtn}`}>
              <span className={styles.pulse} aria-hidden="true" />
              <Icon name="form" /> Get a Free Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
