import LegalLayout, { LegalSection } from '@/components/legal/LegalLayout';
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_PHONE,
  LEGAL_LAST_UPDATED,
} from '@/lib/constants/company';

const SECTIONS: LegalSection[] = [
  {
    heading: 'Introduction',
    paragraphs: [
      `${COMPANY_LEGAL_NAME} respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what we collect, why we collect it, how we use and protect it, and the choices available to you.`,
      'This policy applies to our website, our booking and enquiry forms, our mobile applications and the transportation services we provide.',
    ],
  },
  {
    heading: 'Information We Collect',
    paragraphs: ['We collect the following categories of information:'],
    bullets: [
      <>
        <strong className="font-bold text-[#2D3142]">Contact details</strong> — your name, email address, phone number
        and, for corporate enquiries, your company name.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Booking details</strong> — pickup location, destination, travel
        date and time, return trip details, vehicle type, booking category and number of passengers.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Location data</strong> — the geographic coordinates of the pickup
        and drop-off points you select, and the estimated distance of the trip, used to plan the route and estimate the
        fare.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Communications</strong> — the content of enquiry messages, support
        requests and correspondence you send us.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Technical information</strong> — standard log data such as browser
        type, device type and pages visited, collected when you use our website.
      </>,
    ],
  },
  {
    heading: 'How We Use Your Information',
    bullets: [
      'To respond to enquiries, prepare quotes and confirm bookings.',
      'To arrange, dispatch and operate your trip, including sharing the necessary details with the assigned driver.',
      'To calculate fares, raise invoices and process payments for corporate accounts.',
      'To provide customer support and resolve complaints or disputes.',
      'To maintain the safety and security of passengers, drivers and vehicles.',
      'To improve our services, routes and platform performance.',
      'To meet legal, regulatory, tax and accounting obligations.',
    ],
  },
  {
    heading: 'Legal Basis for Processing',
    paragraphs: [
      'We process your personal information where it is necessary to perform the service you have requested, where we have a legitimate business interest in operating and improving our services safely, where we are required to do so by law, or where you have given us your consent.',
      'Where processing is based on consent, you may withdraw that consent at any time by contacting us. Withdrawal does not affect processing carried out before the withdrawal.',
    ],
  },
  {
    heading: 'Location and Mapping Services',
    paragraphs: [
      'Our address search and route estimation features are powered by Mapbox, a third-party mapping provider. When you type an address into a booking form, the text you enter is sent to Mapbox to return matching location suggestions.',
      'If you choose to share your device location with our website, it is used only to suggest nearby pickup points. You can decline this permission or revoke it in your browser or device settings at any time, and you can still enter an address manually.',
    ],
  },
  {
    heading: 'Sharing Your Information',
    paragraphs: [
      'We do not sell your personal information. We share it only in the circumstances described below:',
    ],
    bullets: [
      <>
        <strong className="font-bold text-[#2D3142]">Drivers and operations staff</strong> — the details required to
        carry out your trip, such as name, contact number, pickup point and destination.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Your employer or booking organisation</strong> — where a trip is
        booked or paid for under a corporate account, trip and billing records may be shared with that organisation.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Service providers</strong> — mapping, hosting, communications and
        analytics providers who process information on our behalf under appropriate confidentiality obligations.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Legal and regulatory authorities</strong> — where disclosure is
        required by law, court order or a valid request from a government authority, or to establish, exercise or defend
        legal claims.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">Business transfers</strong> — in connection with a merger,
        acquisition or restructuring, subject to this policy continuing to apply.
      </>,
    ],
  },
  {
    heading: 'Cookies and Similar Technologies',
    paragraphs: [
      'Our website uses cookies and similar technologies to keep the site functioning correctly, remember your preferences and understand how the site is used.',
      'Most browsers allow you to refuse or delete cookies through their settings. Disabling certain cookies may affect the availability of some features, such as retaining your booking details between steps.',
    ],
  },
  {
    heading: 'Data Security',
    paragraphs: [
      'We apply appropriate technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration and loss. Access to booking and customer data is restricted to personnel who need it to perform their role.',
      'No method of transmission over the internet or method of electronic storage is completely secure. While we work to protect your information, we cannot guarantee absolute security.',
    ],
  },
  {
    heading: 'Data Retention',
    paragraphs: [
      'We retain personal information for as long as necessary to provide our services, maintain trip and billing records, resolve disputes, and comply with our legal, tax and regulatory obligations.',
      'When information is no longer required for these purposes, we delete it or anonymise it so that it can no longer be associated with you.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: ['Subject to applicable law, you have the right to:'],
    bullets: [
      'Request access to the personal information we hold about you.',
      'Request correction of information that is inaccurate or incomplete.',
      'Request deletion of your personal information where we are not required to retain it.',
      'Object to or request restriction of certain processing activities.',
      'Withdraw consent where processing is based on your consent.',
      'Lodge a complaint with the relevant data protection authority.',
    ],
  },
  {
    heading: "Children's Privacy",
    paragraphs: [
      'Our services are intended for corporate and adult customers. We do not knowingly collect personal information directly from children. Minors travelling as passengers do so under the responsibility of the booking adult or organisation. If you believe a child has provided us with personal information, please contact us so that we can remove it.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology or legal obligations. The revised policy takes effect from the date it is published on this page, and the “Last updated” date above will be amended accordingly.',
      'We encourage you to review this page periodically to stay informed about how we protect your information.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'If you have questions about this Privacy Policy, or wish to exercise any of your rights, please contact us:',
    ],
    bullets: [
      <>
        <strong className="font-bold text-[#2D3142]">{COMPANY_LEGAL_NAME}</strong>
      </>,
      <>{COMPANY_ADDRESS}</>,
      <>
        Email:{' '}
        <a className="font-semibold text-[#FFA726] hover:underline" href={`mailto:${COMPANY_EMAIL}`}>
          {COMPANY_EMAIL}
        </a>
      </>,
      <>
        Phone:{' '}
        <a
          className="font-semibold text-[#FFA726] hover:underline"
          href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`}
        >
          {COMPANY_PHONE}
        </a>
      </>,
    ],
  },
];

export default function PrivacyContent() {
  return (
    <LegalLayout
      pill="Legal"
      titleTop="Privacy"
      titleAccent="Policy"
      intro="How we collect, use and protect the personal information you share with us when you book and travel."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={SECTIONS}
    />
  );
}
