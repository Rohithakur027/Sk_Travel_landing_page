import { CheckCircle2, Clock, Star, Eye, Lightbulb, Globe } from 'lucide-react';
import styles from './CoreValuesSection.module.css';

const CORE_VALUES = [
  {
    title: 'Safety First',
    description: 'Every journey prioritizes passenger safety with verified drivers and well-maintained vehicles',
    Icon: CheckCircle2,
  },
  {
    title: 'Reliability',
    description: 'Punctual service you can count on, ensuring employees reach work on time, every time',
    Icon: Clock,
  },
  {
    title: 'Excellence',
    description: 'Committed to delivering exceptional service quality that exceeds expectations',
    Icon: Star,
  },
  {
    title: 'Transparency',
    description: 'Clear communication and honest pricing with no hidden charges or surprises',
    Icon: Eye,
  },
  {
    title: 'Innovation',
    description: 'Continuously improving our services with the latest technology and best practices',
    Icon: Lightbulb,
  },
  {
    title: 'Sustainability',
    description: 'Working towards eco-friendly solutions and reducing our environmental impact',
    Icon: Globe,
  },
];

export default function CoreValuesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <h2 className={styles.heading}>Our Core Values</h2>
          <p className={styles.subheading}>
            The principles that guide everything we do
          </p>
        </div>

        <div className={styles.grid}>
          {CORE_VALUES.map((val, idx) => {
            const IconComponent = val.Icon;
            return (
              <div key={idx} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <IconComponent className={styles.icon} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{val.title}</h3>
                </div>
                <p className={styles.cardText}>{val.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
