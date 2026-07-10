'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const socialIconClass =
  'flex h-10 w-10 items-center justify-center rounded-lg bg-[#3d4150] text-[#fbbf24] transition-colors duration-200 hover:bg-[#fbbf24] hover:text-[#111827]';

const headingBaseClass =
  'flex cursor-pointer items-center justify-between text-lg font-bold text-white md:pointer-events-none md:cursor-default';

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  const getListClassName = (section: string) =>
    [
      'm-0 flex list-none flex-col gap-[0.85rem] overflow-hidden p-0 pt-5 transition-all duration-300 ease-out md:max-h-none md:pt-6 md:opacity-100',
      openSection === section ? 'mb-8 max-h-[500px] opacity-100' : 'mb-0 max-h-0 opacity-0 md:mb-0',
    ].join(' ');

  return (
    <footer className="rounded-t-[2.5rem] bg-[#2d303e] pb-16 pt-8 text-[#9ba3af]">
      <div className="mx-auto w-full max-w-[1480px] px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-[2.5fr_1fr_1fr_1fr] md:gap-8">
          <div className="flex flex-col">
            <Link
              href="/"
              className="mb-6 flex w-fit shrink-0 items-center gap-2 rounded-2xl bg-white px-3 py-2 leading-none"
            >
              <Image
                src="/mainlogo.png"
                alt="Sri Kalyani Voyages Logo"
                width={500}
                height={500}
                className="h-11 w-auto md:h-14"
              />
              <span className="font-brand whitespace-nowrap text-lg font-bold leading-none md:text-xl">
                <span className="text-[#f3b33d]">SRI KALYANI</span>{' '}
                <span className="text-[#085E87]">VOYAGES</span>
              </span>
            </Link>
            <p className="mb-8 text-[0.95rem] leading-[1.7] text-[#9ba3af]">
              Professional corporate
              <br />
              transportation solutions for modern
              <br />
              businesses.
            </p>
            <div className="flex gap-3">
              <a href="#" className={socialIconClass} aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className={socialIconClass} aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className={socialIconClass} aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className={socialIconClass} aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className={headingBaseClass} onClick={() => toggleSection('services')}>
              Services
              <ChevronDown className={`transition-transform duration-300 md:hidden ${openSection === 'services' ? 'rotate-180' : ''}`} size={18} />
            </h4>
            <ul className={getListClassName('services')}>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/services">Daily Commute</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/services">Corporate Events</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/services">Airport Transfers</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/services">Group Transport</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/services">Executive Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={headingBaseClass} onClick={() => toggleSection('company')}>
              Company
              <ChevronDown className={`transition-transform duration-300 md:hidden ${openSection === 'company' ? 'rotate-180' : ''}`} size={18} />
            </h4>
            <ul className={getListClassName('company')}>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/about">About Us</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/contact">Careers</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/contact">Blog</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/contact">Press</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/contact">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={headingBaseClass} onClick={() => toggleSection('support')}>
              Support
              <ChevronDown className={`transition-transform duration-300 md:hidden ${openSection === 'support' ? 'rotate-180' : ''}`} size={18} />
            </h4>
            <ul className={getListClassName('support')}>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/contact">Help Center</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/about">Safety</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/terms">Terms and Conditions</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/privacy">Privacy Policy</Link></li>
              <li><Link className="text-[0.95rem] transition-colors duration-200 hover:text-white" href="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#3d4150] pt-8 text-sm text-[#9ba3af] md:flex-row">
          <div>© {new Date().getFullYear()} Sk Voyages. All rights reserved.</div>
          <div>Designed with ♥ for corporate travelers</div>
        </div>
      </div>
    </footer>
  );
}
