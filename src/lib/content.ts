/** Shared shape for long-form pages (services, landing pages, area pages). Bodies are Markdown. */
export interface ContentSection {
  /** Anchor id, used by the "On this page" list */
  id: string;
  /** Rendered as an <h2> */
  heading: string;
  /** Markdown. Use ### for sub-headings and [anchor text](/path) for internal links. */
  body: string;
}

export interface PageContent {
  /** Opening paragraphs (Markdown) shown before the first H2 */
  intro: string;
  /** Short "at a glance" facts shown beside the intro */
  facts?: { label: string; value: string }[];
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
}

export interface LinkCard {
  href: string;
  title: string;
  description: string;
  eyebrow?: string;
}
