import AboutHeroSection from '@/components/about/AboutHeroSection';
import StorySection from '@/components/about/StorySection';
import VisionSection from '@/components/about/VisionSection';
import CoreValuesSection from '@/components/about/CoreValuesSection';
// import AboutStatsSection from '@/components/about/AboutStatsSection';
import TeamSection from '@/components/about/TeamSection';

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <StorySection />
      <VisionSection />
      <CoreValuesSection />
      {/* <AboutStatsSection /> */}
      <TeamSection />
    </>
  );
}
