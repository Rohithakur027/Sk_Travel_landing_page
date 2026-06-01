"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/lib/context/ToastContext';
import styles from './CONTACT.module.css';


export default function CONTACT() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  
  const isFormIncomplete = 
    !formData.fullName.trim() || 
    !formData.company.trim() || 
    !formData.email.trim() || 
    !formData.phone.trim() || 
    !formData.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const names = formData.fullName.trim().split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '-';

      const response = await fetch('/api/public/special-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company_name: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.errors?.[0] || 'Failed to send message');
      
      showToast("success", "Your enquiry has been submitted! We'll be in touch shortly.");
      setFormData({ fullName: '', company: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      showToast("error", err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className={styles.contactPage}>
      {/* Hero / First Section - full width */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.ctaWrap}>
            <div className={styles.ctaImg} aria-hidden={false}>Get In Touch</div>
          </div>

          <h1 className={styles.title}>
            <span className={styles.line1}>Let's Start Your</span>
            <span className={styles.line2}>Transportation Journey</span>
          </h1>

          <p className={styles.lead}>
            <span className={styles.leadFirst}>Ready to transform your corporate transportation?</span>
            <span className={styles.leadConnector}>Reach out to us and</span>
            <span className={styles.leadSecond}>let's discuss your needs</span>
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          <form id="booking" className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formHeaderRow}>
              <div className={styles.tabCard}>
                <div className={styles.formTabs} role="tablist" aria-label="Contact type">
                  <div className={styles.specialBookingBadge}>Special Bookings</div>
                </div>
              </div>

              <h3 className={styles.formTitle}>Send us a Message</h3>
              <p className={styles.formDesc}>Fill out the form and our team will get back to you within 24 hours</p>
            </div>

              <div className={styles.formBody}>
                <label className={styles.requiredLabel}>
                  <span className={styles.reqText}>Full Name</span>
                  <input 
                    name="fullName" 
                    type="text" 
                    placeholder="Enter your name" 
                    required 
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </label>

                <label className={styles.requiredLabel}>
                  <span className={styles.reqText}>Company Name</span>
                  <input 
                    name="company" 
                    type="text" 
                    placeholder="Enter your company name" 
                    required 
                    value={formData.company}
                    onChange={handleChange}
                  />
                </label>

              <div className={styles.formRow}>
                <label className={styles.requiredLabel}>
                  <span className={styles.reqText}>Email</span>
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>

                <label className={styles.requiredLabel}>
                  <span className={styles.reqText}>Phone</span>
                  <input 
                    name="phone" 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label className={styles.requiredLabel}>
                <span className={styles.reqText}>Message</span>
                <textarea 
                  name="message" 
                  placeholder="Tell us about your transportation needs..." 
                  rows={6} 
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>


            <div className={styles.actions}>
              <button 
                type="submit" 
                className={`${styles.primaryBtn} ${isFormIncomplete ? styles.btnDisabled : ''}`} 
                disabled={isLoading || isFormIncomplete}
              >
                <span>{isLoading ? 'Sending...' : isFormIncomplete ? 'Send Message' : 'Send Message'}</span>
                {!isLoading && (
                  <span className={styles.btnIcon} aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M2 21L23 12L2 3v7l15 2-15 2v7z" fill="#08121A" opacity="0.95"/>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

          <aside className={styles.aside}>
            <div className={styles.contactCard}>
              <h3>Contact Information</h3>

              <div className={styles.contactItem}>
                <div className={styles.iconWrap}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="2.5" y="4" width="19" height="14" rx="2.5" stroke="#FFD23F" strokeWidth="1.6" fill="none" />
                      <path d="M3.5 6.5L12 12.2L20.5 6.5" stroke="#FFD23F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>
                <div>
                  <div className={styles.contactLabel}>Email Us</div>
                  <div className={styles.contactText}>contact@skvoayges.in<br />support@skvoayges.in</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrap}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.27c1.12.37 2.33.57 3.56.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1A19.92 19.92 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.23.2 2.44.57 3.56a1 1 0 0 1-.27 1l-2.2 2.2z" stroke="#FFD23F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>
                <div>
                  <div className={styles.contactLabel}>Call Us</div>
                  <div className={styles.contactText}>+91 98765 43210<br />24/7 Operational Support</div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrap}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#FFD23F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <circle cx="12" cy="9" r="2.2" stroke="#FFD23F" strokeWidth="1.6" fill="none" />
                    </svg>
                </div>
                <div>
                  <div className={styles.contactLabel}>Visit Us</div>
                  <div className={styles.contactText}>SK Voyage Headquarters<br />Andheri East, Mumbai<br />Maharashtra 400069, India</div>
                </div>
              </div>
            </div>

            <div className={styles.contactImageWrap}>
              <Image src="/images/classydriver.png" alt="vehicle" width={460} height={220} className={styles.contactImage} />
            </div>
          </aside>
        </div>

        {/* FAQ section removed per request */}
      </div>

      {/* Office Locations Section */}
      <section className={styles.officeSection}>
        <div className={styles.container}>
          <div className={styles.officeSectionHeader}>
            <h2 className={styles.officeTitle}>Our Office Locations</h2>
            <p className={styles.officeSubtitle}>We operate across major metropolitan cities in India to be closer to you</p>
          </div>

          <div className={styles.officeGrid}>
            {[
              { city: 'Mumbai', address: 'Andheri East, Mumbai 400069', phone: '+91 98765 43210' },
              { city: 'Delhi NCR', address: 'Gurgaon, Haryana 122001', phone: '+91 98765 43211' },
              { city: 'Bangalore', address: 'Whitefield, Bangalore 560066', phone: '+91 98765 43212' },
              { city: 'Pune', address: 'Hinjewadi, Pune 411057', phone: '+91 98765 43213' },
              { city: 'Hyderabad', address: 'HITEC City, Hyderabad 500081', phone: '+91 98765 43214' },
              { city: 'Chennai', address: 'OMR, Chennai 600096', phone: '+91 98765 43215' }
            ].map((office, idx) => (
              <div className={styles.officeCard} key={idx}>
                <div className={styles.officeIconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#FFD23F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="12" cy="9" r="2.2" stroke="#FFD23F" strokeWidth="1.6" fill="none" />
                  </svg>
                </div>
                <div className={styles.officeInfo}>
                  <h4 className={styles.officeCity}>{office.city}</h4>
                  <p className={styles.officeAddress}>{office.address}</p>
                  <p className={styles.officePhone}>{office.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (below office locations) */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
          <p className={styles.faqSubtitle}>Quick answers to questions you may have</p>
          <div className={styles.faqList}>
            <details>
              <summary>How do I get started with SK Voyage?</summary>
              <p>Simply fill out the contact form above or call us directly. We'll schedule a consultation to understand your needs and provide a customized solution.</p>
            </details>
            <details>
              <summary>What areas do you service?</summary>
              <p>We currently operate in Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, and Chennai. We're expanding to more cities across India.</p>
            </details>
            <details>
              <summary>Do you offer customized transportation solutions?</summary>
              <p>Yes — we understand every business is unique. We create tailored transportation plans based on your specific requirements, routes, and schedules.</p>
            </details>
            <details>
              <summary>How do you ensure driver quality and safety?</summary>
              <p>All our drivers undergo thorough background verification, police checks, and professional training. Vehicles are regularly maintained and inspected.</p>
            </details>
            <details>
              <summary>What is your pricing model?</summary>
              <p>We offer flexible pricing based on your needs — monthly contracts, per-trip basis, or custom packages. Contact us for a detailed quote.</p>
            </details>
          </div>
        </div>
      </section>
    </section>
  );
}
