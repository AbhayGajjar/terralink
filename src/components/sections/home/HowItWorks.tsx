"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/home";
import Icon from "@/components/ui/Icon";
import styles from "./HowItWorks.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks({ steps = processSteps }: { steps?: typeof processSteps }) {
  return (
    <div className={styles.wrap}>
      {/* connecting fibre line, drawn as the section scrolls into view */}
      <div className={styles.track} aria-hidden="true">
        <motion.div
          className={styles.trackFill}
          initial={{ scaleX: 0, scaleY: 0 }}
          whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -120px 0px" }}
          transition={{ duration: 1.6, ease }}
        />
      </div>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            className={styles.step}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.18 }}
          >
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
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
