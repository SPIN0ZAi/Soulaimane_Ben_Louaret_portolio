import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/JourneySection';
import AchievementsSection from '@/components/AchievementsSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import CtaBanner from '@/components/CtaBanner';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AdminFloatingTrigger from '@/components/AdminFloatingTrigger';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#f4f4f6] flex flex-col selection:bg-[#FF0000]/30 selection:text-[#FF0000] font-sans antialiased overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Navigation />

      {/* Main Flow Inspired by Stygar */}
      <main className="flex-1 bg-black">
        {/* 2. Hero Section: Headline with red crop box + 3D character + metrics */}
        <HeroSection />

        {/* 3. My Projects ::: Featured Works & Archive */}
        <ProjectsSection />

        {/* 4. My Journey ::: Continuous scroll-driven animated path */}
        <JourneySection />

        {/* 5. My Achievements ::: Stylized Year Graphic + Technical Crop List */}
        <AchievementsSection />

        {/* 6. Education & Academic Record at UCLM */}
        <EducationSection />

        {/* 7. Technical Capabilities & Core Stack */}
        <SkillsSection />

        {/* 8. Call to Action Banner with 3D Character */}
        <CtaBanner />

        {/* 9. Let's Talk About Your Idea ::: Contact & Form */}
        <ContactSection />
      </main>

      {/* 10. Minimalist Dashed-Divider Footer */}
      <Footer />

      {/* 11. Discreet Floating Admin Access Button */}
      <AdminFloatingTrigger />
    </div>
  );
}
