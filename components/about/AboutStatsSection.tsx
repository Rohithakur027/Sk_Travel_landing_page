const STATS = [
  { value: '500K+', label: 'Happy Users' },
  { value: '1000+', label: 'Corporate Clients' },
  { value: '50+', label: 'Cities Covered' },
  { value: '99.8%', label: 'On-Time Rate' },
];

export default function AboutStatsSection() {
  return (
    <section className="bg-[#2D303E] py-20 text-center">
      <div className="mx-auto w-full max-w-[1800px] px-6 lg:max-w-[1200px] lg:px-16 2xl:px-32">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16 xl:grid-cols-4 xl:gap-12 2xl:gap-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center">
              <div className="mb-2 bg-[linear-gradient(171.05deg,#FFD23F_5.73%,#FFA726_94.27%)] bg-clip-text font-heading text-[3.1rem] font-black leading-none text-transparent md:text-[3.5rem] xl:text-[4rem] 2xl:text-[5rem]">
                {stat.value}
              </div>
              <div className="text-[1.25rem] font-medium text-[#D1D5DB]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
