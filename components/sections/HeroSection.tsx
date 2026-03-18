import React from 'react';

export default function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Travel in <span className="text-primary">Comfort</span> &amp; Style
          </h1>
          <p className="hero-subtitle">
            Premium cab services for every journey — airport transfers, city rides,
            and outstation trips. Reliable, safe, and always on time.
          </p>
          <div className="hero-actions">
            <a href="#booking" className="btn btn-primary">
              Book a Ride
            </a>
            <a href="#fleet" className="btn btn-outline">
              View Fleet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
