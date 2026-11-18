import type { ReactNode } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import type { PageContent } from "@/lib/content";
import type { SiteImage } from "@/lib/images";
import { faqJsonLd } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/ui/JsonLd";
import Icon from "@/components/ui/Icon";
import Markdown from "./Markdown";
import styles from "./ContentPage.module.css";

interface ContentPageProps {
  eyebrow: string;
  /** The page's single H1 */
  title: ReactNode;
  lead: string;
  breadcrumbs: { name: string; path: string }[];
  image?: SiteImage;
  /** Where the quote buttons go, e.g. /contact?service=fttp-installation-adelaide */
  quoteHref?: string;
  content: PageContent;
  /** Extra sidebar content under the quote card (e.g. "What's included") */
  aside?: ReactNode;
  faqTitle?: string;
  /** Related services / guides / areas blocks, rendered after the FAQs */
  related?: ReactNode;
  ctaTitle?: string;
  /** Page-specific structured data (FAQPage is added automatically) */
  jsonLd?: Record<string, unknown>[];
}

/** Long-form, server-rendered page used by services, landing pages and area pages. */
export default function ContentPage({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  image,
  quoteHref = "/contact",
  content,
  aside,
  faqTitle = "Frequently asked questions",
  related,
  ctaTitle,
  jsonLd = [],
}: ContentPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} breadcrumbs={breadcrumbs} image={image}>
        <Link href={quoteHref} className="btn btn--cta btn--lg">
          Get a Free Quote <Icon name="arrowRight" />
        </Link>
        <a href={company.phone.href} className="btn btn--outline-light btn--lg">
          <Icon name="phone" /> Call {company.phone.display}
        </a>
      </PageHero>

      <section className="section section--white">
        <div className={`container ${styles.layout}`}>
          <article className={styles.main}>
            <div className={styles.introRow}>
              <Markdown source={content.intro} className={styles.intro} />
              {content.facts && content.facts.length > 0 && (
                <dl className={styles.facts} aria-label="At a glance">
                  {content.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-h`}>
                <h2 id={`${section.id}-h`}>{section.heading}</h2>
                <Markdown source={section.body} />
              </section>
            ))}
          </article>

          <aside className={styles.side} aria-label="Page navigation and quote">
            <div className={styles.sticky}>
              <nav className={styles.toc} aria-label="On this page">
                <p className={styles.tocTitle}>On this page</p>
                <ol>
                  {content.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.heading}</a>
                    </li>
                  ))}
                  {content.faqs.length > 0 && (
                    <li>
                      <a href="#faq">{faqTitle}</a>
                    </li>
                  )}
                </ol>
              </nav>

              <div className={styles.quote}>
                <p className={styles.quoteTitle}>Get a free, fixed quote</p>
                <p className={styles.quoteText}>Tell us your suburb and what you need. We reply within one business day.</p>
                <Link href={quoteHref} className="btn btn--cta btn--block">
                  Request a quote <Icon name="arrowRight" />
                </Link>
                <a href={company.phone.href} className={styles.quotePhone}>
                  <Icon name="phone" /> {company.phone.display}
                </a>
              </div>

              {aside}
            </div>
          </aside>
        </div>
      </section>

      {content.faqs.length > 0 && <FaqSection items={content.faqs} title={faqTitle} eyebrow="FAQs" />}
      {related}
      <CtaBanner title={ctaTitle} />
      <JsonLd data={[...jsonLd, ...(content.faqs.length ? [faqJsonLd(content.faqs)] : [])]} />
    </>
  );
}
