import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';

const FEATURES = [
  'Industry-leading safety standards',
  'Professional and verified drivers',
  '24/7 customer support',
  'Real-time tracking system',
];

export default function CorporateSection() {
  return (
    <section id="about" className="bg-[rgb(253,255,255)] py-16 md:py-28">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="relative">
          <div className="relative h-[22rem] w-full overflow-hidden rounded-3xl md:h-[30rem] lg:h-[35rem]">
            <Image
              src="/images/cardriver.png"
              alt="SK Voyages driver"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute left-2 top-[-2.5rem] flex flex-col gap-[0.15rem] rounded-2xl bg-amber-400 px-4 py-4 shadow-[0_8px_24px_rgba(251,191,36,0.4)] md:left-4 md:top-[-4rem] md:gap-[0.3rem] md:rounded-[1.25rem] md:px-6 md:py-8">
            <span className="text-[1.25rem] font-extrabold leading-none text-gray-900 md:text-[1.75rem]">10+ Years</span>
            <span className="text-xs font-medium text-gray-700 md:text-[0.9rem]">Of Excellence</span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="text-base font-bold uppercase tracking-[2px] text-amber-400">About SK Voyages</span>
          <h2 className="font-sans text-[2.25rem] font-bold leading-[1.15] tracking-[-0.02em] text-[rgba(45,49,66,1)] md:text-[2.5rem]">
            We Redefine Corporate Transportation
          </h2>
          <p className="text-[1.1rem] leading-[1.6] text-[#6B7280]">
            At SK Voyages, we understand that your time is valuable. That&apos;s why we&apos;ve built a transportation service that prioritizes reliability,
            comfort, and professionalism. With over 8 years of experience serving corporate clients, we&apos;ve perfected the art of seamless
            employee transportation.
          </p>
          <p className="text-[1.1rem] leading-[1.6] text-[#6B7280]">
            Our fleet of modern vehicles and team of professional drivers ensure that your employees arrive safely, comfortably, and on time, every
            time.
          </p>

          <ul className="m-0 flex list-none flex-col gap-[0.9rem] p-0">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-[1.2rem] font-medium text-gray-800">
                <BadgeCheck
                  size={24}
                  color="#ffffff"
                  fill="#FBBF24"
                  strokeWidth={2}
                  className="shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href="/#contact" className="self-start rounded-xl border-2 border-[rgba(255,210,63,1)] bg-transparent px-8 py-[0.9rem] text-base font-bold text-[rgba(45,49,66,1)] transition-all duration-200 ease-out hover:bg-[rgba(255,210,63,0.2)]">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
