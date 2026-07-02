import Image from "next/image";
import Link from "next/link";
import Pill from '@/components/ui/Pill';
import {
  CreditCard,
  Headphones,
  MapPin,
  Radio,
  Settings,
  ShieldCheck,
} from "lucide-react";

const MAIN_SERVICES = [
  {
    title: "Airport Transfers",
    description:
      "Never miss a flight again. Our airport transfer service provides punctual, stress-free transportation with real-time flight tracking.",
    iconSrc: "/Container (4).png",
    image: "/images/airpot.jpeg",
    imagePosition: "center",
    features: [
      "Flight tracking",
      "Meet & greet service",
      "24/7 availability",
      "Luggage assistance",
    ],
  },
  {
    title: "Executive Transportation",
    description:
      "Premium transportation for executives and VIP clients. Enjoy a first-class experience with our luxury fleet and highly trained chauffeurs.",
    iconSrc: "/Container (6).png",
    image: "/images/safetyprior.png",
    imagePosition: "center",
    features: [
      "Luxury fleet vehicles",
      "Certified chauffeurs",
      "Priority scheduling",
      "Amenity packages",
    ],
  },
  {
    title: "Corporate Shuttle Service",
    description:
      "Provide your employees with a reliable and comfortable daily commute. Our shuttle services are designed to maximize productivity and employee satisfaction.",
    iconSrc: "/Container (5).png",
    image: "/images/corporateshuttlefinal.png",
    imagePosition: "right center",
    features: [
      "Fixed route scheduling",
      "GPS tracked vehicles",
      "Professional drivers",
      "Employee app access",
    ],
  },
  {
    title: "Event Transportation",
    description:
      "Seamless group transportation for conferences, corporate events, and special occasions. We coordinate every detail to ensure your event runs smoothly.",
    iconSrc: "/Container (8).png",
    image: "/images/premiumfleet.jpeg",
    imagePosition: "center",
    features: [
      "Group capacity planning",
      "Event day coordination",
      "Multiple pick-up points",
      "Flexible scheduling",
    ],
  },
];

const ADDITIONAL_SERVICES = [
  {
    icon: <MapPin size={22} />,
    title: "Route Optimization",
    description: "AI-powered routing to minimize travel time and operational costs for your fleet.",
  },
  {
    icon: <Radio size={22} />,
    title: "Real Time Tracking",
    description: "Live GPS monitoring gives you full visibility over every vehicle in your fleet.",
  },
  {
    icon: <Settings size={22} />,
    title: "Customized Solutions",
    description: "Tailored transportation programs built around your unique business requirements.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Safety Protocols",
    description: "Rigorous driver vetting, vehicle inspections, and compliance reporting.",
  },
  {
    icon: <CreditCard size={22} />,
    title: "Flexible Billing",
    description: "Consolidated monthly invoicing, cost centers, and custom billing structures.",
  },
  {
    icon: <Headphones size={22} />,
    title: "24/7 Support",
    description: "Round-the-clock customer support to handle any transportation need or issue.",
  },
];

const containerClassName = "mx-auto w-full max-w-[1200px] px-8 max-md:px-6";

