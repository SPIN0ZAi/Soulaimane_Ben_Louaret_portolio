import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import DotMatrix from './ui/DotMatrix';
import CropBox from './ui/CropBox';
import { GraduationCap, Cpu, Layers, Sparkles, Binary } from 'lucide-react';

interface JourneyNode {
  step: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: typeof Binary;
}

const journeyNodes: JourneyNode[] = [
  {
    step: '1',
    year: '2024–25 · Year 1',
    title: 'Foundations of Computing',
    subtitle: '100% Passed · UCLM ESII Albacete',
    description: 'Mastered mathematical foundations, algorithmic problem solving, calculus, and digital circuits. Developed first 2D sprite engines and RISC-V assembly programs with datapath simulations.',
    tags: ['Algorithms', 'Discrete Math', 'RISC-V Assembly', 'C Basics'],
    icon: GraduationCap,
  },
  {
    step: '2',
    year: '2025–26 · Year 2',
    title: 'Systems & Concurrent Engineering',
    subtitle: '100% Passed (All 10 Subjects) · Zero Backlogs',
    description: 'Cleared operating system kernels, mutex concurrency, thread synchronisation, computer organization, and relational databases. Built custom C task schedulers and simulation systems.',
    tags: ['Operating Systems', 'Concurrency', 'Computer Organization', 'Databases'],
    icon: Cpu,
  },
  {
    step: '3',
    year: '2025–26 · Breakthrough',
    title: 'nup-extractor & Native Tooling',
    subtitle: '57+ GitHub Stars · Open Source Systems Tool',
    description: 'Designed and authored nup-extractor, the native desktop GUI for inspecting, exploring, and extracting Nintendo Switch 1 & 2 clean-room archives. Followed by Switch-1-extractor in Rust with BKTR delta merging.',
    tags: ['C# / .NET 10', 'Rust', 'Reverse Engineering', 'SHA-256 Decompression'],
    icon: Binary,
  },
  {
    step: '4',
    year: '2026 · Flagship Platforms',
    title: 'FrameVault & Cognitia',
    subtitle: 'Full-Stack Architecture & Academic Platforms',
    description: 'Architected FrameVault, a comprehensive social film-tracking platform (Next.js 15, Prisma, Supabase) and Cognitia, an authoritative educational workbench for UCLM\'s Intelligent Systems coursework.',
    tags: ['Next.js 15', 'Prisma ORM', 'Supabase', 'Intelligent Systems AI'],
    icon: Layers,
  },
  {
    step: '5',
    year: '2026–27 · Year 3 (Current)',
    title: 'Advanced Horizons & Industry Roles',
    subtitle: 'In Progress · Available for Software Roles',
    description: 'Currently deepening knowledge in distributed systems, heuristic search algorithms, and human-computer interaction while actively seeking software engineering internships and junior systems roles.',
    tags: ['Distributed Systems', 'Heuristics', 'HCI', '2026/27 Opportunities'],
    icon: Sparkles,
  },
];

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="py-32 relative scroll-mt-24 bg-black overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#3D0000]/20 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Header - Styled matching Stygar "Our Journey :::" */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center">
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              My Journey
            </h2>
            <DotMatrix />
          </div>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl">
            From foundational computer science theory at Universidad de Castilla-La Mancha to building high-performance native desktop tools, reverse engineering archives, and modern full-stack ecosystems.
          </p>
        </div>

        {/* Desktop Journey Canvas with Continuous Scroll-Animated Line */}
        <div className="hidden lg:block relative min-h-[920px]">
          
          {/* SVG Canvas for the Continuous Scroll-Driven Line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="journeyGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0000" />
                <stop offset="50%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#950101" />
              </linearGradient>
            </defs>

            {/* Background Faint Dashed Path (the trail) */}
            <path
              d="M 120,90 C 260,20 380,180 500,90 C 620,10 740,160 860,90 C 960,190 920,400 800,430 C 620,470 380,330 200,430 C 80,510 60,680 200,720 C 360,760 620,630 780,730"
              stroke="#3D0000"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />

            {/* Active Glowing Red Animated Path that Evolves on Scroll */}
            <motion.path
              d="M 120,90 C 260,20 380,180 500,90 C 620,10 740,160 860,90 C 960,190 920,400 800,430 C 620,470 380,330 200,430 C 80,510 60,680 200,720 C 360,760 620,630 780,730"
              stroke="url(#journeyGlowGrad)"
              strokeWidth="3.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
              }}
              filter="drop-shadow(0 0 8px rgba(255, 0, 0, 0.75))"
            />
          </svg>

          {/* Node 1: Top Left */}
          <div className="absolute top-4 left-6 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3 p-5 rounded-2xl bg-[#080202]/90 border border-[#3D0000] hover:border-[#FF0000]/60 backdrop-blur-md transition-all shadow-xl group"
            >
              <div className="flex items-center gap-3">
                <CropBox active size="sm" className="w-9 h-9">
                  1
                </CropBox>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF0000] uppercase tracking-wider block">
                    {journeyNodes[0].year}
                  </span>
                  <h3 className="font-heading font-black text-lg text-white group-hover:text-[#FF0000] transition-colors">
                    {journeyNodes[0].title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {journeyNodes[0].description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {journeyNodes[0].tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D0000]/40 text-zinc-300 border border-[#3D0000]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Node 2: Top Right */}
          <div className="absolute top-8 right-6 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3 p-5 rounded-2xl bg-[#080202]/90 border border-[#3D0000] hover:border-[#FF0000]/60 backdrop-blur-md transition-all shadow-xl group"
            >
              <div className="flex items-center gap-3">
                <CropBox active size="sm" className="w-9 h-9">
                  2
                </CropBox>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF0000] uppercase tracking-wider block">
                    {journeyNodes[1].year}
                  </span>
                  <h3 className="font-heading font-black text-lg text-white group-hover:text-[#FF0000] transition-colors">
                    {journeyNodes[1].title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {journeyNodes[1].description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {journeyNodes[1].tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D0000]/40 text-zinc-300 border border-[#3D0000]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Node 3: Center Left */}
          <div className="absolute top-[370px] left-12 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3 p-6 rounded-2xl bg-[#080202]/90 border border-[#950101] hover:border-[#FF0000] backdrop-blur-md transition-all shadow-2xl group shadow-black"
            >
              <div className="flex items-center gap-3">
                <CropBox active size="sm" className="w-9 h-9">
                  3
                </CropBox>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF0000] uppercase tracking-wider block">
                    {journeyNodes[2].year}
                  </span>
                  <h3 className="font-heading font-black text-xl text-white group-hover:text-[#FF0000] transition-colors">
                    {journeyNodes[2].title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {journeyNodes[2].description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {journeyNodes[2].tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D0000]/60 text-white border border-[#950101]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Node 4: Lower Right */}
          <div className="absolute top-[390px] right-12 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3 p-6 rounded-2xl bg-[#080202]/90 border border-[#3D0000] hover:border-[#FF0000]/60 backdrop-blur-md transition-all shadow-xl group"
            >
              <div className="flex items-center gap-3">
                <CropBox active size="sm" className="w-9 h-9">
                  4
                </CropBox>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF0000] uppercase tracking-wider block">
                    {journeyNodes[3].year}
                  </span>
                  <h3 className="font-heading font-black text-xl text-white group-hover:text-[#FF0000] transition-colors">
                    {journeyNodes[3].title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {journeyNodes[3].description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {journeyNodes[3].tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D0000]/40 text-zinc-300 border border-[#3D0000]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Node 5: Bottom Center */}
          <div className="absolute top-[680px] left-1/2 -translate-x-1/2 max-w-lg w-full px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3 p-6 rounded-2xl bg-[#0c0303] border border-[#FF0000] shadow-[0_0_25px_rgba(255,0,0,0.2)] backdrop-blur-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <CropBox active size="sm" className="w-9 h-9">
                  5
                </CropBox>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF0000] uppercase tracking-wider block">
                    {journeyNodes[4].year}
                  </span>
                  <h3 className="font-heading font-black text-xl text-white group-hover:text-[#FF0000] transition-colors">
                    {journeyNodes[4].title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {journeyNodes[4].description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {journeyNodes[4].tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#FF0000]/15 text-[#FF0000] font-semibold border border-[#FF0000]/30">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Mobile / Tablet Journey List with Vertical Animated Progress Line */}
        <div className="lg:hidden relative pl-6 space-y-10">
          {/* Vertical Winding Dashed Progress Track */}
          <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-[#3D0000] border-l border-dashed border-[#3D0000]" />
          <motion.div
            className="absolute top-0 left-2.5 w-0.5 bg-[#FF0000] shadow-[0_0_8px_#FF0000]"
            style={{
              height: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
            }}
          />

          {journeyNodes.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative space-y-3 p-5 rounded-2xl bg-[#080202] border border-[#3D0000] shadow-xl"
            >
              <div className="flex items-center gap-3">
                <CropBox active size="sm" className="w-8 h-8 shrink-0">
                  {item.step}
                </CropBox>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF0000] uppercase">
                    {item.year}
                  </span>
                  <h3 className="font-heading font-bold text-base text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3D0000]/40 text-zinc-300 border border-[#3D0000]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
