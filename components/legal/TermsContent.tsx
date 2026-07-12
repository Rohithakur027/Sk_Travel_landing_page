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
    heading: 'Acceptance of These Terms',
    paragraphs: [
      `By accessing this website, requesting a quote, making a booking or using any transportation service provided by ${COMPANY_LEGAL_NAME}, you agree to be bound by these Terms and Conditions. If you are booking on behalf of an organisation, you confirm that you are authorised to accept these terms for that organisation.`,
      'If you do not agree with any part of these terms, please do not use our website or services.',
    ],
  },
  {
    heading: 'Definitions',
    bullets: [
      <>
        <strong className="font-bold text-[#2D3142]">&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;</strong> refers to {COMPANY_LEGAL_NAME}, including
        its units Namma Gadi and SK Voyages.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">&ldquo;Client&rdquo;, &ldquo;you&rdquo; or &ldquo;your&rdquo;</strong> refers to the individual or
        organisation booking or using our services.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">&ldquo;Passenger&rdquo;</strong> refers to any person travelling in a vehicle
        arranged by us.
      </>,
      <>
        <strong className="font-bold text-[#2D3142]">&ldquo;Services&rdquo;</strong> refers to the corporate transportation services we
        provide, including daily employee commute, corporate events, airport transfers, group transport and executive
        travel.
      </>,
    ],
  },
  {
    heading: 'Our Services',
    paragraphs: [
      'We provide corporate and business transportation services operated by verified, professionally trained drivers. Service availability depends on the city, route, vehicle type and time of travel requested.',
      'We reserve the right to modify, suspend or withdraw any service, vehicle category or route at any time, and to decline a booking request at our discretion.',
    ],
  },
  {
    heading: 'Bookings and Confirmation',
    paragraphs: [
      'A booking request submitted through our website, mobile application, phone or email is an enquiry and does not constitute a confirmed reservation. A booking is confirmed only once we acknowledge it in writing or through our booking platform.',
      'You are responsible for providing accurate pickup and drop-off details, travel dates and times, passenger count and contact information. We are not liable for delays, additional charges or failed pickups arising from incorrect or incomplete information supplied by you.',
    ],
  },
  {
    heading: 'Fares, Billing and Payment',
    paragraphs: [
      'Fares are quoted based on the vehicle category, distance, duration, route and any additional requirements at the time of booking. Quotes are indicative until the booking is confirmed.',
      'Charges may vary where the actual trip differs from the booking, including route deviations, waiting time beyond the agreed period, additional stops, extended hours, tolls, parking fees, permits and applicable state taxes.',
      'Corporate accounts are invoiced as per the agreed billing cycle. Invoices are payable within the credit period stated on the invoice. We reserve the right to suspend services on accounts with overdue payments.',
      'All applicable taxes, including GST, are charged in addition to the quoted fare unless expressly stated otherwise.',
    ],
  },
  {
    heading: 'Cancellations, Rescheduling and No-Shows',
    paragraphs: [
      'Cancellation and rescheduling requests must be communicated to us through the booking platform or our support channels as early as possible.',
      'Cancellation charges may apply where a confirmed booking is cancelled at short notice, where a vehicle has already been dispatched, or where the booking involves a chartered or specially arranged vehicle.',
      'If a passenger does not board within the agreed waiting period at the confirmed pickup point, the trip may be treated as a no-show and charged in full.',
    ],
  },
  {
    heading: 'Passenger Conduct and Responsibilities',
    paragraphs: [
      'Passengers must comply with all applicable laws and with the reasonable instructions of the driver while in the vehicle. Seat belts must be worn at all times.',
    ],
    bullets: [
      'Smoking, consumption of alcohol and use of prohibited substances are not permitted in any vehicle.',
      'Passengers must not carry hazardous, illegal or prohibited goods.',
      'Abusive, threatening or unsafe behaviour towards drivers or staff is not tolerated and may result in the trip being terminated.',
      'You are responsible for the cost of repair or professional cleaning where a passenger causes damage to or soiling of a vehicle.',
      'We may refuse or discontinue carriage of any passenger whose conduct puts the safety of the vehicle, driver or other passengers at risk.',
    ],
  },
  {
    heading: 'Safety and Driver Verification',
    paragraphs: [
      'All drivers engaged by us undergo background verification and professional training, and our vehicles are maintained in accordance with applicable regulatory requirements.',
      'Safety features such as emergency alert and support access are provided to assist passengers, but they do not replace emergency services. In an emergency, contact the relevant public emergency number first.',
    ],
  },
  {
    heading: 'Vehicles, Luggage and Lost Property',
    paragraphs: [
      'Vehicle allocation is made by category, not by specific make or model. We may substitute a vehicle of an equivalent or higher category where operationally necessary.',
      'Luggage is carried subject to the capacity of the allotted vehicle. Passengers are responsible for their personal belongings at all times.',
      'We do not accept liability for loss of or damage to personal property left in a vehicle. Items recovered from a vehicle will be held for a limited period and may be returned at the passenger’s cost.',
    ],
  },
  {
    heading: 'Delays and Circumstances Beyond Our Control',
    paragraphs: [
      'While we plan routes to minimise travel time, we do not guarantee arrival at a specific time. Journey times are estimates and may be affected by traffic, weather, road closures, vehicle breakdown, civil disruption, government action, acts of God or other circumstances beyond our reasonable control.',
      'We are not liable for any loss arising from a missed flight, missed meeting or missed connection. We recommend allowing sufficient buffer time for airport transfers and time-critical travel.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, our total liability arising out of or in connection with any booking is limited to the amount paid by you for that booking.',
      'We are not liable for any indirect, incidental, special or consequential loss, including loss of profit, loss of business, loss of opportunity or loss of data, however arising.',
      'Nothing in these terms limits or excludes liability that cannot be limited or excluded under applicable law.',
    ],
  },
  {
    heading: 'Website Use and Intellectual Property',
    paragraphs: [
      `All content on this website, including text, graphics, logos, images, brand names and software, is the property of ${COMPANY_LEGAL_NAME} or its licensors and is protected by applicable intellectual property laws.`,
      'You may not copy, reproduce, distribute, modify or create derivative works from any part of this website without our prior written consent. You agree not to use the website for any unlawful purpose or in a way that impairs its operation or security.',
    ],
  },
  {
    heading: 'Third-Party Services',
    paragraphs: [
      'Our website uses third-party services, including mapping and location search providers, to power address lookup and route estimation. Your use of those features is also subject to the terms of the relevant provider.',
      'We are not responsible for the content, availability or practices of any third-party website or service linked from our platform.',
    ],
  },
  {
    heading: 'Suspension and Termination',
    paragraphs: [
      'We may suspend or terminate your access to our services, or decline future bookings, where you breach these terms, where payment obligations are not met, or where we reasonably believe that continued service poses a safety, legal or reputational risk.',
    ],
  },
  {
    heading: 'Governing Law and Jurisdiction',
    paragraphs: [
      'These Terms and Conditions are governed by and construed in accordance with the laws of India. The courts at Bangalore, Karnataka shall have exclusive jurisdiction over any dispute arising out of or in connection with these terms or our services.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    paragraphs: [
      'We may update these Terms and Conditions from time to time to reflect changes in our services, operations or legal obligations. The revised terms take effect from the date they are published on this page, and the “Last updated” date above will be amended accordingly.',
      'Your continued use of our website or services after any change constitutes acceptance of the revised terms.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'If you have any questions about these Terms and Conditions, please contact us:',
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

export default function TermsContent() {
  return (
    <LegalLayout
      pill="Legal"
      titleTop="Terms and"
      titleAccent="Conditions"
      intro="Please read these terms carefully before booking or using any of our corporate transportation services."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={SECTIONS}
    />
  );
}
