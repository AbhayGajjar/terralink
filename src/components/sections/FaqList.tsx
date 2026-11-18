import Icon from "@/components/ui/Icon";
import styles from "./FaqList.module.css";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Accessible FAQ accordion using native <details>: every answer is in the server-rendered HTML
 * (so Google can read it and FAQPage schema matches visible content) and needs no JavaScript.
 */
export default function FaqList({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 3 | 4 }) {
  const Question = `h${headingLevel}` as const;
  return (
    <div className={styles.faq}>
      {items.map((item, i) => (
        <details key={item.question} className={styles.item} open={i === 0}>
          <summary className={styles.summary}>
            <Question className={styles.question}>{item.question}</Question>
            <span className={styles.toggle} aria-hidden="true">
              <Icon name="arrowRight" />
            </span>
          </summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
