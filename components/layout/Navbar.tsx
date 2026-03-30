'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/"},
  { label: "About", href: "/about"},
  { label: "Services", href: "/services"},
  { label: "Features", href: "/features"},
  { label: "Contact", href: "/#contact"},
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.inner}>
        {/* Left Side: Logo + Navlinks Container */}
        <div className={styles.leftSideGroup}>
          <div className={styles.logoWrapper}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/icons/SKlogo.svg"
                alt="SK Travel Logo"
                width={140}
                height={48}
                className={styles.logoImg}
                priority
              />
            </Link>
          </div>

          {/* Navlinks Container in Left Side (Desktop) */}
          <nav className={styles.navDesktop}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className={styles.rightGroup}>
          {/* Authentication Buttons (Desktop) */}
          <div className={styles.authButtons}>
            <Link href="/#cta" className={styles.signupBtn}>
              Get Started
            </Link>
          </div>

          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.iconWrapper}>
              <Menu 
                className={`${styles.navIcon} ${isOpen ? styles.navIconActive : ''}`} 
                size={28} 
              />
              <X 
                className={`${styles.navIcon} ${styles.closeIcon} ${isOpen ? styles.closeIconActive : ''}`} 
                size={28} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className={styles.mobileNav}>
          <nav className={styles.mobileNavLinks}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileAuth}>
            <Link href="/#cta" className={styles.signupBtn} onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
