import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Modern Editorial Layout */}
      <main className="relative">
        {/* Hero Section with Bold Typography */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10" />
          <div className="relative">
            <HeroSection />
          </div>
        </section>

        {/* Organic Shape Divider */}
        <div className="relative h-16 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full text-secondary/20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C120,60 360,30 600,60 C840,90 1080,30 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* About Section with Modern Card Design */}
        <section className="relative py-20 bg-gradient-to-b from-secondary/10 to-background">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-accent/5" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(192, 183, 171, 0.1) 0%, transparent 50%)'
            }} />
          </div>
          <div className="relative">
            <AboutSection />
          </div>
        </section>

        {/* Projects Section with Enhanced Cards */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-extra-wide text-foreground mb-4">
                Selected Work
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <ProjectsSection />
          </div>
        </section>

        {/* Experience Section with Timeline Design */}
        <section className="relative py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-foreground/2" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(35, 35, 35, 0.02) 10px, rgba(35, 35, 35, 0.02) 20px)'
            }} />
          </div>
          <div className="relative">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-extra-wide text-foreground mb-4">
                  Experience
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
              </div>
              <ExperienceSection />
            </div>
          </div>
        </section>

        {/* Contact Section with Modern Form Design */}
        <section className="relative py-20 bg-gradient-to-br from-muted/20 to-background">
          <div className="absolute inset-0">
            <svg
              className="absolute top-0 left-0 w-full h-full text-accent/10"
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
            <ContactSection />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;