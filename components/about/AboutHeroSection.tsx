export default function AboutHeroSection() {
  return (
    <section className="bg-[rgba(45,49,66,1)] px-6 pb-16 pt-[var(--page-top-padding)] text-center md:pb-24">
      <div className="mx-auto flex max-w-[48rem] flex-col items-center pt-6 md:pt-12">
        <div className="mb-8 inline-block rounded-full border border-[rgba(255,210,63,0.3)] bg-[linear-gradient(168.37deg,rgba(255,210,63,0.15)_6.78%,rgba(255,210,63,0.08)_93.22%)] px-6 py-2 text-sm font-bold text-white">
          About SK Voyage
        </div>
        <h1 className="mb-6 font-heading text-[2.7rem] font-black leading-[1.2] tracking-[-0.02em] text-white md:text-[4.5rem] md:leading-[1.1]">
          Redefining Corporate
          <br />
          <span className="inline-block bg-[linear-gradient(171.05deg,#FFD23F_5.73%,#FFA726_94.27%)] bg-clip-text text-transparent">
            Transportation
          </span>
        </h1>
        <p className="text-base leading-[1.5] text-white/50 md:text-[1.25rem] md:leading-[1.6]">
          Committed to providing safe, reliable, and comfortable transportation
          <br className="hidden md:block" />
          solutions for businesses across India
        </p>
      </div>
    </section>
  );
}
