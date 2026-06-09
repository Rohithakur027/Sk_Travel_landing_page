import Image from 'next/image';
import Link from 'next/link';
import Pill from '@/components/ui/Pill';

const FEATURE_CARDS = [
  { title: 'Smart Scheduling', desc: 'Automated scheduling with recurring trip support and flexible booking options', icon: '/Container (12).png' },
  { title: 'Mobile App', desc: 'User-friendly mobile applications for employees and administrators', icon: '/Container (13).png' },
  { title: 'Analytics Dashboard', desc: 'Detailed insights on usage, costs, and performance metrics', icon: '/Container (14).png' },
  { title: 'Driver Verification', desc: 'Comprehensive background checks and professional training for all drivers', icon: '/Container (15).png' },
  { title: 'SOS & Safety', desc: 'Emergency alert system with instant support access for passenger safety', icon: '/Container (16).png' },
  { title: 'Automated Billing', desc: 'Transparent invoicing with detailed trip breakdowns and cost allocation', icon: '/Container (17).png' },
  { title: 'Route Optimization', desc: 'AI-powered routing to minimize travel time and maximize efficiency', icon: '/Container (18).png' },
  { title: 'Multi-Location Support', desc: 'Manage transportation across multiple offices and pickup points', icon: '/Container (19).png' },
  { title: 'Vehicle Variety', desc: 'Multiple vehicle types from sedans to buses for different needs', icon: '/Container (20).png' },
];

const containerClassName = 'mx-auto w-full max-w-[1200px] px-6';
const heroRowClassName = 'my-12 flex flex-col items-center gap-8 md:my-16 md:gap-8 lg:flex-row';
const imageCardClassName = 'relative h-[280px] w-full overflow-hidden rounded-3xl md:h-[450px] lg:w-[494px]';
const sectionTitleClassName = 'text-[30px] font-extrabold leading-[1.12] text-[#111827]';

