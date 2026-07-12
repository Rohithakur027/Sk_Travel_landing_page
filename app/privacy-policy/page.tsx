import type { Metadata } from 'next';
import PrivacyContent from '@/components/legal/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | SRI KALYANI VOYAGES',
  description:
    'How Sri Kalyani Voyages collects, uses, shares and protects the personal information of its customers and passengers.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
