"use client";

import Icon from "@/components/ui/Icon";
import styles from "./Footer.module.css";

export function BackToTop() {
  return (
    <button
      type="button"
      className={styles.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <Icon name="arrowUp" />
    </button>
  );
}

/** Rendered on the client so the static footer shell never goes stale. */
export function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
