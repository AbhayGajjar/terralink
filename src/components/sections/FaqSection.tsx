import Link from "next/link";
import { company } from "@/data/company";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import FaqList, { type FaqItem } from "./FaqList";
import styles from "./FaqSection.module.css";

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
}

export default function FaqSection({ items, title = "Frequently asked questions", eyebrow = "FAQs" }: FaqSectionProps) {
  return (
    <section id="faq" className="section section--white" aria-labelledby="faq-title" style={{ scrollMarginTop: "var(--header-h)" }}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow={eyebrow}
            title={title}
            lead="Can't find what you're looking for? Our team is happy to help."
          />
          <Reveal className={styles.helpCard} delay={0.1}>
            <span className="icon-tile">
              <Icon name="support" />
            </span>
            <h3>Still have questions?</h3>
            <p>Talk to a technician – not a call centre.</p>
            <div className={styles.helpActions}>
              <a href={company.phone.href} className="btn btn--primary btn--sm">
                <Icon name="phone" /> {company.phone.display}
              </a>
              <Link href="/contact" className="btn btn--outline btn--sm">
                Send a message
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <FaqList items={items} />
        </Reveal>
      </div>
    </section>
  );
}