export default function ServicesSection() {
  return (
    <>
      <section id="services" className="bg-white">
        <div className="bg-[rgba(45,49,66,1)] px-6 pb-16 pt-[var(--navbar-height)] text-center md:pb-16">
          <div className="mx-auto flex max-w-[48rem] flex-col items-center gap-6">
            <Pill>Our Services</Pill>
            <h1 className="m-0 whitespace-normal font-heading text-[2.7rem] font-black leading-[1.2] tracking-[-0.02em] text-white md:text-[4.5rem] md:leading-[1.1]">
              Comprehensive
              <br />
              <span className="inline-block bg-[linear-gradient(171.05deg,#FFD23F_5.73%,#FFA726_94.27%)] bg-clip-text text-transparent">
                Transportation Solutions
              </span>
            </h1>
            <p className="max-w-[36rem] text-sm leading-[1.5] text-white/50 md:text-[1.1rem] md:leading-[1.6]">
              Tailored services designed to meet all your corporate transportation needs
            </p>
          </div>
        </div>

        <div className={containerClassName}>
          <div className="mx-auto mt-16 grid max-w-[1200px] grid-cols-1 gap-8 pb-[4.5rem] min-[700px]:grid-cols-2">
            {MAIN_SERVICES.map((service) => (
              <div
                key={service.title}
                className="flex flex-col overflow-hidden rounded-[32px] border-t border-t-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out hover:-translate-y-[5px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
              >
                <div className="relative h-[280px] w-full overflow-hidden rounded-t-[32px] lg:h-[320px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectPosition: service.imagePosition ?? "center" }}
                  />
                </div>

                <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
                  <div className="mb-3 flex items-center gap-5">
                    <div className="hidden h-14 w-14 shrink-0 overflow-hidden rounded-[14px] min-[601px]:flex">
                      <Image
                        src={service.iconSrc}
                        alt={service.title}
                        width={56}
                        height={56}
                        className="block h-full w-full bg-transparent object-cover"
                      />
                    </div>
                    <h3 className="m-0 text-[1.2rem] font-bold leading-[1.3] text-[#111827]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mb-[1.1rem] text-[0.92rem] leading-[1.65] text-[#6b7280]">
                    {service.description}
                  </p>

                  <ul className="mb-6 flex list-none flex-col gap-3 p-0">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-baseline gap-[0.55rem] text-[0.9rem] text-[#374151]">
                        <span className="inline-flex h-[1.2rem] w-[1.2rem] shrink-0 items-center justify-center rounded-full bg-[#fef3c7] text-[0.7rem] font-bold text-[#d97706]">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact#booking"
                    className="mt-auto inline-flex h-[46.5px] w-[146.03px] items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#FFD23F_0%,#FFA726_100%)] text-[0.92rem] font-bold text-[#1a1a1a] shadow-[0_8px_24px_rgba(255,210,63,0.4)] transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,210,63,0.55)]"
                  >
                    Enquire Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFFBF0]">
          <div className={containerClassName}>
            <div className="px-0 pb-0 pt-14 text-center">
              <h3 className="mb-[0.6rem] text-[1.75rem] font-extrabold text-[#111827]">
                Additional Services
              </h3>
              <p className="mb-10 text-[0.95rem] text-[#6b7280]">
                Extra features to enhance your transportation experience
              </p>

              <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
                {ADDITIONAL_SERVICES.map((service) => (
                  <div
                    key={service.title}
                    className="flex flex-col items-start rounded-2xl bg-white px-6 py-7 transition-transform duration-200 ease-out hover:-translate-y-0.5"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#fef3c7] text-[#d97706]">
                      {service.icon}
                    </div>
                    <h4 className="mb-2 text-base font-bold text-[#111827]">
                      {service.title}
                    </h4>
                    <p className="m-0 text-[0.875rem] leading-[1.6] text-[#6b7280]">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="flex min-h-0 items-center justify-center bg-white px-8 py-12 max-md:px-4">
        <div className="mx-auto w-full max-w-[920px] rounded-[20px] border border-black/5 bg-white px-7 py-8 text-center shadow-[0_18px_48px_rgba(0,0,0,0.06)]">
          <h3 className="mb-3 text-[1.7rem] font-extrabold text-[#111827]">
            Ready to Get Started?
          </h3>
          <p className="mx-auto mb-4 max-w-[40rem] text-[0.97rem] leading-[1.6] text-[#6b7280]">
            Contact us today to discuss your corporate transportation needs and get a customized quote
          </p>
          <Link
            href="/contact#booking"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#FFD23F_0%,#FFA726_100%)] px-10 py-3 text-base font-bold text-[#1a1a1a] shadow-[0_8px_24px_rgba(255,210,63,0.4)] transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,210,63,0.55)]"
          >
            Send an Enquiry →
          </Link>
        </div>
      </section>
    </>
  );
}
