import Image from 'next/image';
import { Star } from 'lucide-react';

const STATS = [
  {
    label: 'Corporate Clients',
    value: '500+',
    icon: (
      <Image
        src="/icons/tick.svg"
        alt="Tick"
        width={36}
        height={36}
      />
    ),
  },
  {
    label: 'Average Rating',
    value: '4.9/5',
    icon: <Star size={36} color="#FFD23F" fill="#FFD23F" strokeWidth={0} />,
  },
  {
    label: 'Completed Rides',
    value: '50K+',
    icon: (
      <Image
        src="/icons/car.svg"
        alt="Car"
        width={36}
        height={36}
      />
    ),
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className="bg-transparent px-0 pb-6 pt-80 md:pt-80">
      <div className="mx-auto w-full max-w-[1480px] px-6">
        <div className="mx-auto grid max-w-[64rem] grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-[1.25rem] border-2 border-[#ffe7a0] bg-[#fff9e6] shadow-[0_4px_14px_rgba(255,176,47,0.15)]">
                {stat.icon}
              </div>
              <h3 className="mb-2 font-sans text-[2.25rem] font-extrabold text-[#1a202c] md:text-[3rem]">
                {stat.value}
              </h3>
              <p className="text-[1.1rem] font-medium text-[#718096]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
