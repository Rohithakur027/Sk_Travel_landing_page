'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Features', href: '/features' },
  { label: 'Contact', href: '/contact' },
];

const desktopLinkClass =
  'relative mx-4 mb-[2px] whitespace-nowrap py-2 text-base font-semibold text-[rgba(45,49,66,1)] transition-colors duration-300 after:absolute after:bottom-[6px] after:left-0 after:h-[3px] after:w-0 after:rounded-full after:bg-[rgba(253,181,5,1)] after:transition-all after:duration-300 hover:text-[#111827] hover:after:w-full xl:mx-6';

const ctaClass =
  'hidden rounded-2xl bg-[rgba(255,200,57,1)] px-8 py-[0.8rem] text-base font-bold text-[#111827] shadow-[0_2px_8px_rgba(249,115,22,0.15)] transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-[rgba(255,190,40,1)] hover:shadow-[0_4px_12px_rgba(249,115,22,0.25)] lg:inline-flex';

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

  const isHome = pathname === '/';
  const headerClassName = [
    'fixed left-0 top-0 z-[100] w-full px-4 transition-all duration-300 ease-out max-[360px]:px-2',
    isHome ? 'bg-transparent' : 'bg-[rgba(45,49,66,1)]',
    isScrolled ? 'bg-transparent lg:bg-[rgba(45,49,66,1)]' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClassName}>
      <div className="relative mx-auto mt-3 flex h-[4.5rem] w-full max-w-[1480px] items-center justify-between rounded-[20px] border border-[rgba(241,243,245,0.6)] bg-white px-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-[360px]:mt-2 max-[360px]:h-[3.85rem] max-[360px]:rounded-[12px] max-[360px]:px-3 md:mt-4 md:h-[5.5rem]">
        <div className="flex items-center gap-[4.5rem]">
          <div className="flex items-center">
            <Link href="/" className="shrink-0">
              <Image
                src="/icons/sklogoreal3.png"
                alt="SK Voyages Logo"
                width={140}
                height={48}
                className="h-[78px] w-auto max-[360px]:h-[3.35rem] md:h-[112px]"
                priority
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${desktopLinkClass} ${isActive ? 'text-[#111827] after:w-full' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/#cta" className={ctaClass}>
              Get Started
            </Link>
          </div>

          <button
            className="relative flex h-10 w-10 items-center justify-center bg-transparent p-2 text-slate-700 transition-transform duration-200 ease-out active:scale-90 lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <div className="relative flex h-7 w-7 items-center justify-center">
              <Menu
                className={`absolute transition-all duration-300 ease-out ${isOpen ? 'rotate-180 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
                size={28}
              />
              <X
                className={`absolute transition-all duration-300 ease-out ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-50 opacity-0'}`}
                size={28}
              />
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed left-4 right-4 top-[4.75rem] z-[110] flex animate-slide-down flex-col gap-4 rounded-[20px] border border-[rgba(241,243,245,1)] bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] lg:hidden max-[360px]:top-[4.85rem] max-[360px]:rounded-2xl max-[360px]:p-4 md:top-[5.5rem]">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl bg-[#fafafa] px-4 py-[0.875rem] text-[1.1rem] font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 flex flex-col gap-4 md:hidden">
            <Link href="/#cta" className={ctaClass} onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
