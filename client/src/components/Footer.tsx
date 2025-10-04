import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-muted/20 to-background border-t-2 border-accent/20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-sans text-3xl font-black uppercase tracking-extra-wide text-foreground mb-4">
                Soulaimane Ben Louaret
              </h3>
              <div className="w-16 h-1 bg-accent rounded-full mb-6"></div>
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-md">
                Computer Engineering student passionate about technology, innovation, and crafting digital solutions that make a meaningful impact.
              </p>
            </div>
            
            {/* Quote */}
            <div className="bg-accent/5 rounded-3xl p-6 border border-accent/10">
              <p className="font-body text-sm italic text-muted-foreground">
                "Thriving in the oceans of tech since age 10 — where curiosity meets code."
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div>
              <h4 className="font-sans text-lg font-bold uppercase tracking-wide text-foreground mb-4">
                Navigation
              </h4>
              <div className="w-8 h-0.5 bg-accent rounded-full mb-4"></div>
            </div>
            <div className="space-y-3">
              {['Home', 'About', 'Projects', 'Experience', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() =>
                    document
                      .querySelector(`#${item.toLowerCase()}`)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="group block font-body text-sm text-muted-foreground hover:text-foreground transition-all duration-300 py-2"
                  data-testid={`link-footer-${item.toLowerCase()}`}
                >
                  <span className="relative">
                    {item}
                    <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-accent rounded-full transition-all duration-300"></div>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-sans text-lg font-bold uppercase tracking-wide text-foreground mb-4">
                Connect
              </h4>
              <div className="w-8 h-0.5 bg-accent rounded-full mb-4"></div>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="outline"
                className="group rounded-2xl border-2 border-accent/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://github.com/SPIN0ZAi', '_blank')}
                data-testid="button-footer-github"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group rounded-2xl border-2 border-accent/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:scale-105"
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/in/soulaimane-ben-louaret-98471428b',
                    '_blank'
                  )
                }
                data-testid="button-footer-linkedin"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group rounded-2xl border-2 border-accent/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:scale-105"
                onClick={() => (window.location.href = 'mailto:ssolayman244@gmail.com')}
                data-testid="button-footer-email"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-body">Based in Spain</p>
              <p className="font-body">Open for opportunities</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-accent/20 gap-4">
          <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-accent fill-accent animate-pulse" />
            <span>and lots of</span>
            <span className="text-accent font-medium">☕</span>
            <span>© {currentYear} Soulaimane Ben Louaret</span>
          </div>
          
          {/* Back to Top */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="group gap-2 rounded-2xl border-2 border-accent/20 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:scale-105"
          >
            <span className="font-body text-xs uppercase tracking-wide">Back to top</span>
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Organic shape divider at top */}
      <div className="absolute top-0 left-0 w-full h-12 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full text-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C120,60 360,90 600,60 C840,30 1080,90 1200,60 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </footer>
  );
}
