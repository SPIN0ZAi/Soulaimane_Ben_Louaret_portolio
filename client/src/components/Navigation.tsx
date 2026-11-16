import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, ArrowUpRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Navigation() {
  const { data, isAdmin } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#featured' },
    { label: 'Journey', href: '#journey' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Header Navigation styled after Stygar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-[#3D0000] py-3.5 shadow-2xl shadow-black'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with Stygar-style Geometric Red Glyph */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            {/* Stygar Geometric Red Glyph */}
            <div className="grid grid-cols-2 gap-1 w-6 h-6 items-center">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF0000]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#950101]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#950101]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF0000]" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-black text-sm tracking-tight text-white group-hover:text-[#FF0000] transition-colors uppercase">
                {data.hero.fullName || 'Soulaimane Ben Louaret'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase -mt-0.5">
                Computer Science · UCLM
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-xs font-medium text-zinc-300 hover:text-[#FF0000] transition-colors focus:outline-none relative py-1"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Button - Red Pill matching Stygar "Get in Touch" + Admin Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/admin">
              <button
                className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center ${
                  isAdmin
                    ? 'bg-[#FF0000]/20 border-[#FF0000] text-[#FF0000]'
                    : 'bg-black/50 border-[#3D0000] text-zinc-400 hover:text-white hover:border-[#FF0000]'
                }`}
                title={isAdmin ? "Admin Console (Active)" : "Admin Portal"}
              >
                <Shield className="w-3.5 h-3.5" />
              </button>
            </Link>

            <Button
              className="rounded-full px-6 py-2.5 text-xs font-bold bg-[#FF0000] text-white hover:bg-[#d60000] shadow-md shadow-[#FF0000]/30 transition-all active:scale-95"
              onClick={() => scrollToSection('#contact')}
            >
              Get in Touch
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-4 right-4 bg-[#0a0202] border border-[#3D0000] rounded-3xl p-6 shadow-2xl z-40 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-zinc-200 hover:text-white hover:bg-[#3D0000]/40 rounded-2xl transition-colors text-left"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-[#FF0000]">→</span>
                  </button>
                ))}

                <div className="h-px bg-[#3D0000] my-2" />

                <Button
                  className="w-full rounded-2xl bg-[#FF0000] text-white hover:bg-[#d60000] font-bold"
                  onClick={() => scrollToSection('#contact')}
                >
                  Get in Touch
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
