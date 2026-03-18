import React from 'react';

export default function CTASection() {
  return (
    <section id="cta" className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Ride?</h2>
          <p>
            Book your next trip with SK Travel and experience the difference.
            Fast booking, transparent pricing, and drivers who care.
          </p>
          <div className="cta-actions">
            <a href="#booking" className="btn btn-primary btn-lg">
              Book Now
            </a>
            <a href="tel:+911234567890" className="btn btn-outline btn-lg">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
