import React from "react";
import Image from "next/image";
import Link from 'next/link';
import {
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
    title: "Airport Transfers",
    description:
      "Never miss a flight again. Our airport transfer service provides punctual, stress-free transportation with real-time flight tracking.",
    iconSrc: "/Container (4).png",
    image: "/images/airpot.jpeg",
    imagePosition: "center",
    features: [
      "Flight tracking",
      "Meet & greet service",
      "24/7 availability",
      "Luggage assistance",
    ],
  },
  {
    title: "Executive Transportation",
    description:
      "Premium transportation for executives and VIP clients. Enjoy a first-class experience with our luxury fleet and highly trained chauffeurs.",
    iconSrc: "/Container (6).png",
    image: "/images/safetyprior.png",
    imagePosition: "center",
    features: [
      "Luxury fleet vehicles",
      "Certified chauffeurs",
      "Priority scheduling",
      "Amenity packages",
    ],
  },
  {
    title: "Corporate Shuttle Service",
    description:
      "Provide your employees with a reliable and comfortable daily commute. Our shuttle services are designed to maximize productivity and employee satisfaction.",
    iconSrc: "/Container (5).png",
    image: "/images/corporateshuttleupdated.png",
    imagePosition: "right center",
    features: [
      "Fixed route scheduling",
      "GPS tracked vehicles",
      "Professional drivers",
      "Employee app access",
    ],
  },
  {
    title: "Event Transportation",
    description:
      "Seamless group transportation for conferences, corporate events, and special occasions. We coordinate every detail to ensure your event runs smoothly.",
    iconSrc: "/Container (8).png",
    image: "/images/premiumfleet.jpeg",
    imagePosition: "center",
    features: [
      "Group capacity planning",
      "Event day coordination",
      "Multiple pick-up points",
      "Flexible scheduling",
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
    <>
      <section id="services" className={styles.section}>
        {/* ── Hero — mirrors About page layout exactly ──────────── */}
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>Our Services</div>
              <h1 className={styles.heroHeading}>
                Comprehensive <br/><span className={styles.heroHighlight}>Transportation Solutions</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Tailored services designed to meet all your corporate transportation needs
              </p>
            </div>
          </div>
        </div>

        {/* ── Cards Grid ────────────────────────────────────────── */}
        <div className={styles.container}>
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
                    style={{ objectPosition: service.imagePosition ?? "center" }}
                  />
                </div>
                <div className={styles.body}>
                  <div className={styles.cardTitleRow}>
                    <div className={styles.iconBadge}>
                      <img
                        src={service.iconSrc}
                        alt={service.title}
                        width={56}
                        height={56}
                        style={{ display: "block", background: "transparent" }}
                      />
                    </div>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                  </div>
                  <p className={styles.cardDesc}>{service.description}</p>
                  <ul className={styles.featureList}>
                    {service.features.map((f, i) => (
                      <li key={i} className={styles.featureItem}>
                          <span className={styles.checkIcon}>✓</span>
                          <span className={styles.featureText}>{f}</span>
                        </li>
                    ))}
                  </ul>
                  <Link href="/contact#booking" className={styles.quoteBtn}>Enquire Now →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cream lower band: Additional Services ────────────── */}
        <div className={styles.lowerBand}>
          <div className={styles.container}>
            <div className={styles.additionalWrapper}>
              <h3 className={styles.additionalTitle}>Additional Services</h3>
              <p className={styles.additionalSub}>
                Extra features to enhance your transportation experience
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
          </div>
        </div>
      </section>

      {/* ── CTA Section (separate) ─────────────────────────────── */}
      <section id="cta" className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
          <p className={styles.ctaSub}>
            Contact us today to discuss your corporate
            <span className={styles.ctaLine2}> transportation needs and get a</span>
            <span className={styles.ctaLine3}> customized quote</span>
          </p>
          <Link href="/contact#booking" className={styles.ctaBtn}>Send an Enquiry →</Link>
        </div>
      </section>
    </>
  );
}
