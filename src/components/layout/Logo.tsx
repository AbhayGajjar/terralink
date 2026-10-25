import Link from "next/link";
import { useId } from "react";
import { company } from "@/data/company";
import styles from "./Logo.module.css";

/** Temporary text logo with a fibre/signal mark. Swap for the real logo SVG when ready. */
export function LogoMark({ size = 36 }: { size?: number }) {
  const id = useId();
  const gradient = `logo-gradient-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E6FFF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill={`url(#${gradient})`} />
      {/* signal arcs */}
      <path d="M12.5 21.5a10.6 10.6 0 0 1 15 0" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.55" />
      <path d="M8.5 17.5a16.3 16.3 0 0 1 23 0" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.3" />
      <path d="M16.3 25.3a5.3 5.3 0 0 1 7.4 0" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      {/* fibre node */}
      <circle cx="20" cy="30" r="2.6" fill="#fff" />
    </svg>
  );
}

export default function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link href="/" className={`${styles.logo} ${tone === "dark" ? styles.dark : ""}`} aria-label={`${company.name} – home`}>
      <LogoMark />
      <span className={styles.word}>
        Terra<span className={styles.accent}>Link</span>
      </span>
    </Link>
  );
}
