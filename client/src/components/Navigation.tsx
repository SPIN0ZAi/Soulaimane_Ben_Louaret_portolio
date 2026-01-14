import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Courses', href: '#courses' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl border-b-2 border-accent/20 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo with Cyberpunk Typography */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <span className="font-serif text-2xl font-bold uppercase tracking-wider text-foreground">
                SB
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"></div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(item.href)}
                  className="group relative font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 px-6 py-3 rounded-full hover:bg-card/30"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  <span className="relative z-10 uppercase tracking-wide">{item.label}</span>
                  
                  {/* Hover indicator with neon glow */}
                  <div className="absolute inset-x-2 bottom-1 h-0.5 bg-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </motion.button>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                variant="default"
                className="font-sans font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => scrollToSection('#contact')}
              >
                Connect
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden relative rounded-2xl border-2 border-accent/20 hover:border-accent hover:bg-accent/10 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card border-l-2 border-accent/20 md:hidden"
            >
              <div className="p-6 border-b border-accent/10">
                <div className="font-serif text-xl font-bold uppercase tracking-wider text-foreground">
                  Menu
                </div>
              </div>
              
              {/* Navigation Items */}
              <div className="flex flex-col gap-2 p-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => scrollToSection(item.href)}
                    className="group text-left font-sans text-lg font-medium text-foreground hover:text-accent transition-all duration-300 px-6 py-4 rounded-2xl hover:bg-card/30 border border-transparent hover:border-accent/20"
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  >
                    <span className="uppercase tracking-wide">{item.label}</span>
                    <div className="w-0 group-hover:w-8 h-0.5 bg-accent rounded-full transition-all duration-300 mt-1 glow-warm"></div>
                  </motion.button>
                ))}
                
                {/* Mobile CTA */}
                <div className="mt-8">
                  <Button
                    variant="default"
                    className="w-full font-sans font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-4 text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                    onClick={() => scrollToSection('#contact')}
                  >
                    Get In Touch
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