export default function FeaturesPage() {
  return (
    <section className="bg-white">
      <div className="flex min-h-[480px] w-screen items-start justify-center bg-[#2d3142] px-4 pb-12 pt-[calc(var(--navbar-height)+2rem)] text-center max-md:min-h-0 max-md:px-6 md:items-center md:py-8 md:pt-[calc(var(--navbar-height)+4rem)]">
        <div>
          <Pill className="mb-8">Platform Features</Pill>
          <h1 className="m-0 font-heading text-[2.25rem] font-black leading-[1.2] tracking-[-0.02em] text-white md:text-[4.5rem] md:leading-[1.1]">
            Advanced Features for
            <br />
            <span className="inline-block bg-[linear-gradient(171.05deg,#FFD23F_5.73%,#FFA726_94.27%)] bg-clip-text text-transparent">
              Modern Transportation
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-[0.95rem] leading-[1.6] text-white/50 md:text-base">
            Discover the technology and features that make SK Voyages the smart choice for corporate transportation
          </p>
        </div>
      </div>

      <div className={containerClassName}>
        <div className={heroRowClassName}>
          <div className="flex-1">
            <Pill variant="dark" className="mb-5">Real-Time Intelligence</Pill>
            <h2 className="mb-3 text-[2rem] font-bold text-[#111827] md:text-[2.5rem]">
              Track Every Journey <span className="inline whitespace-nowrap md:block">in Real-Time</span>
            </h2>
            <p className="max-w-[520px] text-base leading-[1.6] text-[#6b7280]">
              Our advanced GPS tracking system allows you to monitor all your vehicles in real-time. Know exactly where your employees are and when they&apos;ll arrive at their destination.
            </p>

            <ul className="mt-5 list-none p-0">
              {[
                ['Live GPS Tracking', 'Monitor vehicle locations on an interactive map', 'Live GPS'],
                ['ETA Updates', 'Accurate arrival time estimates with traffic considerations', 'ETA'],
                ['Route History', 'Complete journey logs and historical route data', 'Route History'],
                ['Driver Details', 'View driver information and contact details', 'Driver Details'],
              ].map(([title, desc, alt]) => (
                <li key={title} className="mb-5 flex items-start gap-3 text-[#374151]">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,rgba(255,210,63,0.15),rgba(255,210,63,0.06))]">
                    <Image src="/Container (34).png" alt={alt} width={40} height={40} />
                  </span>
                  <div className="-mt-1.5">
                    <div className="mb-1 text-base font-bold leading-6 text-[#2d3142]">{title}</div>
                    <div className="text-sm leading-5 text-[#6b7280]">{desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full justify-center lg:w-[494px]">
            <div className={imageCardClassName}>
              <Image src="/images/featuretop.png" alt="Traffic" fill className="object-cover scale-110" priority />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fffbf0] px-0 pb-6 pt-14 max-md:pt-8 max-md:pb-3">
        <div className={containerClassName}>
          <div className="my-7 text-center max-md:mt-3">
            <h2 className={sectionTitleClassName}>Everything You Need</h2>
            <p className="mx-auto mt-1 max-w-[520px] text-sm leading-[1.4] text-[#6b7280]">
              Comprehensive features designed to make corporate transportation
              <span className="block text-center max-[480px]:inline"> effortless</span>
            </p>
          </div>

          <div className="mx-auto grid max-w-[1052px] grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {FEATURE_CARDS.map((card) => (
              <div
                key={card.title}
                className="flex flex-row items-center rounded-2xl bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:flex-col md:items-start md:rounded-3xl md:p-7"
              >
                <div className="mr-3 flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-[14px] md:mb-[14px] md:mr-0 md:h-14 md:w-14">
                  <Image src={card.icon} alt={card.title} width={56} height={56} className="h-full w-full rounded-xl object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-bold text-[#111827] md:mb-2 md:font-heading md:text-[1.05rem] md:font-extrabold">
                    {card.title}
                  </h3>
                  <p className="m-0 text-[13px] leading-[1.35] text-[#6b7280] md:text-base md:leading-[1.6]">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={containerClassName}>
        <div className={heroRowClassName}>
          <div className="order-1 flex w-full justify-center lg:order-1 lg:w-[494px]">
            <div className={imageCardClassName}>
              <Image src="/images/safetyprior.png" alt="Car" fill className="object-cover scale-110" priority />
            </div>
          </div>

          <div className="order-2 flex-1 lg:order-2">
            <Pill variant="dark" className="mb-5">Safety First</Pill>
            <h2 className="mb-3 text-[2rem] font-bold text-[#111827] md:text-[2.5rem]">
              Your Safety is Our Priority
            </h2>
            <p className="max-w-[520px] text-base leading-[1.6] text-[#6b7280]">
              We implement comprehensive safety measures to ensure every journey is secure and comfortable for your employees.
            </p>

            <div className="mt-5 flex flex-col gap-6">
              {[
                ['/Container (30).png', 'Background Verified Drivers', 'Every driver undergoes thorough police verification and background checks'],
                ['/Container (31).png', 'Regular Vehicle Maintenance', 'All vehicles undergo regular inspections and maintenance checks'],
                ['/Container (32).png', '24/7 Emergency Support', 'Round-the-clock support team available for any emergency situations'],
                ['/Container (33).png', 'Real-Time Ride Sharing', 'Share your trip details with family or colleagues for added security'],
              ].map(([icon, title, desc]) => (
                <div
                  key={title}
                  className="flex items-start gap-5 rounded-[18px] bg-white p-[18px] shadow-[0_18px_40px_rgba(2,6,23,0.06)]"
                >
                  <div className="mt-1 flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,rgba(255,210,63,0.12),rgba(255,210,63,0.06))]">
                    <Image src={icon} alt={title} width={48} height={48} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-[13px] font-bold text-[#111827] md:text-base">
                      {title}
                    </h4>
                    <p className="m-0 leading-[1.5] text-[#6b7280]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-0 bg-[#2D3142] px-0 pb-10 pt-14 text-white max-md:px-3 max-md:py-12">
        <div className="mx-auto max-w-[1052px] px-6 text-center">
          <h3 className="mb-3 text-[32px] font-extrabold">Powered by Advanced Technology</h3>
          <p className="mb-8 text-white/75">Built on cutting-edge technology to deliver reliable and efficient service</p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {[
              ['/Container (30).png', 'Cloud Infrastructure', '99.9% uptime guaranteed', '99.9% uptime assured'],
              ['/Container (31).png', 'AI Routing', 'Smart traffic prediction', 'Smart traffic prediction'],
              ['/Container (32).png', 'Mobile First', 'iOS & Android apps', 'iOS & Android apps'],
              ['/Container (33).png', 'Data Security', 'Bank-level encryption', 'Bank-level encryption'],
            ].map(([icon, label, desktopText, mobileText]) => (
              <div key={label} className="flex flex-col items-center gap-[6px]">
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl md:h-20 md:w-20">
                  <Image src={icon} alt={label} width={56} height={56} className="h-14 w-14 object-contain" />
                </div>
                <div className="min-h-6 whitespace-nowrap text-sm font-bold leading-[1.1] text-white md:min-h-7">
                  {label}
                </div>
                <div className="mt-1 text-[13px] text-white/75 md:hidden">{mobileText}</div>
                <div className="mt-1 hidden text-sm text-white/75 md:block">{desktopText}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={containerClassName}>
        <div className="mx-auto my-10 max-w-[1052px] rounded-[32px] bg-white px-5 py-7 text-center shadow-[0_12px_32px_rgba(2,6,23,0.05)] md:px-12 md:py-14">
          <h3 className={sectionTitleClassName}>Experience These Features</h3>
          <p className="mx-auto mt-2 max-w-[520px] text-sm leading-[1.4] text-[#6b7280]">
            Schedule a demo to see how our platform can transform your
            <span className="block max-[600px]:inline"> corporate transportation</span>
          </p>
          <div className="mt-6">
            <Link
              href="/contact#booking"
              className="inline-flex items-center gap-3 rounded-lg bg-[linear-gradient(180deg,#FFD23F,#FFA726)] px-7 py-3 text-base font-bold text-[#111827] shadow-[0_8px_24px_rgba(255,210,63,0.4)]"
            >
              Send an Enquiry →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
