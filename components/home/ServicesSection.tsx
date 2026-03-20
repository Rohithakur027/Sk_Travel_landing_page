import React from "react";
import Image from "next/image";
import {
  Bus,
  Briefcase,
  CalendarCheck,
  Plane,
  MapPin,
  Radio,
  Settings,
  ShieldCheck,
  CreditCard,
  Headphones,
} from "lucide-react";
import styles from "./ServicesSection.module.css";

const MAIN_SERVICES = [
  {
    title: "Employee Shuttle Service",
    description:
      "Provide your employees with a reliable and comfortable daily commute. Our shuttle services are designed to maximize productivity and employee satisfaction.",
    icon: <Bus size={28} />,
    image: "/ImageWithFallback.png",
    features: [
      "Fixed route scheduling",
      "GPS tracked vehicles",
      "Professional drivers",
      "Employee app access",
    ],
  },
  {
    title: "Executive Transportation",
    description:
      "Premium transportation for executives and VIP clients. Enjoy a first-class experience with our luxury fleet and highly trained chauffeurs.",
    icon: <Briefcase size={28} />,
    image: "/ImageWithFallback (1).png",
    features: [
      "Luxury fleet vehicles",
      "Certified chauffeurs",
      "Priority scheduling",
      "Amenity packages",
    ],
  },
  {
    title: "Event Transportation",
    description:
      "Seamless group transportation for conferences, corporate events, and special occasions. We coordinate every detail to ensure your event runs smoothly.",
    icon: <CalendarCheck size={28} />,
    image: "/Container.png",
    features: [
      "Group capacity planning",
      "Event day coordination",
      "Multiple pick-up points",
      "Flexible scheduling",
    ],
  },
  {
    title: "Airport Transfers",
    description:
      "Never miss a flight again. Our airport transfer service provides punctual, stress-free transportation with real-time flight tracking.",
    icon: <Plane size={28} />,
    image: "/Container (1).png",
    features: [
      "Flight tracking",
      "Meet & greet service",
      "24/7 availability",
      "Luggage assistance",
    ],
  },
];

const ADDITIONAL_SERVICES = [
  {
    icon: <MapPin size={22} />,
    title: "Route Optimization",
    description: "AI-powered routing to minimize travel time and operational costs for your fleet.",
  },
  {
    icon: <Radio size={22} />,
    title: "Real Time Tracking",
    description: "Live GPS monitoring gives you full visibility over every vehicle in your fleet.",
  },
  {
    icon: <Settings size={22} />,
    title: "Customized Solutions",
    description: "Tailored transportation programs built around your unique business requirements.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Safety Protocols",
    description: "Rigorous driver vetting, vehicle inspections, and compliance reporting.",
  },
  {
    icon: <CreditCard size={22} />,
    title: "Flexible Billing",
    description: "Consolidated monthly invoicing, cost centers, and custom billing structures.",
  },
  {
    icon: <Headphones size={22} />,
    title: "24/7 Support",
    description: "Round-the-clock customer support to handle any transportation need or issue.",
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
                <div className={styles.iconBadge}>{service.icon}</div>
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {f}
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
