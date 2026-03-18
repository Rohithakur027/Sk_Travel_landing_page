import React from 'react';

const FEATURES = [
  {
    title: '24/7 Availability',
    description: 'Our fleet is available around the clock, any day of the year.',
    icon: '🕐',
  },
  {
    title: 'Professional Drivers',
    description: 'Vetted, licensed, and courteous drivers for a safe journey.',
    icon: '👨‍✈️',
  },
  {
    title: 'Real-time Tracking',
    description: 'Track your ride live and share your trip with loved ones.',
    icon: '📍',
  },
  {
    title: 'Transparent Pricing',
    description: 'No surge pricing. Know exactly what you pay before you book.',
    icon: '💳',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose SK Travel?</h2>
          <p>We provide more than just a ride — we deliver an experience.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
