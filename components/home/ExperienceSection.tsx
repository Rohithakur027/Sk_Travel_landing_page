import Image from 'next/image';
import { ArrowRight, Clock, Star } from 'lucide-react';

const mediaCardClassName =
  'group relative flex h-full min-h-[24rem] w-full flex-col justify-end overflow-hidden rounded-3xl bg-gray-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] md:min-h-[20rem] lg:min-h-0';
const mediaImageClassName = 'object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]';
const mediaOverlayClassName =
  'pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.85)_100%)]';
const contentWrapperClassName = 'relative z-10 p-8 text-white lg:p-5 2xl:p-7';
const headingClassName = 'mb-2 font-sans text-[1.75rem] font-bold lg:text-[1.35rem] 2xl:text-[1.75rem]';
const textClassName = 'max-w-[90%] text-[1.2rem] leading-[1.5] text-gray-300 lg:text-[0.85rem] lg:leading-[1.3] 2xl:text-base 2xl:leading-[1.4]';

export default function ExperienceSection() {
  return (
    <section id="experience" className="-mt-32 bg-white px-0 pb-10 pt-8 md:mt-0 md:py-24">
      <div className="mx-auto w-full px-6 md:px-8 lg:px-12 2xl:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-[2.25rem] font-bold text-gray-900 md:text-5xl">
            Experience Premium Corporate Transportation
          </h2>
          <p className="mx-auto max-w-[42rem] text-[1.25rem] leading-[1.5] text-gray-500">
            Discover why leading companies trust SK Voyage for their transportation needs
          </p>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-[1fr_1fr_1.25fr_1.25fr] lg:grid-rows-[12rem_12rem_6rem_17rem] 2xl:grid-rows-[14rem_14rem_7rem_21rem] 2xl:gap-8">
          <div className="order-1 md:col-span-2 lg:[grid-column:1/3] lg:[grid-row:1/4]">
            <div className={mediaCardClassName}>
              <Image src="/images/premiumcomforts.jpeg" alt="Premium Comfort" fill className={mediaImageClassName} />
              <div className={mediaOverlayClassName} />
              <div className={contentWrapperClassName}>
                <h3 className={headingClassName}>Premium Comfort</h3>
                <p className={textClassName}>
                  Experience luxury travel with our fleet of premium vehicles featuring leather interiors and modern amenities
                </p>
              </div>
            </div>
          </div>

          <div className="order-2 lg:[grid-column:3/4] lg:[grid-row:1/2]">
            <div className={mediaCardClassName}>
              <Image src="/images/premdriver.png" alt="Expert Drivers" fill className={mediaImageClassName} />
              <div className={mediaOverlayClassName} />
              <div className={contentWrapperClassName}>
                <h3 className={headingClassName}>Expert Drivers</h3>
                <p className={textClassName}>Professionally trained chauffeurs</p>
              </div>
            </div>
          </div>

          <div className="order-3 lg:[grid-column:4/5] lg:[grid-row:1/2]">
            <div className={mediaCardClassName}>
              <Image src="/images/airpot.jpeg" alt="Airport Transfers" fill className={mediaImageClassName} />
              <div className={mediaOverlayClassName} />
              <div className={contentWrapperClassName}>
                <h3 className={headingClassName}>Airport Transfers</h3>
                <p className={textClassName}>24/7 pickup &amp; drop service</p>
              </div>
            </div>
          </div>

          <div className="order-4 lg:[grid-column:3/4] lg:[grid-row:2/3]">
            <div className={mediaCardClassName}>
              <Image src="/images/arsfl.jpeg" alt="Premium Fleet" fill className={mediaImageClassName} />
              <div className={mediaOverlayClassName} />
              <div className={contentWrapperClassName}>
                <h3 className={headingClassName}>Premium Fleet</h3>
                <p className={textClassName}>Latest models &amp; luxury brands</p>
              </div>
            </div>
          </div>

          <div className="order-5 lg:[grid-column:4/5] lg:[grid-row:2/4]">
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl bg-gray-800 p-8 text-center text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] md:min-h-[20rem] lg:min-h-0 lg:p-5 2xl:p-7">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-[1.3rem] border-[1.5px] border-[rgba(255,210,63,0.7)] bg-[linear-gradient(135deg,rgba(255,210,63,0.15)_0%,rgba(255,210,63,0.08)_100%)] text-[rgba(255,210,63,1)] lg:mb-2 lg:h-12 lg:w-12 2xl:mb-3 2xl:h-16 2xl:w-16">
                <Image src="/icons/SecurityIcon.svg" alt="Security" width={40} height={40} />
              </div>
              <h3 className="mb-2 font-sans text-[1.75rem] font-bold lg:text-[1.35rem] 2xl:text-[1.75rem]">Fully Insured</h3>
              <p className="text-[1.2rem] text-amber-200 lg:text-[0.85rem] lg:leading-[1.3] 2xl:text-base">Complete protection for peace of mind</p>
            </div>
          </div>

          <div className="order-6 lg:[grid-column:3/4] lg:[grid-row:3/5]">
            <div className={mediaCardClassName}>
              <Image src="/images/25+citie.jpeg" alt="25+ Cities" fill className={mediaImageClassName} />
              <div className={mediaOverlayClassName} />
              <div className={contentWrapperClassName}>
                <h3 className={headingClassName}>25+ Cities</h3>
                <p className={textClassName}>Nationwide coverage</p>
              </div>
            </div>
          </div>

          <div className="order-7 lg:[grid-column:1/2] lg:[grid-row:4/5]">
            <div className="flex h-full min-h-[24rem] flex-col justify-evenly rounded-3xl bg-[linear-gradient(135deg,#FFD23F_0%,#FFA726_100%)] p-8 text-center text-[#111827] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] md:min-h-[20rem] lg:min-h-0 lg:p-5 2xl:p-7">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="mr-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(45,49,66,0.15)] text-amber-400 lg:mr-3 lg:h-9 lg:w-9 2xl:mr-5 2xl:h-12 2xl:w-12">
                  <Star fill="rgba(45,49,66,1)" size={32} />
                </div>
                <span className="font-sans text-[2.75rem] font-black leading-none lg:text-[2rem] 2xl:text-[2.75rem]">4.9/5</span>
              </div>
              <div>
                <h4 className="mb-2 font-sans text-[2rem] font-bold lg:mb-1 lg:text-[1.2rem] 2xl:text-2xl">Customer Satisfaction</h4>
                <p className="text-base text-gray-700 lg:text-[0.8rem] lg:leading-[1.3] 2xl:text-[0.9rem]">
                  Based on 10,000+ verified reviews from our corporate clients
                </p>
              </div>
            </div>
          </div>

          <div className="order-8 lg:[grid-column:2/3] lg:[grid-row:4/5]">
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl bg-[linear-gradient(180deg,#2D3142_0%,#1A1D28_100%)] p-8 text-center text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] md:min-h-[20rem] lg:min-h-0 lg:p-5 2xl:p-7">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-amber-400 bg-[linear-gradient(135deg,rgba(255,210,63,0.2)_0%,rgba(255,210,63,0.1)_100%)] text-amber-400 lg:mb-3 lg:h-10 lg:w-10 2xl:mb-4 2xl:h-12 2xl:w-12">
                <Clock size={28} />
              </div>
              <h3 className="mb-2 font-sans text-[2.5rem] font-black lg:text-[1.5rem] 2xl:text-[2rem]">24/7</h3>
              <h4 className="mb-2 font-sans text-[1.5rem] font-bold lg:text-[1.1rem] 2xl:text-[1.35rem]">Always Available</h4>
              <p className="text-[1.1rem] text-gray-400 lg:text-[0.85rem] lg:leading-[1.3] 2xl:text-base">Round-the-clock service for all your transportation needs</p>
            </div>
          </div>

          <div className="order-9 lg:[grid-column:4/5] lg:[grid-row:4/5]">
            <div className={mediaCardClassName}>
              <Image src="/images/builtforteam.png" alt="Built for Teams" fill className={mediaImageClassName} />
              <div className={mediaOverlayClassName} />
              <div className={contentWrapperClassName}>
                <h3 className={headingClassName}>Built for Teams</h3>
                <p className={textClassName}>
                  Seamless group transportation for corporate events and daily commutes
                </p>
                <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[rgba(255,210,63,1)] px-5 py-2.5 font-bold text-[#111827] transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[rgba(255,190,40,1)]">
                  Learn More <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
