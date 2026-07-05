'use client';

import BookingForm from './BookingForm';

export default function HeroSection() {
  return (
    <section id="hero" className="relative isolate mb-0 w-full overflow-hidden bg-black py-0 lg:mb-[24rem] lg:min-h-[800px] lg:overflow-visible">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-95 animate-zoom-out max-md:bg-[center_top]"
        style={{ backgroundImage: 'url(/images/herosection_enhanced.png)' }}
      />

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-[250px] bg-[linear-gradient(to_bottom,rgba(10,11,13,0.8)_0%,rgba(10,11,13,0.45)_50%,transparent_100%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] hidden h-[480px] bg-[linear-gradient(to_top,rgba(10,11,13,1)_0%,rgba(10,11,13,0.75)_35%,rgba(10,11,13,0.25)_70%,transparent_100%)] lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-[45%] z-[1] h-[420px] w-[900px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,rgba(253,211,77,0.03)_50%,transparent_80%)] blur-[80px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-col items-center justify-center px-6 pb-16 pt-[calc(var(--page-top-padding)+2.25rem)] text-center sm:pb-20 lg:pb-[20rem] lg:pt-[calc(var(--page-top-padding)+3rem)]">
        <div className="relative mb-8 inline-flex translate-y-5 items-center gap-2 rounded-full border-[1.5px] border-[rgba(255,210,63,0.3)] bg-[linear-gradient(135deg,rgba(255,210,63,0.15)_0%,rgba(255,210,63,0.08)_100%)] px-6 py-3 text-sm font-extrabold text-white opacity-0 backdrop-blur-[12px] animate-[fade-in-up_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] md:mb-12 md:px-8 md:py-4 md:text-base">
          <span className="pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-[rgba(255,210,63,0.4)] opacity-0 animate-badge-pulse" />
          <svg className="h-[1.1rem] w-[1.1rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
          </svg>
          Loved by 500+ users
        </div>

        <h1 className="mx-auto mb-4 w-full max-w-[1300px] translate-y-[30px] px-4 font-heading text-[1.85rem] font-bold leading-[1.3] tracking-[-0.5px] text-white opacity-0 [text-shadow:0_4px_24px_rgba(0,0,0,0.45)] animate-[fade-in-up_1s_cubic-bezier(0.16,1,0.3,1)_0.15s_forwards] sm:text-[2.25rem] sm:leading-[1.2] sm:tracking-[-1px] lg:mb-10 lg:px-0 lg:text-[3rem] lg:leading-[1.2] lg:tracking-[-1.5px] xl:text-[6.2rem] xl:leading-[1.1] xl:tracking-[-3.5px]">
          Your Trusted Partner for{' '}
          <span className="inline-block bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-lighter)_100%)] bg-clip-text text-transparent">
            Every Journey
          </span>
        </h1>

        <p className="mx-auto max-w-[42rem] translate-y-5 text-lg font-normal leading-[1.6] text-[rgb(243,243,243)] opacity-0 [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] animate-[fade-in-up_1.2s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards] md:text-[1.7rem] md:leading-[34px]">
          Embrace the Beauty of the Great Outdoors
        </p>
      </div>

      <div
        className="absolute bottom-56 left-1/2 z-[15] hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[2.5px] text-white/65 opacity-0 transition-all duration-300 ease-out animate-[float_2.5s_ease-in-out_infinite,fade-in_1.5s_ease-in_0.6s_forwards] hover:-translate-y-1 hover:text-[var(--color-primary)] lg:flex"
        onClick={() => {
          const nextSec = document.getElementById('hero')?.nextElementSibling;
          if (nextSec) {
            nextSec.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="font-heading">Discover More</span>
        <svg className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-out hover:translate-y-[2px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative z-[2] bg-white px-4 pb-14 pt-8 sm:pb-16 sm:pt-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:z-20 lg:translate-y-[65%] lg:bg-transparent lg:px-6 lg:py-0">
        <BookingForm />
      </div>
    </section>
  );
}
