import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <p>Have a question or need a custom quote? We&apos;re here to help.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <a href="tel:+911234567890">+91 12345 67890</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <a href="mailto:support@sktravel.in">support@sktravel.in</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Address</h4>
                <p>123, Travel Hub, New Delhi, India</p>
              </div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            {/* ContactForm component will be used here */}
            <p className="placeholder-text">
              Contact form will be rendered here (ContactForm component)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
