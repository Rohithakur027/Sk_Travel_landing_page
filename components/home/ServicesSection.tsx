import React from "react";
import Image from "next/image";
import styles from "./ServicesSection.module.css";

const MAIN_SERVICES = [
  {
    title: "Employee Shuttle Service",
    description:
      "Reliable pickup and drop-off services for all major airports. Track flights in real-time and meet your team on schedule.",
    icon: "/icons/airportservice.icon.svg",
    image: "/images/airportservice.png",
    badge: "Popular",
    badgeClass: styles.badgePopular,
  },
  {
    title: "Executive Transportation",
    description:
      "Daily commute solutions for your employees with scheduled routes, dedicated vehicles, and professional drivers.",
    icon: "/icons/corporateservice.icon (1).svg",
    image: "/images/corporateshuttles.png",
    badge: "Best Value",
    badgeClass: styles.badgeBestValue,
  },
  {
    title: "Event Transportation",
    description:
      "Premium transportation for corporate events, conferences, and special occasions with flexible group booking options.",
    icon: "/icons/eventservice.svg",
    image: "/images/eventtransportation.png",
    badge: "Premium",
    badgeClass: styles.badgePremium,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        {/* ── Section Header ──────────────────────────────────── */}
        <div className={styles.header}>
          <span className={styles.pill}>Our Services</span>
          <h2 className={styles.heading}>Comprehensive Transportation Solutions</h2>
          <p className={styles.subheading}>
            Tailored services designed to meet all your corporate transportation needs
          </p>
        </div>

        {/* ── Main Service Cards 2×2 ──────────────────────────── */}
        <div className={styles.grid}>
          {MAIN_SERVICES.map((service, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Badge */}
                <span className={`${styles.badge} ${service.badgeClass}`}>
                  {service.badge}
                </span>
                {/* Icon box — sits at bottom-left, overlapping the image */}
                <div className={styles.iconBox}>
                  <Image
                    src={service.icon}
                    alt={`${service.title} icon`}
                    width={32}
                    height={32}
                  />
                </div>
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span className={styles.featureText}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#booking" className={styles.quoteBtn}>Get Quote</a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Additional Services ─────────────────────────────── */}
        <div className={styles.additionalWrapper}>
          <h3 className={styles.additionalTitle}>Additional Services</h3>
          <p className={styles.additionalSub}>
            Comprehensive solutions to enhance your transportation experience
          </p>
          <div className={styles.additionalGrid}>
            {ADDITIONAL_SERVICES.map((svc, idx) => (
              <div key={idx} className={styles.additionalCard}>
                <div className={styles.additionalIcon}>{svc.icon}</div>
                <h4 className={styles.additionalCardTitle}>{svc.title}</h4>
                <p className={styles.additionalCardDesc}>{svc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ready to Get Started CTA ────────────────────────── */}
        <div className={styles.ctaBox}>
          <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
          <p className={styles.ctaSub}>
            Contact us today for a customized transportation quote and get a first-class quote
          </p>
          <a href="#booking" className={styles.ctaBtn}>Request a Quote</a>
        </div>
      </div>
    </section>
  );
}
