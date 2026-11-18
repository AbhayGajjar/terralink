import type { Metadata } from "next";
import Link from "next/link";
import { faqGroups, allFaqs } from "@/data/faqs";
import { company } from "@/data/company";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/ui/JsonLd";
import Icon from "@/components/ui/Icon";
import styles from "./faq.module.css";

export const metadata: Metadata = buildMetadata({
  title: "NBN & CCTV FAQs – Adelaide Installation",
  description:
    "Answers on FTTP vs FTTN, checking your nbn technology, installation times, FTTP upgrade costs and CCTV privacy rules in South Australia.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            NBN &amp; CCTV installation <span className="text-gradient">questions answered</span>
          </>
        }
        lead="Straight answers to the questions Adelaide customers ask us most, from which nbn technology you have to how long CCTV footage is kept."
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      />

      <section className="section section--white">
        <div className={`container ${styles.layout}`}>
          <nav className={styles.toc} aria-label="FAQ topics">
            <p className={styles.tocTitle}>Topics</p>
            <ol>
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`}>{group.title}</a>
                </li>
              ))}
            </ol>
            <div className={styles.help}>
              <p>Can&apos;t find your answer?</p>
              <a href={company.phone.href} className="btn btn--primary btn--sm btn--block">
                <Icon name="phone" /> {company.phone.display}
              </a>
              <Link href="/contact" className="btn btn--outline btn--sm btn--block">
                Ask a question
              </Link>
            </div>
          </nav>

          <div className={styles.groups}>
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} className={styles.group} aria-labelledby={`${group.id}-h`}>
                <h2 id={`${group.id}-h`}>{group.title}</h2>
                {group.items.map((item) => (
                  <div key={item.question} className={styles.item}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                    {item.links && (
                      <ul className={styles.links}>
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href}>
                              {link.label} <Icon name="arrowRight" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Still have a question?" text="Talk to a local technician, not a call centre. We'll give you a straight answer and a free quote if you need one." />
      <JsonLd data={faqJsonLd(allFaqs)} />
    </>
  );
}
