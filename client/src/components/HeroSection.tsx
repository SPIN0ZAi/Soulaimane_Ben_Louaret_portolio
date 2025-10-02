import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@assets/generated_images/Professional_developer_profile_photo_d6596db3.png';

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const roles = ['Computer Engineering Student', 'Tech Enthusiast', 'Problem Solver'];
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-foreground rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center"
      >
        <motion.div variants={item} className="mb-8">
          <div className="relative inline-block">
            <motion.img
              src={profileImage}
              alt="Soulaimane Ben Louaret"
              className="w-48 h-48 rounded-full border-4 border-primary/20 shadow-2xl mx-auto"
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: 10,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              data-testid="img-profile"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent-foreground/20 blur-xl"></div>
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent-foreground bg-clip-text text-transparent"
          data-testid="text-hero-name"
        >
          Soulaimane Ben Louaret
        </motion.h1>

        <motion.div variants={item} className="h-16 mb-6">
          <p className="text-xl md:text-2xl text-muted-foreground font-medium" data-testid="text-hero-role">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-muted-foreground italic mb-8"
          data-testid="text-hero-tagline"
        >
          "Thriving in the oceans of tech since age 10"
        </motion.p>

        <motion.div variants={item} className="flex items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            variant="default"
            className="gap-2"
            onClick={() => window.open('https://github.com/SPIN0ZAi', '_blank')}
            data-testid="button-github"
          >
            <Github className="h-5 w-5" />
            GitHub
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            onClick={() =>
              window.open('https://www.linkedin.com/in/soulaimane-ben-louaret-98471428b', '_blank')
            }
            data-testid="button-linkedin"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2"
            onClick={() => (window.location.href = 'mailto:ssolayman244@gmail.com')}
            data-testid="button-email"
          >
            <Mail className="h-5 w-5" />
            Contact
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={() =>
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
          }
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-8 w-8 mx-auto text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
