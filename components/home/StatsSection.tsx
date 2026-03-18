import React from 'react';
import { BadgeCheck, Star, CarFront } from 'lucide-react';
import styles from './StatsSection.module.css';

const STATS = [
  {
    label: 'Corporate Clients',
    value: '500+',
    icon: <BadgeCheck size={36} color="#FFB02F" strokeWidth={2.5} />,
  },
  {
    label: 'Average Rating',
    value: '4.9/5',
    icon: <Star size={36} color="#FFB02F" fill="#FFB02F" strokeWidth={0} />,
  },
  {
    label: 'Completed Rides',
    value: '50K+',
    icon: <CarFront size={36} color="#FFB02F" strokeWidth={2} />,
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.iconBox}>
                {stat.icon}
              </div>
              <h3 className={styles.value}>{stat.value}</h3>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
