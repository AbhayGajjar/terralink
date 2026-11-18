import Link from "next/link";
import { nbnTechnologies } from "@/data/home";
import Icon from "@/components/ui/Icon";
import styles from "./NbnExplainer.module.css";

/**
 * NBN technology explainer with CSS-only tabs (radio inputs + :checked). All four panels are in
 * the server-rendered HTML, so search engines can read every explanation and no JavaScript is needed.
 */
export default function NbnExplainer() {
  return (
    <div className={styles.wrap}>
      {nbnTechnologies.map((tech, i) => (
        <input
          key={tech.key}
          type="radio"
          name="nbn-technology"
          id={`nbn-tab-${tech.key}`}
          className={`${styles.radio} ${styles[`r${i}`]}`}
          defaultChecked={i === 0}
        />
      ))}
      <div className={styles.switcher} role="group" aria-label="Choose an NBN technology">
        {nbnTechnologies.map((tech, i) => (
          <label key={tech.key} htmlFor={`nbn-tab-${tech.key}`} className={`${styles.tab} ${styles[`t${i}`]}`}>
            {tech.name}
          </label>
        ))}
      </div>

      <div className={styles.panels}>
        {nbnTechnologies.map((tech, i) => (
          <section key={tech.key} className={`glass-card ${styles.panel} ${styles[`p${i}`]}`} aria-label={`${tech.name} – ${tech.fullName}`}>
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
          </section>
        ))}
      </div>
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
        <div className={styles.meterFill} style={{ width: `${score}%` }} />
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
