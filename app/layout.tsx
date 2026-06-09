import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'SK Voyages - Premium Corporate Transportation',
  description: 'Your trusted partner for premium corporate transportation services.',
  icons: {
    icon: '/icons/favicon_io/favicon.ico',
    shortcut: '/icons/favicon_io/favicon-32x32.png',
    apple: '/icons/favicon_io/apple-touch-icon.png',
  },
};

import { ToastProvider } from '@/lib/context/ToastContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
