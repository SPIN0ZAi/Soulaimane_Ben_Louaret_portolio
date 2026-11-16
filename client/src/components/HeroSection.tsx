import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, GraduationCap, Flame, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DotMatrix from './ui/DotMatrix';

export default function HeroSection() {
  const [starCount, setStarCount] = useState<number>(57);

  useEffect(() => {
    fetch('https://api.github.com/repos/SPIN0ZAi/nup-extractor')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API fetch failed');
      })
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-black text-white"
    >
      {/* Anchor for 'Who Am I' / 'About' */}
      <div id="about" className="absolute top-0" />

      {/* Ambient background glow in Deep Maroon (#3D0000) and Crimson */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-[#3D0000]/25 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#FF0000]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left z-10">
            
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0000]/30 border border-[#950101]/60 text-xs font-mono"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF0000]" />
              </span>
              <span className="text-zinc-200 uppercase tracking-wider font-semibold">
                Available for Software Engineering Roles · 2026/27
              </span>
            </motion.div>

            {/* Main Headline with Technical Red Crop Box on 'Systems' */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]"
            >
              Turning{' '}
              <span className="relative inline-block border border-[#FF0000] text-[#FF0000] px-2 py-0.5 mx-1 shadow-[0_0_20px_rgba(255,0,0,0.25)]">
                {/* 4 Corner Crop Nodes */}
                <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#FF0000]" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#FF0000]" />
                <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#FF0000]" />
                <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#FF0000]" />
                Ideas
              </span>{' '}
              Into
              <br />
              Digital Reality
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed max-w-xl"
            >
              I am <span className="text-white font-bold">Soulaimane Ben Louaret</span>, a 3rd-year Computer Science student at Universidad de Castilla-La Mancha (ESII Albacete). Having cleared <span className="text-[#FF0000] font-semibold">100% of coursework in Years 1 &amp; 2</span>, I engineer high-performance systems tools, reverse-engineer Nintendo Switch archives (<span className="text-white font-mono">nup-extractor</span> · 57+ stars), and craft modern full-stack web platforms (<span className="text-white font-mono">FrameVault</span>).
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-sm font-bold bg-[#FF0000] text-white hover:bg-[#d60000] shadow-xl shadow-[#FF0000]/30 transition-all hover:scale-105 active:scale-95"
                onClick={() => scrollTo('#contact')}
              >
                <span>Start a Project</span>
              </Button>

              <button
                onClick={() => scrollTo('#featured')}
                className="inline-flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-[#FF0000] transition-colors group px-4 py-3"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>

          </div>

          {/* Right Column: Giant Typographic Outline + 3D Animated Character */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Giant Background Typographic Outline */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-0">
              <span className="font-heading font-black text-[75px] sm:text-[110px] lg:text-[130px] text-transparent tracking-tighter opacity-15 [-webkit-text-stroke:2px_#ffffff] uppercase">
                SOULAIMANE
              </span>
            </div>

            {/* Glowing circular podium backdrop */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#3D0000]/80 via-[#950101]/30 to-[#FF0000]/10 blur-2xl -z-0" />

            {/* 3D Character of Soulaimane */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] flex items-center justify-center"
            >
              <motion.img
                src="/images/soulaimane-3d.png?v=2"
                alt="Soulaimane Ben Louaret 3D Character"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(255,0,0,0.25)]"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Status pill tag attached near character */}
              <div className="absolute bottom-4 -left-2 sm:-left-6 p-2.5 rounded-2xl bg-black/90 border border-[#3D0000] shadow-xl backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-white">
                  UCLM · ESII Albacete
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Bottom Metrics Bar (exact Stygar layout with red dot matrices) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 border-t border-[#3D0000]/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          
          <div className="flex items-center gap-3">
            <DotMatrix className="hidden sm:inline-grid shrink-0" />
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                {starCount}+
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Stars on nup-extractor
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                100%
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Passed Years 1 &amp; 2 Coursework
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                3rd Year
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Computer Science (2026–27)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3">
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white">
                Rust·C#·TS
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Systems &amp; Full-Stack Stack
              </div>
            </div>
            <DotMatrix className="hidden sm:inline-grid shrink-0 ml-auto" />
          </div>

        </div>
      </div>

    </section>
  );
}
