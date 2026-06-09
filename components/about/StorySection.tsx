import Image from 'next/image';
import Pill from '@/components/ui/Pill';

export default function StorySection() {
  return (
    <section className="bg-white pb-16 pt-8 lg:pb-24 lg:pt-12">
      <div className="mx-auto w-full max-w-[1800px] px-6 lg:max-w-[1200px] lg:px-16 2xl:px-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 2xl:gap-24">
          <div className="relative w-full">
            <div className="relative h-[400px] w-full overflow-hidden rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] lg:h-[720px]">
              <Image
                src="/images/aboutstory.jpeg"
                alt="Story Image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Pill variant="dark" className="mb-8">Our Story</Pill>
            <h2 className="mb-8 font-heading text-[2.25rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#2D303E] lg:text-[3.5rem]">
              Building Trust Through Excellence
            </h2>

            <div className="flex flex-col gap-6">
              <p className="text-base leading-[1.7] text-[#6B7280] lg:text-[1.15rem]">
                Founded in 2015, SK Voyages emerged from a simple vision: to transform corporate employee transportation in India. We recognized that businesses needed a reliable, professional, and scalable solution for their daily commute challenges.
              </p>
              <p className="text-base leading-[1.7] text-[#6B7280] lg:text-[1.15rem]">
                Over the years, we&apos;ve grown from a small fleet serving local businesses to a comprehensive transportation partner for enterprises across major Indian cities. Our commitment to safety, punctuality, and customer satisfaction has made us the preferred choice for over 500+ companies.
              </p>
              <p className="text-base leading-[1.7] text-[#6B7280] lg:text-[1.15rem]">
                Today, SK Voyages operates with a fleet of modern, well-maintained vehicles driven by thoroughly verified and professionally trained drivers, ensuring every journey is safe and comfortable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
