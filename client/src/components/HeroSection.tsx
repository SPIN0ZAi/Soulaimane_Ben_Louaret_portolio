import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Terminal, Code, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShapeBlur from './ShapeBlur';
import LaserFlow from './LaserFlow';
import FloatingCode from './FloatingCode';
import MatrixRain from './MatrixRain';
import TerminalWindow from './TerminalWindow';
import profileImage from '@assets/generated_images/soulaimane_portrait_sketch.png';

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const roles = ['Computer Engineering Student', 'Full-Stack Developer', 'Code Architect', 'Tech Innovator', 'Problem Solver', 'Digital Creator'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentRole.length) {
            setDisplayedText(currentRole.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(currentRole.slice(0, displayedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-6 py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Status Indicator */}
            <motion.div variants={item} className="flex items-center space-x-2 text-sm font-sans">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-muted-foreground uppercase tracking-wide">Available for Projects</span>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="font-serif text-6xl md:text-8xl font-black mb-6 text-foreground leading-tight uppercase tracking-wider">
                <span className="block text-foreground">Soulaimane</span>
                <span className="block text-primary text-5xl md:text-7xl font-extrabold">Ben Louaret</span>
              </h1>
            </motion.div>

            <motion.div variants={item} className="h-20 relative">
              <div className="flex items-center space-x-2 font-sans text-2xl md:text-3xl font-medium">
                <span className="text-accent">&gt;</span>
                <span className="text-muted-foreground" data-testid="text-hero-role">
                  {displayedText}
                </span>
                <span className="animate-pulse text-primary">|</span>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="bg-card backdrop-blur-sm border-2 border-card-border rounded-3xl p-8 shadow-lg">
                <div className="flex items-center space-x-2 text-sm font-sans text-accent mb-4">
                  <Code className="h-4 w-4" />
                  <span className="uppercase tracking-wide font-semibold">Developer Profile</span>
                </div>
                <p className="font-sans text-base text-card-foreground leading-relaxed max-w-lg" data-testid="text-hero-tagline">
                  Passionate about technology & innovation,<br/>
                  Building digital solutions that matter,<br/>
                  Ready to create and collaborate.
                </p>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="default"
                className="gap-3 font-sans font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => window.open('https://github.com/SPIN0ZAi', '_blank')}
                data-testid="button-github"
              >
                <Github className="h-5 w-5" />
                View Repository
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-3 font-sans font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-full px-8 py-6 text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() =>
                  window.open('https://www.linkedin.com/in/soulaimane-ben-louaret-98471428b', '_blank')
                }
                data-testid="button-linkedin"
              >
                <Linkedin className="h-5 w-5" />
                Connect Network
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="gap-3 font-sans font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full px-8 py-6 text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => (window.location.href = 'mailto:ssolayman244@gmail.com')}
                data-testid="button-email"
              >
                <Mail className="h-5 w-5" />
                Send Message
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Profile & Terminal */}
          <motion.div variants={item} className="relative space-y-6">
            {/* Profile Section */}
            <div className="relative">
              {/* Circuit Board Background */}
              <div className="absolute inset-0 -inset-8 opacity-20">
                <svg viewBox="0 0 200 200" className="w-full h-full text-accent transform rotate-12">
                  <path
                    d="M20,20 L180,20 L180,40 L40,40 L40,160 L160,160 L160,180 L20,180 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="60" cy="60" r="8" fill="currentColor" />
                  <circle cx="140" cy="140" r="8" fill="currentColor" />
                  <circle cx="180" cy="20" r="4" fill="currentColor" />
                </svg>
              </div>
              
              <motion.div
                className="relative z-10 mx-auto max-w-sm"
                whileHover={{
                  scale: 1.02,
                  rotate: 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Soulaimane Ben Louaret"
                    className="w-full h-auto rounded-3xl shadow-2xl border-2 border-primary/30 glow-cyan"
                    data-testid="img-profile"
                  />
                  
                  {/* Cyberpunk Frame Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-2xl shadow-lg transform rotate-12 flex items-center justify-center border border-primary glow-magenta">
                    <Cpu className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-accent glow-green">
                    <Code className="h-6 w-6 text-accent-foreground" />
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse glow-green"></div>
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse glow-cyan" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative"
            >
              <TerminalWindow className="max-w-xs mx-auto glow-green" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={item}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer flex flex-col items-center space-y-2"
            onClick={() =>
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
            }
            data-testid="button-scroll-down"
          >
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wide">SCROLL_DOWN</span>
            <ChevronDown className="h-6 w-6 text-accent glow-green" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Effects */}
      <div className="absolute inset-0 opacity-30">
        <ShapeBlur 
          variation={0}
          pixelRatioProp={window.devicePixelRatio || 1}
          shapeSize={1.5}
          roundness={0.6}
          borderSize={0.03}
          circleSize={0.25}
          circleEdge={0.7}
        />
      </div>

      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <LaserFlow 
          color="#00FFFF"
          wispDensity={0.8}
          mouseTiltStrength={0.015}
          fogIntensity={0.35}
          flowSpeed={0.4}
          wispIntensity={3.5}
        />
      </div>
    </section>
  );
}
