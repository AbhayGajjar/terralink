"use client";

import type { ReactNode } from "react";
import styles from "./Footer.module.css";

export function BackToTop({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className={styles.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      {children}
    </button>
  );
}

/** Rendered on the client so the static footer shell never goes stale. */
export function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
