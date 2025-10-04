import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingCode from '@/components/FloatingCode';

export default function Home() {
  useEffect(() => {
    // Use dark cyberpunk theme
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Global Floating Elements */}
      <FloatingCode />
      
      <Navigation />
      
      {/* Main Content with Cyberpunk Layout */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <HeroSection />
        </section>

        {/* Cyberpunk Divider */}
        <div className="relative h-20 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full text-primary/20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L50,60 L100,20 L200,80 L400,30 L600,70 L800,10 L1000,50 L1200,0 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* About Section with Cyberpunk Design */}
        <section id="about" className="relative py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-accent/5" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
            }} />
          </div>
          <div className="relative">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-extra-wide text-foreground mb-6 text-glow-cyan">
                  System_Info
                </h2>
                <div className="w-32 h-1 bg-accent mx-auto rounded-full glow-green" />
              </div>
              <AboutSection />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-extra-wide text-foreground mb-6 text-glow-magenta">
                Repository_List
              </h2>
              <div className="w-32 h-1 bg-primary mx-auto rounded-full glow-magenta" />
            </div>
            <ProjectsSection />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="relative py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-secondary/3" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 0, 0.02) 20px, rgba(255, 255, 0, 0.02) 40px)'
            }} />
          </div>
          <div className="relative">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-extra-wide text-foreground mb-6 text-glow-green">
                  Experience_Log
                </h2>
                <div className="w-32 h-1 bg-accent mx-auto rounded-full glow-green" />
              </div>
              <ExperienceSection />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-24 bg-gradient-to-br from-muted/10 to-background">
          <div className="absolute inset-0">
            <svg
              className="absolute top-0 left-0 w-full h-full text-primary/8"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 C30,80 70,20 100,0 L100,100 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="relative">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-extra-wide text-foreground mb-6 text-glow-cyan">
                  Connect_Network
                </h2>
                <div className="w-32 h-1 bg-accent mx-auto rounded-full glow-cyan" />
              </div>
              <ContactSection />
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
