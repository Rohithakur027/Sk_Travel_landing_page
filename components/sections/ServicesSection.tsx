import React from 'react';

const SERVICES = [
  {
    title: 'Airport Transfers',
    description: 'Punctual pick-ups and drop-offs for all major airports.',
    icon: '✈️',
  },
  {
    title: 'City Rides',
    description: 'Quick and affordable rides across the city, anytime.',
    icon: '🏙️',
  },
  {
    title: 'Outstation Trips',
    description: 'Comfortable long-distance travel with experienced drivers.',
    icon: '🛣️',
  },
  {
    title: 'Corporate Cab Services',
    description: 'Dedicated fleet management for your business needs.',
    icon: '🏢',
  },
  {
    title: 'Hourly Rentals',
    description: 'Hire a cab by the hour for flexible local travel.',
    icon: '⏱️',
  },
  {
    title: 'Wedding & Events',
    description: 'Luxury vehicles for your most memorable occasions.',
    icon: '💍',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>From daily commutes to special events, we have you covered.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.title} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
