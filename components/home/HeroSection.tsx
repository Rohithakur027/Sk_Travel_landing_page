'use client';

import React from 'react';
import BookingForm from './BookingForm';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section id="hero" className={styles.section}>
      {/* Background Image */}
      <div
        className={styles.bg}
        style={{ backgroundImage: 'url(/images/herosection_enhanced.png)' }}
      />
      
      {/* Premium Multi-Layer Gradient Overlays */}
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />
      <div className={styles.overlayAura} />

      {/* Content wrapper */}
      <div className={styles.content}>
        {/* Top Badge */}
        <div className={styles.badge}>
          <span className={styles.badgePulse} />
          <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
          </svg>
          Loved by 500+ users
        </div>

        {/* Main Heading with two-tone gradient */}
        <h1 className={styles.heading}>
          Your Trusted Partner for <span className={styles.gradientText}>Every Journey</span>
        </h1>

        {/* Subheading */}
        <p className={styles.subheading}>
          Embrace the Beauty of the Great Outdoors
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className={styles.scrollIndicator} onClick={() => {
        const nextSec = document.getElementById('hero')?.nextElementSibling;
        if (nextSec) {
          nextSec.scrollIntoView({ behavior: 'smooth' });
        }
      }}>
        <span className={styles.scrollText}>Discover More</span>
        <svg className={styles.scrollArrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Booking Form (overlapping bottom edge) */}
      <div className={styles.formWrapper}>
        <BookingForm />
      </div>
    </section>
  );
}
