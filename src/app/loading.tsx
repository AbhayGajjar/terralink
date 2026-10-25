import styles from "./status.module.css";

/** Shown while a route segment is loading. */
export default function Loading() {
  return (
    <section className={`${styles.screen} ${styles.loadingScreen}`} aria-busy="true" aria-live="polite">
      <div className={styles.loader}>
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <path d="M22 44a25 25 0 0 1 36 0" className={styles.arc3} />
          <path d="M14 36a36 36 0 0 1 52 0" className={styles.arc2} />
          <path d="M30 52a13 13 0 0 1 20 0" className={styles.arc1} />
          <circle cx="40" cy="62" r="4.5" className={styles.dot} />
        </svg>
        <span className="sr-only">Loading…</span>
        <p className={styles.loadingText}>Connecting…</p>
      </div>
    </section>
  );
}
