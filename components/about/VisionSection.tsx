import { CheckCircle2, TrendingUp } from 'lucide-react';
import styles from './VisionSection.module.css';

export default function VisionSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <h2 className={styles.heading}>Our Mission & Vision</h2>
          <p className={styles.subheading}>
            Driving towards a future where corporate transportation is seamless, sustainable, and exceptional
          </p>
        </div>

        <div className={styles.grid}>
          {/* Mission Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <CheckCircle2 className={styles.icon} strokeWidth={2} />
            </div>
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardText}>
              To provide world-class transportation services that prioritize safety, reliability, and customer satisfaction. We aim to be the most trusted partner for corporate transportation needs, ensuring every employee reaches their destination comfortably and on time.
            </p>
          </div>

          {/* Vision Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <TrendingUp className={styles.icon} strokeWidth={2} />
            </div>
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.cardText}>
              To revolutionize corporate mobility across India by integrating cutting-edge technology, sustainable practices, and exceptional service standards. We envision a future where employee transportation is seamless, eco-friendly, and contributes to a better work-life balance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
