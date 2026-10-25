import Link from "next/link";
import { company } from "@/data/company";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import styles from "./CtaBanner.module.css";

interface CtaBannerProps {
  title?: string;
  text?: string;
  /** Background of the surrounding section so the banner blends in */
  tone?: "light" | "white";
}

export default function CtaBanner({
  title = "Ready for faster internet or a safer property?",
  text = "Get a free, no-obligation quote from South Australia's NBN and CCTV specialists. Most quotes returned within one business day.",
  tone = "light",
}: CtaBannerProps) {
  return (
    <section className={`section section--tight ${styles.section} ${tone === "white" ? "section--white" : "section--light"}`} aria-label="Request a quote">
      <div className="container">
        <Reveal>
          <div className={styles.banner}>
            <div className={styles.decor} aria-hidden="true">
              <span className={styles.ring} />
              <span className={`${styles.ring} ${styles.ring2}`} />
              <span className={styles.beam} />
            </div>
            <div className={styles.content}>
              <span className="eyebrow eyebrow--dark">Free quotes · No obligation</span>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.text}>{text}</p>
            </div>
            <div className={styles.actions}>
              <Link href="/contact" className="btn btn--cta btn--lg">
                Get a Free Quote <Icon name="arrowRight" />
              </Link>
              <a href={company.phone.href} className={styles.phone}>
                <span className={styles.phoneIcon}>
                  <Icon name="phone" />
                </span>
                <span>
                  <small>Or call us now</small>
                  {company.phone.display}
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
