import Link from 'next/link';
import { NAV_LINKS } from '@/constants/navLinks';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-blue-600">
          SK Travel
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/booking"
          className="hidden md:inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
