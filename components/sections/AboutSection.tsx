import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            {/* Replace with actual image */}
            <div className="about-image-placeholder" />
          </div>
          <div className="about-content">
            <h2>About SK Travel</h2>
            <p>
              Founded with a passion for safe and comfortable travel, SK Travel
              has grown to become one of the most trusted cab services in the region.
              We combine technology with hospitality to ensure every journey exceeds
              your expectations.
            </p>
            <p>
              Our fleet is regularly serviced and our drivers are professionally
              trained, background-verified, and committed to your safety.
            </p>
            <a href="#contact" className="btn btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
