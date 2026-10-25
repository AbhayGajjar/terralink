"use client";

import { useState } from "react";
import Link from "next/link";
import { Segmented } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { nbnTechnologies } from "@/data/home";
import Icon from "@/components/ui/Icon";
import styles from "./NbnExplainer.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NbnExplainer() {
  const [active, setActive] = useState(nbnTechnologies[0].key);
  const tech = nbnTechnologies.find((t) => t.key === active) ?? nbnTechnologies[0];

  return (
    <div className={styles.wrap}>
      <div className={styles.switcher}>
        <Segmented
          size="large"
          shape="round"
          value={active}
          onChange={(value) => setActive(value)}
          options={nbnTechnologies.map((t) => ({ label: t.name, value: t.key }))}
          className={styles.segmented}
          aria-label="Choose an NBN technology"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tech.key}
          className={`glass-card ${styles.panel}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease }}
          role="region"
          aria-live="polite"
          aria-label={`${tech.name} – ${tech.fullName}`}
        >
          <div className={styles.main}>
            <span className={styles.code}>{tech.name}</span>
            <h3 className={styles.name}>{tech.fullName}</h3>
            <p className={styles.summary}>{tech.summary}</p>

            <div className={styles.blocks}>
              <div>
                <h4>
                  <Icon name="bolt" /> How it works
                </h4>
                <p>{tech.howItWorks}</p>
              </div>
              <div>
                <h4>
                  <Icon name="home" /> Best for
                </h4>
                <p>{tech.bestFor}</p>
              </div>
            </div>
          </div>

          <aside className={styles.side}>
            <Diagram techKey={tech.key} />

            <Meter label="Speed potential" value={tech.speed.label} score={tech.speed.score} />
            <Meter label="Reliability" value={tech.reliability.label} score={tech.reliability.score} />

            <div className={styles.equipment}>
              <h4>Equipment at your place</h4>
              <ul>
                {tech.equipment.map((item) => (
                  <li key={item}>
                    <Icon name="check" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link href={`/services/${tech.serviceSlug}`} className="btn btn--outline-light btn--block">
              {tech.name} installation <Icon name="arrowRight" />
            </Link>
          </aside>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Meter({ label, value, score }: { label: string; value: string; score: number }) {
  return (
    <div className={styles.meter}>
      <div className={styles.meterHead}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className={styles.meterTrack} role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <motion.div
          className={styles.meterFill}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        />
      </div>
    </div>
  );
}

/** Simple path diagram: Exchange → (node / curb) → Home, showing where fibre stops. */
function Diagram({ techKey }: { techKey: string }) {
  const fibreTo = { fttp: 3, fttn: 1, fttc: 2, hfc: 1 }[techKey] ?? 3;
  const lastMile = techKey === "hfc" ? "Coaxial" : "Copper";
  const stops = ["Exchange", techKey === "fttn" ? "Street node" : techKey === "hfc" ? "Fibre node" : "Street", techKey === "fttc" ? "Kerb pit" : "", "Your home"].filter(Boolean);
  const segments = stops.length - 1;
  const fibreSegments = Math.min(fibreTo, segments);

  return (
    <div className={styles.diagram} aria-hidden="true">
      <div className={styles.diagramLine}>
        {Array.from({ length: segments }).map((_, i) => (
          <span key={i} className={i < fibreSegments ? styles.segFibre : styles.segCopper} />
        ))}
      </div>
      <div className={styles.diagramStops}>
        {stops.map((stop) => (
          <span key={stop}>{stop}</span>
        ))}
      </div>
      <div className={styles.legend}>
        <span>
          <i className={styles.legendFibre} /> Fibre
        </span>
        {fibreSegments < segments && (
          <span>
            <i className={styles.legendCopper} /> {lastMile}
          </span>
        )}
      </div>
    </div>
  );
}
