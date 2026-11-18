import { processSteps } from "@/data/home";
import Icon from "@/components/ui/Icon";
import styles from "./HowItWorks.module.css";

export default function HowItWorks({ steps = processSteps }: { steps?: typeof processSteps }) {
  return (
    <div className={styles.wrap}>
      {/* connecting fibre line, drawn as the section scrolls into view */}
      <div className={styles.track} aria-hidden="true">
        <div className={styles.trackFill} />
      </div>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li key={step.title} className={`reveal ${styles.step}`}>
            <div className={styles.marker}>
              <span className={styles.icon}>
                <Icon name={step.icon} />
              </span>
              <span className={styles.number}>{i + 1}</span>
            </div>
            <div className={styles.text}>
              <span className={styles.stepLabel}>Step {String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
