import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Get in Touch</h2>
          <p>
            Have questions? Our team is ready to help you with your<br />
            transportation needs
          </p>
        </div>
        <div className={styles.grid}>
          {/* Left Column: Form Wrapper */}
          <div className={styles.formWrapper}>
            <h3 className={styles.formHeading}>Send us a Message</h3>
            <p className={styles.formSubheading}>
              Fill out the form below and we'll get back to you shortly
            </p>
            <ContactForm />
          </div>

          {/* Right Column: Info Cards */}
          <div className={styles.infoList}>
            {/* Image Card */}
            <div className={styles.imageCard}>
              <Image 
                src="/images/getintouch.png" 
                alt="Getting in touch with our team" 
                fill 
                className={styles.image} 
              />
              <div className={styles.imageOverlay}>
                <h4>We're Here to Help</h4>
                <p>Our dedicated team is ready to assist you</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Phone size={20} />
              </div>
              <div className={styles.infoTextGroup}>
                <p className={styles.infoLabel}>Call Us</p>
                <h4 className={styles.infoValue}>+1 (555) 123-4567</h4>
                <p className={styles.infoSubtitle}>Mon-Fri 9am-6pm</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <Mail size={20} />
              </div>
              <div className={styles.infoTextGroup}>
                <p className={styles.infoLabel}>Email Us</p>
                <h4 className={styles.infoValue}>contact@skvoyage.com</h4>
                <p className={styles.infoSubtitle}>We reply within 24 hours</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.infoTextGroup}>
                <p className={styles.infoLabel}>Visit Us</p>
                <h4 className={styles.infoValue}>123 Business Ave, Suite 100</h4>
                <p className={styles.infoSubtitle}>New York, NY 10001</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
