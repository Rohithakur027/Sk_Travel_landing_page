import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import styles from './StatsSection.module.css';

const STATS = [
  {
    label: 'Corporate Clients',
    value: '500+',
    icon: (
      <Image 
        src="/icons/tick.svg" 
        alt="Tick" 
        width={36} 
        height={36} 
      />
    ),
  },
  {
    label: 'Average Rating',
    value: '4.9/5',
    icon: <Star size={36} color="#FFD23F" fill="#FFD23F" strokeWidth={0} />,
  },
  {
    label: 'Completed Rides',
    value: '50K+',
    icon: (
      <Image 
        src="/icons/car.svg" 
        alt="Car" 
        width={36} 
        height={36} 
      />
    ),
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
