import { useEffect, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FloatingCode from '@/components/FloatingCode';

// Lazy load heavy components
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const CoursesSection = lazy(() => import('@/components/CoursesSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-pulse text-primary">Loading...</div>
  </div>
);

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
              <Suspense fallback={<SectionLoader />}>
                <AboutSection />
              </Suspense>
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
            <Suspense fallback={<SectionLoader />}>
              <ProjectsSection />
            </Suspense>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="relative py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-primary/5" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0, 255, 255, 0.02) 40px, rgba(0, 255, 255, 0.02) 80px)'
            }} />
          </div>
          <div className="relative">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-extra-wide text-foreground mb-6 text-glow-cyan">
                  Academic_Records
                </h2>
                <div className="w-32 h-1 bg-accent mx-auto rounded-full glow-cyan" />
              </div>
              <Suspense fallback={<SectionLoader />}>
                <CoursesSection />
              </Suspense>
            </div>
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
              <Suspense fallback={<SectionLoader />}>
                <ExperienceSection />
              </Suspense>
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
              <Suspense fallback={<SectionLoader />}>
                <ContactSection />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
