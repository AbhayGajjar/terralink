import { stats } from "@/data/home";
import Counter from "@/components/ui/Counter";
import Icon from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import styles from "./StatsStrip.module.css";

export default function StatsStrip() {
  return (
    <section className={styles.section} aria-label="TerraLink in numbers">
      <div className="container">
        <div className={styles.band}>
          <div className={styles.lines} aria-hidden="true" />
          <Stagger className={styles.grid}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className={styles.stat}>
                <span className={styles.icon}>
                  <Icon name={stat.icon} />
                </span>
                <strong className={styles.value}>
                  <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </strong>
                <span className={styles.label}>{stat.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
