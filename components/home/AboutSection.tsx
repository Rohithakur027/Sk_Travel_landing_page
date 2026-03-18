import React from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      {/* Background glow */}
      <div className={styles.bgGlow} />
      
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imgWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200" 
              alt="Professional chauffeur holding door" 
              fill 
              className="object-cover"
            />
          </div>
          <div className={styles.textCol}>
            <div className={styles.tagBadge}>
              About SK Travel
            </div>
            <h2 className={styles.heading}>Redefining the standard of travel.</h2>
            <p className={styles.body}>
              Founded with a passion for safe and comfortable travel, SK Travel
              has grown to become one of the most trusted premium cab services.
              We combine cutting-edge technology with traditional hospitality to ensure every journey exceeds your expectations.
            </p>
            <p className={styles.body}>
              Our fleet is meticulously maintained and our drivers are professionally
              trained, background-verified, and committed to your safety and comfort.
            </p>
            <div className={styles.actions}>
              <a href="#contact" className="btn btn-primary btn-lg">
                Get in Touch
              </a>
              <a href="#services" className={styles.btnGhost}>
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
