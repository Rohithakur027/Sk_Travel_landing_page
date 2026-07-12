import type { Metadata } from 'next';
import TermsContent from '@/components/legal/TermsContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions | SRI KALYANI VOYAGES',
  description:
    'The terms and conditions governing bookings and use of the corporate transportation services provided by Sri Kalyani Voyages.',
};

export default function TermsPage() {
  return <TermsContent />;
}
