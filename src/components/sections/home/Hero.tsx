import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { images } from "@/lib/images";
import Icon from "@/components/ui/Icon";
import NetworkCanvas from "@/components/ui/NetworkCanvas";
import styles from "./Hero.module.css";

const fibrePaths = [
  "M-50 520 C 220 440, 380 600, 640 470 S 1080 330, 1500 420",
  "M-50 600 C 260 560, 460 680, 720 560 S 1120 470, 1500 540",
  "M-50 380 C 180 330, 420 460, 700 360 S 1100 220, 1500 280",
  "M-50 700 C 300 640, 520 760, 820 650 S 1220 600, 1500 660",
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={`${styles.glow} ${styles.glowBlue}`} />
        <div className={`${styles.glow} ${styles.glowCyan}`} />
        <div className={`${styles.glow} ${styles.glowOrange}`} />
        <NetworkCanvas className={styles.canvas} />
        <svg className={styles.fibres} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="fibre-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#1E6FFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D4FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#1E6FFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {fibrePaths.map((d, i) => (
            <g key={d}>
              <path d={d} className={styles.fibreBase} />
              <path d={d} className={styles.fibreLight} style={{ animationDelay: `${i * 1.6}s`, animationDuration: `${7 + i * 1.5}s` }} />
            </g>
          ))}
        </svg>
        <div className={styles.vignette} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={`eyebrow eyebrow--dark ${styles.enter}`}>Local technicians · Adelaide &amp; surrounds</span>
          <h1 id="hero-title" className={`${styles.title} ${styles.enter}`} style={{ animationDelay: "0.08s" }}>
            <span className="text-gradient">NBN &amp; CCTV installation</span> in Adelaide
          </h1>
          <p className={`${styles.lead} ${styles.enter}`} style={{ animationDelay: "0.16s" }}>
            FTTP, FTTN, FTTC and HFC installation and cabling, plus security camera systems, for homes and businesses
            across Adelaide. Tidy work, tested before we leave, and plain-English advice from local technicians.
          </p>
          <div className={`${styles.ctas} ${styles.enter}`} style={{ animationDelay: "0.24s" }}>
            <Link href="/contact" className="btn btn--cta btn--lg">
              Get a Free Quote <Icon name="arrowRight" />
            </Link>
            <Link href="/services" className="btn btn--outline-light btn--lg">
              Explore Services
            </Link>
          </div>
          <ul className={`${styles.badges} ${styles.enter}`} style={{ animationDelay: "0.32s" }} aria-label="Why customers trust us">
            {company.trustBadges.filter((badge) => badge.verified).map((badge) => (
              <li key={badge.label}>
                <span className={styles.badgeIcon}>
                  <Icon name={badge.icon} />
                </span>
                {badge.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative "live status" dashboard */}
        <div className={styles.visual} aria-hidden="true">
          <div className={`glass-card ${styles.panel}`}>
            <div className={styles.panelHead}>
              <span className={styles.live}>
                <span className={styles.liveDot} /> Connection live
              </span>
              <span className={styles.panelTag}>FTTP</span>
            </div>
            <div className={styles.gauge}>
              <svg viewBox="0 0 200 120">
                <defs>
                  <linearGradient id="gauge-gradient" x1="0" x2="1">
                    <stop offset="0%" stopColor="#1E6FFF" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
                <path d="M20 105 A80 80 0 0 1 180 105" className={styles.gaugeTrack} />
                <path d="M20 105 A80 80 0 0 1 180 105" className={styles.gaugeValue} />
              </svg>
              <div className={styles.gaugeReadout}>
                <strong>1000</strong>
                <span>Mbps capable</span>
              </div>
            </div>
            <div className={styles.metrics}>
              <div>
                <span>Signal</span>
                <strong>Excellent</strong>
              </div>
              <div>
                <span>Latency</span>
                <strong>Low</strong>
              </div>
              <div>
                <span>Status</span>
                <strong className={styles.ok}>Tested ✓</strong>
              </div>
            </div>
          </div>

          <div className={`glass-card ${styles.camCard}`}>
            <div className={styles.camFeed}>
              <Image src={images.homeEvening.src} alt="" fill sizes="220px" className={styles.camImage} />
              <span className={styles.rec}>
                <span /> REC
              </span>
            </div>
            <div className={styles.camMeta}>
              <Icon name="camera" /> Front entry · 4K
            </div>
          </div>

          {company.rating && (
            <div className={`glass-card ${styles.ratingCard}`}>
              <span className={styles.stars}>★★★★★</span>
              <span>
                <strong>{company.rating.value}</strong> from {company.rating.count} Google reviews
              </span>
            </div>
          )}
        </div>
      </div>

      <a href="#services" className={styles.scrollCue} aria-label="Scroll to services">
        <span />
      </a>
    </section>
  );
}
