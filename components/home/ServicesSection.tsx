import React from "react";
import Image from "next/image";
import { Plane, LayoutGrid, CalendarCheck } from "lucide-react";
import styles from "./ServicesSection.module.css";

const SERVICES = [
  {
    title: "Airport Transfers",
    description:
      "Reliable pickup and drop-off services for all major airports. Track flights in real-time and meet your team on schedule.",
    icon: <Plane size={32} />,
    image: "/images/airportservice.png",
    badge: "Popular",
    badgeClass: styles.badgePopular,
  },
  {
    title: "Corporate Shuttles",
    description:
      "Daily commute solutions for your employees with scheduled routes, dedicated vehicles, and professional drivers.",
    icon: <LayoutGrid size={32} />,
    image: "/images/corporateshuttles.png",
    badge: "Best Value",
    badgeClass: styles.badgeBestValue,
  },
  {
    title: "Event Transportation",
    description:
      "Premium transportation for corporate events, conferences, and special occasions with flexible group booking options.",
    icon: <CalendarCheck size={32} />,
    image: "/images/eventtransportation.png",
    badge: "Premium",
    badgeClass: styles.badgePremium,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.pill}>Our Services</span>
          <h2 className={styles.heading}>
            Transportation Solutions
            <br />
            Tailored for Business
          </h2>
          <p className={styles.subheading}>
            From daily commutes to special events, we provide comprehensive
            transportation services for modern businesses
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {SERVICES.map((service, idx) => (
            <div key={idx} className={styles.card}>
              {/* Image + badge + icon */}
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Badge */}
                <span className={`${styles.badge} ${service.badgeClass}`}>
                  {service.badge}
                </span>
                {/* Icon box — sits at bottom-left, overlapping the image */}
                <div className={styles.iconBox}>{service.icon}</div>
              </div>

              {/* Text content */}
              <div className={styles.body}>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.desc}>{service.description}</p>
                <a href="#contact" className={styles.link}>
                  Learn More <span className={styles.arrow}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}