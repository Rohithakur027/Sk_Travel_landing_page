import Image from 'next/image';

const SERVICES = [
  {
    title: 'Airport Transfers',
    description:
      'Reliable pickup and drop-off services for all major airports. Track flights in real-time and meet your team on schedule.',
    image: '/images/airpot.jpeg',
    imagePosition: 'center',
    badge: 'Popular',
  },
  {
    title: 'Corporate Shuttles',
    description:
      'Daily commute solutions for your employees with scheduled routes, dedicated vehicles, and professional drivers.',
    image: '/images/corporatesuttlenew.jpeg',
    imagePosition: 'right center',
    badge: 'Best Value',
  },
  {
    title: 'Event Transportation',
    description:
      'Premium transportation for corporate events, conferences, and special occasions with flexible group booking options.',
    image: '/images/premiumfleet.jpeg',
    imagePosition: 'center',
    badge: 'Premium',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[rgb(253,252,248)] py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-8 2xl:px-16">
        <div className="mb-14 text-center">
          <span className="mb-8 inline-block rounded-full border border-[#fde68a] bg-[#fff9e6] px-6 py-2 text-sm font-bold text-gray-800">
            Our Services
          </span>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.35] text-gray-900">
            Transportation Solutions
            <br />
            Tailored for Business
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-base leading-[1.75] text-gray-500">
            From daily commutes to special events, we provide comprehensive transportation services for modern businesses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-10 2xl:gap-20">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group overflow-hidden rounded-3xl border border-[var(--color-gray-100)] bg-white shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
            >
              <div className="relative h-[240px] overflow-hidden rounded-t-3xl lg:h-[280px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: service.imagePosition }}
                />
                <span className="absolute right-[0.85rem] top-[0.85rem] z-[2] rounded-full bg-[rgba(255,210,63,1)] px-[0.85rem] py-[0.3rem] text-xs font-semibold tracking-[0.05em] text-[rgba(45,49,66,1)]">
                  {service.badge}
                </span>
              </div>

              <div className="p-8 lg:px-9 lg:pb-9">
                <h3 className="font-heading text-[1.875rem] font-bold text-gray-900">{service.title}</h3>
                <p className="mb-6 text-base leading-[1.75] text-gray-500 lg:text-[1.125rem]">{service.description}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-base font-semibold text-amber-500 transition-all duration-150 ease-out hover:gap-[0.65rem] hover:text-[var(--color-primary-dark)]"
                >
                  Learn More <span className="transition-transform duration-150 ease-out group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
