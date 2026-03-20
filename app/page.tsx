import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import FleetSection from '@/components/home/FleetSection';
import CorporateSection from '@/components/home/CorporateSection';
import ServicesSection from '@/components/home/ServicesSection';
import CTASection from '@/components/home/CTASection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div style={{ paddingBottom: '5rem' }}>
        <StatsSection />
        <ExperienceSection />
        <FleetSection />
        <CorporateSection />
        <ServicesSection />
        <CTASection />
        <ContactSection />
      </div>
    </>
  );
}
