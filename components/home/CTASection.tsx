export default function CTASection() {
  return (
    <section id="cta" className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1480px] px-6">
        <div className="relative isolate flex flex-col items-center overflow-hidden rounded-[2.5rem] border border-[#fde073] bg-[linear-gradient(135deg,#FFF9E6_0%,#FFFFFF_100%)] px-6 py-16 text-center shadow-[0_4px_6px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.08)] md:px-20 md:py-24">
          <div className="absolute right-[-8rem] top-[-8rem] -z-[1] h-96 w-96 rounded-full bg-[rgba(254,249,194,0.6)]" />
          <div className="absolute bottom-[-8rem] left-[-8rem] -z-[1] h-[28rem] w-[28rem] rounded-full bg-[rgba(254,249,194,0.6)]" />

          <div className="mb-8">
            <span className="inline-block rounded-full bg-[var(--color-primary-lighter)] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.05em] text-gray-900">
              START YOUR JOURNEY
            </span>
          </div>

          <h2 className="mb-6 max-w-[50rem] font-sans text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.2] text-gray-800">
            Ready to Transform Your
            <br />
            Corporate Transportation?
          </h2>
          <p className="mb-14 max-w-[44rem] text-[1.125rem] leading-[1.7] text-gray-500">
            Join hundreds of companies already using Sk Voyages for their employee
            <br className="hidden md:block" />
            transportation needs. Experience the difference today.
          </p>

          <div className="mb-0 flex flex-col gap-6 sm:flex-row md:mb-16">
            <button className="inline-flex items-center gap-4 rounded-full border-2 border-gray-300 bg-white px-8 py-3 text-left text-gray-900 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50 hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
              <svg viewBox="0 0 384 512" width="36" height="36" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="flex flex-col">
                <span className="mb-[0.1rem] text-xs font-medium text-gray-700">Download on the</span>
                <span className="font-heading text-2xl font-extrabold leading-[1.1] text-gray-900">App Store</span>
              </span>
            </button>

            <button className="inline-flex items-center gap-4 rounded-full border-2 border-gray-300 bg-white px-8 py-3 text-left text-gray-900 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50 hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
              <svg viewBox="0 0 512 512" width="36" height="36" fill="currentColor">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              <span className="flex flex-col">
                <span className="mb-[0.1rem] text-xs font-medium text-gray-700">GET IT ON</span>
                <span className="font-heading text-2xl font-extrabold leading-[1.1] text-gray-900">Google Play</span>
              </span>
            </button>
          </div>

          <div className="hidden w-full max-w-[48rem] flex-col items-center gap-8 md:flex md:flex-row md:justify-between md:gap-0">
            <div className="flex flex-1 flex-col items-center">
              <h3 className="mb-2 font-sans text-[2.25rem] font-bold text-gray-800">500+</h3>
              <p className="text-sm font-medium text-gray-500">Users</p>
            </div>
            <div className="hidden h-12 w-px bg-gray-200 md:block" />
            <div className="flex flex-1 flex-col items-center">
              <h3 className="mb-2 font-sans text-[2.25rem] font-bold text-gray-800">50K+</h3>
              <p className="text-sm font-medium text-gray-500">Completed Rides</p>
            </div>
            <div className="hidden h-12 w-px bg-gray-200 md:block" />
            <div className="flex flex-1 flex-col items-center">
              <h3 className="mb-2 font-sans text-[2.25rem] font-bold text-gray-800">4.9/5</h3>
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
