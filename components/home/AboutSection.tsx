import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-[#111827] py-24 text-white">
      <div className="absolute right-0 top-0 -z-[1] h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-[rgba(245,158,11,0.10)] blur-[120px]" />

      <div className="mx-auto w-full max-w-[1480px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative h-[300px] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_64px_rgba(0,0,0,0.24)] md:h-[400px] lg:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200"
              alt="Professional chauffeur holding door"
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-[36rem]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-amber-400 backdrop-blur-[12px]">
              About SK Travel
            </div>
            <h2 className="mb-6 font-heading text-[2.5rem] font-extrabold leading-[1.2] text-white md:text-[3rem]">
              Redefining the standard of travel.
            </h2>
            <p className="mb-6 text-[1.125rem] leading-[1.75] text-gray-300">
              Founded with a passion for safe and comfortable travel, SK Travel
              has grown to become one of the most trusted premium cab services.
              We combine cutting-edge technology with traditional hospitality to ensure every journey exceeds your expectations.
            </p>
            <p className="mb-6 text-[1.125rem] leading-[1.75] text-gray-300">
              Our fleet is meticulously maintained and our drivers are professionally
              trained, background-verified, and committed to your safety and comfort.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary btn-lg">
                Get in Touch
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-[1.125rem] font-semibold text-white transition-colors duration-200 hover:bg-white/20"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
