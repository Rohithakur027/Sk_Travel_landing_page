import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Travellink-Powered by Sk Voyages',
  description: 'Your trusted voyages partner for premium transportation services.',
  icons: {
    icon: [
      { url: '/icons/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon_io/favicon.ico' },
    ],
    apple: '/icons/favicon_io/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/icons/favicon_io/site.webmanifest' },
    ],
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
