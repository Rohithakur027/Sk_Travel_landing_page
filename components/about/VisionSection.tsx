import { CheckCircle2, TrendingUp } from 'lucide-react';

const cardClassName =
  'rounded-3xl bg-white px-6 py-8 text-left shadow-[0_10px_40px_rgba(0,0,0,0.03)] md:flex md:items-start md:gap-14 md:px-16 md:py-14';
const iconWrapClassName =
  'mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[rgb(255,245,206)] text-[#FBBF24] md:mb-0 md:h-[4.5rem] md:w-[4.5rem]';

export default function VisionSection() {
  return (
    <section className="bg-[rgb(253,252,248)] py-16 text-center">
      <div className="mx-auto w-full max-w-[1800px] px-6 lg:max-w-[1200px] lg:px-16 2xl:px-32">
        <div className="mx-auto mb-12 max-w-[48rem] md:mb-16">
          <h2 className="mb-4 font-heading text-[2.25rem] font-extrabold text-[#1F2937] md:text-[3rem]">
            Our Mission &amp; Vision
          </h2>
          <p className="text-[1.125rem] leading-[1.6] text-[#6B7280]">
            Driving towards a future where corporate transportation is seamless, sustainable, and exceptional
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8">
          <div className={cardClassName}>
            <div className="md:w-[220px] md:flex-none">
              <div className={iconWrapClassName}>
                <CheckCircle2 className="h-7 w-7 md:h-9 md:w-9" strokeWidth={2} />
              </div>
              <h3 className="font-heading text-[1.5rem] font-extrabold text-[#1F2937] md:text-[2rem]">
                Our Mission
              </h3>
            </div>
            <p className="pt-1 text-base leading-[1.6] text-[#6B7280] md:flex-1 md:text-[1.3rem] md:leading-[1.7]">
              To provide world-class transportation services that prioritize safety, reliability, and customer satisfaction. We aim to be the most trusted partner for corporate transportation needs, ensuring every employee reaches their destination comfortably and on time.
            </p>
          </div>

          <div className={cardClassName}>
            <div className="md:w-[220px] md:flex-none">
              <div className={iconWrapClassName}>
                <TrendingUp className="h-7 w-7 md:h-9 md:w-9" strokeWidth={2} />
              </div>
              <h3 className="font-heading text-[1.5rem] font-extrabold text-[#1F2937] md:text-[2rem]">
                Our Vision
              </h3>
            </div>
            <p className="pt-1 text-base leading-[1.6] text-[#6B7280] md:flex-1 md:text-[1.3rem] md:leading-[1.7]">
              To revolutionize corporate mobility across India by integrating cutting-edge technology, sustainable practices, and exceptional service standards. We envision a future where employee transportation is seamless, eco-friendly, and contributes to a better work-life balance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
