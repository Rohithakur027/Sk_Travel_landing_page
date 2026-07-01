import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const cardClassName =
  'group relative flex h-full min-h-[20rem] w-full flex-col justify-end overflow-hidden rounded-3xl bg-gray-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] md:min-h-0';
const imageClassName = 'object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105';

export default function FleetSection() {
  return (
    <section id="fleet" className="bg-white pb-16 pt-4">
      <div className="mx-auto w-full px-6 md:px-8 lg:px-12 2xl:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-[2.25rem] font-bold text-[#2D3142] md:text-5xl">
            Our Premium Fleet
          </h2>
          <p className="mx-auto max-w-[42rem] text-[1.25rem] leading-[1.5] text-gray-500">
            Choose from our diverse range of luxury vehicles tailored for every corporate need
          </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:auto-rows-[18rem] md:gap-8 lg:auto-rows-[22rem] lg:gap-12 2xl:auto-rows-[26rem] 2xl:gap-16">
          <div className={cardClassName}>
            <Image src="/images/luxurysuv.jpeg" alt="Luxury SUVs" fill className={imageClassName} />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
            <div className="relative z-10 p-10 text-white">
              <h3 className="mb-2 text-[1.75rem] font-extrabold tracking-[-0.02em] lg:text-[1.8rem] 2xl:text-[2.2rem]">Luxury SUVs</h3>
              <p className="text-base leading-[1.5] text-gray-200">Spacious rides for 1-6 passengers</p>
            </div>
          </div>

          <div className={cardClassName}>
            <Image
              src="/images/corporateshuttlefinal.png"
              alt="Corporate Shuttles"
              fill
              className={imageClassName}
              style={{ objectPosition: 'right center' }}
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
            <div className="relative z-10 p-10 text-white">
              <h3 className="mb-2 text-[1.75rem] font-extrabold tracking-[-0.02em] lg:text-[1.8rem] 2xl:text-[2.2rem]">Corporate Shuttles</h3>
              <p className="text-base leading-[1.5] text-gray-200">Group transportation solutions</p>
            </div>
          </div>

          <div className={cardClassName}>
            <Image src="/images/experienced_driversfinal.jpeg" alt="Experienced Drivers" fill className={imageClassName} />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
            <div className="relative z-10 p-10 text-white">
              <h3 className="mb-2 text-[1.75rem] font-extrabold tracking-[-0.02em] lg:text-[1.8rem] 2xl:text-[2.2rem]">Experienced Drivers</h3>
              <p className="text-base leading-[1.5] text-gray-200">Professional and experienced drivers</p>
            </div>
          </div>

          <div className={cardClassName}>
            <Image src="/images/executivesedan.png" alt="Executive Sedans" fill className={imageClassName} priority />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
            <div className="relative z-10 p-10 text-white">
              <span className="mb-3 inline-block text-base font-extrabold uppercase tracking-[0.1em] text-amber-400">Featured</span>
              <h3 className="mb-2 text-[1.75rem] font-extrabold tracking-[-0.02em] lg:text-[1.8rem] 2xl:text-[2.2rem]">Executive Sedans</h3>
              <p className="text-base leading-[1.5] text-gray-200">Premium comfort for 1-4 passengers</p>
              <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[rgba(255,210,63,1)] px-6 py-3 text-base font-bold text-[#111827] transition-colors duration-200 hover:bg-amber-500">
                View Details <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
