import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <div className={styles.logoBox}>
                <Image src="/icons/SKlogo.svg" alt="Sk Voyage Logo" width={60} height={32} className={styles.logoImg} />
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
            <h4 className={styles.colHeading}>Services</h4>
            <ul className={styles.linkList}>
              <li><Link href="#">Daily Commute</Link></li>
              <li><Link href="#">Corporate Events</Link></li>
              <li><Link href="#">Airport Transfers</Link></li>
              <li><Link href="#">Group Transport</Link></li>
              <li><Link href="#">Executive Service</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className={styles.colHeading}>Company</h4>
            <ul className={styles.linkList}>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Press</Link></li>
              <li><Link href="#">Partners</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className={styles.colHeading}>Support</h4>
            <ul className={styles.linkList}>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Safety</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Contact Us</Link></li>
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
