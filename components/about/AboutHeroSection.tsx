import styles from './AboutHeroSection.module.css';

export default function AboutHeroSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.badge}>
            About SK Voyage
          </div>
          <h1 className={styles.heading}>
            Redefining Corporate<br />
            <span className={styles.highlight}>Transportation</span>
          </h1>
          <p className={styles.subtitle}>
            Committed to providing safe, reliable, and comfortable transportation<br />
            solutions for businesses across India
          </p>
        </div>
      </div>
    </section>
  );
}
