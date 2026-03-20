'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/"},
  { label: "About", href: "/about"},
  { label: "Services", href: "/#services"},
  { label: "Features", href: "/#features"},
  { label: "Contact", href: "/#contact"},
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${hidden ? styles.headerHidden : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
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

        {/* Center Navigation Pills (Desktop) */}
        <nav className={styles.navDesktop}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${styles.navLinkBg}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className={styles.rightGroup}>
          {/* Authentication Buttons (Desktop) */}
          <div className={styles.authButtons}>
            <Link href="/login" className={styles.loginBtn}>
              Log in
            </Link>
            <Link href="/signup" className={styles.signupBtn}>
              Sign up
            </Link>
          </div>

          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
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
            <Link href="/login" className={styles.loginBtn} onClick={() => setIsOpen(false)}>
              Log in
            </Link>
            <Link href="/signup" className={styles.signupBtn} onClick={() => setIsOpen(false)}>
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
