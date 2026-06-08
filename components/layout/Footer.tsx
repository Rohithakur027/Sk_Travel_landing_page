'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, ChevronDown } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    // Only toggle on mobile screens (less than 768px wide)
    if (window.innerWidth < 768) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <div className={styles.logoBox}>
                <Image src="/icons/sklogofinal.png" alt="Sk Voyage Logo" width={60} height={32} className={styles.logoImg} />
              </div>
              <span className={styles.brandName}>Sk Voyage</span>
            </Link>
            <p className={styles.brandText}>
              Professional corporate<br />
              transportation solutions for modern<br />
              businesses.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 
              className={styles.colHeading} 
              onClick={() => toggleSection('services')}
            >
              Services
              <ChevronDown className={`${styles.chevron} ${openSection === 'services' ? styles.chevronOpen : ''}`} size={18} />
            </h4>
            <ul className={`${styles.linkList} ${openSection === 'services' ? styles.linkListOpen : ''}`}>
              <li><Link href="/services">Daily Commute</Link></li>
              <li><Link href="/services">Corporate Events</Link></li>
              <li><Link href="/services">Airport Transfers</Link></li>
              <li><Link href="/services">Group Transport</Link></li>
              <li><Link href="/services">Executive Service</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 
              className={styles.colHeading} 
              onClick={() => toggleSection('company')}
            >
              Company
              <ChevronDown className={`${styles.chevron} ${openSection === 'company' ? styles.chevronOpen : ''}`} size={18} />
            </h4>
            <ul className={`${styles.linkList} ${openSection === 'company' ? styles.linkListOpen : ''}`}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Careers</Link></li>
              <li><Link href="/contact">Blog</Link></li>
              <li><Link href="/contact">Press</Link></li>
              <li><Link href="/contact">Partners</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 
              className={styles.colHeading} 
              onClick={() => toggleSection('support')}
            >
              Support
              <ChevronDown className={`${styles.chevron} ${openSection === 'support' ? styles.chevronOpen : ''}`} size={18} />
            </h4>
            <ul className={`${styles.linkList} ${openSection === 'support' ? styles.linkListOpen : ''}`}>
              <li><Link href="/contact">Help Center</Link></li>
              <li><Link href="/about">Safety</Link></li>
              <li><Link href="/">Terms of Service</Link></li>
              <li><Link href="/">Privacy Policy</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>© {new Date().getFullYear()} Sk Voyage. All rights reserved.</div>
          <div>Designed with ♥ for corporate travelers</div>
        </div>
      </div>
    </footer>
  );
}
