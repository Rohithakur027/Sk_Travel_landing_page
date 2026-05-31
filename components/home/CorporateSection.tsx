import React from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import styles from "./CorporateSection.module.css";

const FEATURES = [
  "Industry-leading safety standards",
  "Professional and verified drivers",
  "24/7 customer support",
  "Real-time tracking system",
];

export default function CorporateSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        {/* Left: Image with badge */}
        <div className={styles.imgCol}>
          <div className={styles.imgWrapper}>
            <Image
              src="/images/corporatesec_indian_corp.png"
              alt="SK Voyage driver"
              fill
              className={styles.img}
            />
          </div>
          {/* Floating badge */}
          <div className={styles.badge}>
            <span className={styles.badgeYears}>10+ Years</span>
            <span className={styles.badgeSub}>Of Excellence</span>
          </div>
        </div>

        {/* Right: Text content */}
        <div className={styles.textCol}>
          <span className={styles.eyebrow}>About SK Voyage</span>
          <h2 className={styles.heading}>
            We Redefine Corporate Transportation
          </h2>
          <p className={styles.body}>
            At SK Voyage, we understand that your time is valuable. That's why
            we've built a transportation service that prioritizes reliability,
            comfort, and professionalism. With over 8 years of experience
            serving corporate clients, we've perfected the art of seamless
            employee transportation.
          </p>
          <p className={styles.body}>
            Our fleet of modern vehicles and team of professional drivers ensure
            that your employees arrive safely, comfortably, and on time, every
            time.
          </p>

          {/* Feature checklist */}
          <ul className={styles.featureList}>
            {FEATURES.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                <BadgeCheck
                  size={24}
                  color="#ffffffff"
                  fill="#FBBF24"
                  strokeWidth={2}
                  className={styles.checkIcon}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button className={styles.learnMoreBtn}>Learn More About Us</button>
        </div>
      </div>
    </section>
  );
}
