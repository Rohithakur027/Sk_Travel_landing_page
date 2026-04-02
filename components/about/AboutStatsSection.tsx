import styles from './AboutStatsSection.module.css';

const STATS = [
  { value: '500K+', label: 'Happy Users' },
  { value: '1000+', label: 'Corporate Clients' },
  { value: '50+', label: 'Cities Covered' },
  { value: '99.8%', label: 'On-Time Rate' }
];

export default function AboutStatsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((stat, idx) => (
            <div key={idx} className={styles.statBox}>
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
