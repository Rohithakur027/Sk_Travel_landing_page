import React from 'react';
import BookingForm from './BookingForm';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section id="hero" className={styles.section}>
      {/* Background Image */}
      <div
        className={styles.bg}
        style={{ backgroundImage: 'url(/images/herosection.png)' }}
      />

      {/* Content wrapper */}
      <div className={styles.content}>
        {/* Top Badge */}
        <div className={styles.badge}>
          <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          Loved by 500K+ users
        </div>

        {/* Main Heading */}
        <h1 className={styles.heading}>
          Your Trusted Partner for Corporate Travel
        </h1>

        {/* Subheading */}
        <p className={styles.subheading}>
          Embrace the Beauty of the Great Outdoors
        </p>
      </div>

      {/* Booking Form (overlapping bottom edge) */}
      <div className={styles.formWrapper}>
        <BookingForm />
      </div>
    </section>
  );
}
