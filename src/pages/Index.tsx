import SpaceBackground from '@/components/SpaceBackground';
import { LightLines } from '@/components/ui/light-lines';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechStackSlider from '@/components/TechStackSlider';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import CertificatesSection from '@/components/CertificatesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

const Index = () => {
  useScrollReveal();

  return (
    <>
      {/* Layer 1: 3D Three.js Space (stars, nebulae, shooting stars) */}
      <SpaceBackground />

      {/* Layer 2: Animated vertical light lines overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <LightLines
          gradientFrom="transparent"
          gradientTo="transparent"
          lightColor="#00ffe7"
          lineColor="#00ffe7"
          linesOpacity={0.03}
          lightsOpacity={0.7}
          speedMultiplier={0.6}
        />
      </div>

      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <TechStackSlider />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <CertificatesSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
