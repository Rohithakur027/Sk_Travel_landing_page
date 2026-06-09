import { CheckCircle2, Clock, Eye, Globe, Lightbulb, Star } from 'lucide-react';

const CORE_VALUES = [
  {
    title: 'Safety First',
    description: 'Every journey prioritizes passenger safety with verified drivers and well-maintained vehicles',
    Icon: CheckCircle2,
  },
  {
    title: 'Reliability',
    description: 'Punctual service you can count on, ensuring employees reach work on time, every time',
    Icon: Clock,
  },
  {
    title: 'Excellence',
    description: 'Committed to delivering exceptional service quality that exceeds expectations',
    Icon: Star,
  },
  {
    title: 'Transparency',
    description: 'Clear communication and honest pricing with no hidden charges or surprises',
    Icon: Eye,
  },
  {
    title: 'Innovation',
    description: 'Continuously improving our services with the latest technology and best practices',
    Icon: Lightbulb,
  },
  {
    title: 'Sustainability',
    description: 'Working towards eco-friendly solutions and reducing our environmental impact',
    Icon: Globe,
  },
];

export default function CoreValuesSection() {
  return (
    <section className="bg-white py-16 text-center">
      <div className="mx-auto w-full max-w-[1800px] px-6 lg:max-w-[1400px] lg:px-16 2xl:px-32">
        <div className="mx-auto mb-12 max-w-[48rem] md:mb-16">
          <h2 className="mb-4 font-heading text-[2.25rem] font-extrabold text-[#1F2937] md:text-[3rem]">
            Our Core Values
          </h2>
          <p className="text-[1.125rem] leading-[1.6] text-[#6B7280]">
            The principles that guide everything we do
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-6 min-[500px]:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {CORE_VALUES.map((value) => {
            const IconComponent = value.Icon;

            return (
              <div
                key={value.title}
                className="rounded-3xl bg-white px-5 py-6 text-left shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:px-7 sm:py-8 lg:px-14 lg:py-16 max-[500px]:rounded-[1.25rem]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(255,245,206)] text-[#FBBF24] sm:h-14 sm:w-14 sm:mb-5 lg:mb-6 lg:h-16 lg:w-16">
                  <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-heading text-[1.15rem] font-extrabold text-[#1F2937] sm:text-[1.25rem] lg:text-[1.75rem]">
                  {value.title}
                </h3>
                <p className="text-left text-[0.875rem] leading-[1.5] text-[#6B7280] sm:text-base lg:text-[1.25rem] lg:leading-[1.7]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
