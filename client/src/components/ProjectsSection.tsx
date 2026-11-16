import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Flame,
  Film,
  Cpu,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DotMatrix from './ui/DotMatrix';

interface FeaturedProject {
  id: string;
  repoName: string;
  num: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  icon: typeof Flame;
  oneLiner: string;
  description: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  image: string;
  stars?: number;
  isFlagship?: boolean;
}

interface OtherProject {
  id: string;
  repoName: string;
  title: string;
  description: string;
  tech: string[];
  category: 'systems' | 'web' | 'tools' | 'assembly';
  githubUrl: string;
  demoUrl?: string;
  image: string;
  stars?: number;
}

const initialFeaturedProjects: FeaturedProject[] = [
  {
    id: 'nup-extractor',
    repoName: 'nup-extractor',
    num: '01',
    title: 'nup-extractor',
    category: 'Systems & Native Desktop',
    badge: 'Flagship Tool · 60+ Stars',
    badgeColor: 'border-[#FF0000]/60 text-[#FF0000] bg-[#3D0000]/40',
    icon: Flame,
    oneLiner: 'Native desktop GUI for inspecting, exploring, verifying, and extracting Nintendo Switch 1 & 2 clean-room (.nup) container archives.',
    description: 'High-performance native desktop tool built for deep inspection and clean-room extraction of Nintendo Switch 1 and next-generation Switch 2 (.nup) container archives. Features hierarchical tree browsing, SHA-256 integrity verification, automated file-type deduction, and selective extraction.',
    tech: ['C#', '.NET 10', 'Avalonia / WPF', 'Reverse Engineering', 'Python', 'Win32'],
    features: [
      'Dual Switch 1 & 2 clean-room .nup format support',
      'Hierarchical virtual tree archive browser',
      'Instant cryptographic verification (SHA-256)',
      'Selective sub-asset extraction & zero-copy decompression',
    ],
    githubUrl: 'https://github.com/SPIN0ZAi/nup-extractor',
    liveUrl: 'https://spin0zai.github.io/nup-extractor/',
    liveUrlLabel: 'Showcase',
    image: '/images/nup-extractor.png',
    stars: 60,
  },
  {
    id: 'framevault',
    repoName: 'FrameVault',
    num: '02',
    title: 'FrameVault',
    category: 'Full-Stack Web Ecosystem',
    badge: "Flagship Web App · Life's Biggest Project",
    badgeColor: 'border-[#FF0000]/60 text-[#FF0000] bg-[#3D0000]/40',
    icon: Film,
    isFlagship: true,
    oneLiner: 'Social movie-tracking platform where users log films, rate them, write reviews, and build personal watchlists.',
    description: 'Comprehensive full-stack social film-tracking and cinephile ecosystem. Designed and engineered as a modern flagship application with instantaneous movie search, rich social activity feeds, personalized film diaries, review interactions, and watchlist curation backed by Supabase and PostgreSQL.',
    tech: ['Next.js 15', 'TypeScript', 'Prisma ORM', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'TMDB API'],
    features: [
      'Movie logging, diary tracking, and precision 5-star ratings',
      'Personalized watchlists with public profile sharing',
      'Interactive review authoring and community activity feeds',
      'Real-time metadata syncing with TMDB catalogue',
    ],
    githubUrl: 'https://github.com/SPIN0ZAi/FrameVault',
    liveUrl: 'https://frame-vault-xi.vercel.app',
    liveUrlLabel: 'Live App',
    image: '/images/framevault-home.jpg',
    stars: 1,
  },
  {
    id: 'switch-1-extractor',
    repoName: 'Switch-1-extractor',
    num: '03',
    title: 'Switch-1-extractor',
    category: 'Systems Engineering in Rust',
    badge: 'Native Windows Systems',
    badgeColor: 'border-[#950101]/60 text-[#ff4d4d] bg-[#3D0000]/40',
    icon: Cpu,
    oneLiner: 'High-performance native Windows app for inspecting, decrypting, and extracting Nintendo Switch 1 archives (NSP, NSZ, XCI, XCZ, NCA).',
    description: 'Ultra-fast native Windows systems application engineered in Rust for inspecting, parsing, decrypting, and unpacking Nintendo Switch 1 container archives. Integrates BKTR delta merging for game patch updates, automated title metadata extraction, and organized DLC unpacking.',
    tech: ['Rust', 'Windows API', 'BKTR Delta Merging', 'NSP / XCI / NCA', 'Cryptography'],
    features: [
      'BKTR delta merging for applying incremental title updates',
      'Native support for NSP, NSZ, XCI, XCZ, and raw NCA containers',
      'Automated game metadata, version, and icon extraction',
      'Multi-threaded high-throughput decompression pipeline',
    ],
    githubUrl: 'https://github.com/SPIN0ZAi/Switch-1-extractor',
    liveUrl: 'https://spin0zai.github.io/Switch-1-extractor/',
    liveUrlLabel: 'Showcase',
    image: '/images/switch-1-extractor.png',
    stars: 0,
  },
  {
    id: 'cognitia',
    repoName: 'Cognitia',
    num: '04',
    title: 'Cognitia',
    category: 'Intelligent Systems Platform',
    badge: 'Academic AI Workbench',
    badgeColor: 'border-[#950101]/60 text-[#ff4d4d] bg-[#3D0000]/40',
    icon: Brain,
    oneLiner: 'Interactive, mathematically authoritative educational platform and simulation instrument for UCLM\'s Intelligent Systems curriculum.',
    description: 'Interactive university textbook and algorithm simulation workbench created for the Intelligent Systems curriculum at UCLM (Escuela Superior de Ingeniería Informática). Includes mathematical formalisms, PEAS agent models, topological state space search graph visualizers, and heuristic search benchmarks.',
    tech: ['TypeScript', 'React', 'Next.js / Vite', 'Tailwind CSS', 'AI Search Algorithms', 'Interactive Graph Visualizers'],
    features: [
      'Interactive state space search simulations (BFS, DFS, A*, Greedy)',
      'Admissible heuristic derivations and constraint problem solver',
      'Topological constellation lecture roadmap & interactive arcade',
      'Built specifically for the official 2026/2027 UCLM CS curriculum',
    ],
    githubUrl: 'https://github.com/SPIN0ZAi/Cognitia',
    liveUrl: 'https://cognitia-kappa.vercel.app',
    liveUrlLabel: 'Live App',
    image: '/images/cognitia.jpg',
    stars: 1,
  },
];

const initialOtherProjects: OtherProject[] = [
  {
    id: 'sb-manifest-db',
    repoName: 'SB_manifest_DB',
    title: 'SB_manifest_DB',
    description: 'Dedicated Steam Depot Manifest library and metadata archival indexing tool with automated manifest fetching and querying.',
    tech: ['Python', 'Steam API', 'Database Archive'],
    category: 'tools',
    githubUrl: 'https://github.com/SPIN0ZAi/SB_manifest_DB',
    image: '/images/nup-extractor.png',
    stars: 12,
  },
  {
    id: 'data-structures-visualizer',
    repoName: 'Data-Structures-Visualizer',
    title: 'Data Structures Visualizer',
    description: 'Interactive web application for visualizing fundamental algorithms and trees (BST, AVL rotations, graph BFS/DFS, Floyd-Warshall).',
    tech: ['TypeScript', 'React', 'Vite', 'SVG', 'Algorithms'],
    category: 'web',
    githubUrl: 'https://github.com/SPIN0ZAi/Data-Structures-Visualizer',
    demoUrl: 'https://data-structures-visualizer-seven.vercel.app/',
    image: '/images/data-structures-visualizer.png',
    stars: 6,
  },
  {
    id: 'one-tap-discord-bot',
    repoName: 'One-Tap---Advanced-Discord-JTC-Bot',
    title: 'One-Tap Discord JTC Bot',
    description: 'Join-to-Create voice channel manager with persistent sticky control message panels and multi-level permissions.',
    tech: ['TypeScript', 'Discord.js v14', 'Node.js', 'SQLite'],
    category: 'tools',
    githubUrl: 'https://github.com/SPIN0ZAi/One-Tap---Advanced-Discord-JTC-Bot',
    image: '/images/one-tap-discord-bot.png',
    stars: 1,
  },
  {
    id: 'emupresence',
    repoName: 'EmuPresence-Rich-Presence-for-Discord',
    title: 'EmuPresence Rich Presence',
    description: 'Unified Discord Rich Presence integration supporting retro and modern console emulators (DuckStation, PCSX2, etc.).',
    tech: ['Python', 'Discord RPC', 'Process Hooking'],
    category: 'tools',
    githubUrl: 'https://github.com/SPIN0ZAi/EmuPresence-Rich-Presence-for-Discord',
    image: '/images/one-tap-discord-bot.png',
    stars: 1,
  },
  {
    id: 'assembly-pixel-renderer',
    repoName: 'assembly-pixel-renderer',
    title: 'Assembly Pixel Renderer',
    description: '2D sprite animation and movement engine written in pure RISC-V assembly language for the Ripes architecture simulator.',
    tech: ['RISC-V Assembly', 'Ripes Simulator', 'Low-Level Graphics'],
    category: 'assembly',
    githubUrl: 'https://github.com/SPIN0ZAi/assembly-pixel-renderer',
    image: '/images/assembly-pixel-renderer.png',
    stars: 0,
  },
  {
    id: 'task-scheduling-simulation',
    repoName: 'Task-Scheduling-Simulation',
    title: 'Task Scheduling Simulation',
    description: 'Comprehensive OS task scheduler implementation in C featuring priority queues, dependency graphs, and latency analysis.',
    tech: ['C', 'Operating Systems', 'Algorithms', 'Data Structures'],
    category: 'systems',
    githubUrl: 'https://github.com/SPIN0ZAi/Task-Scheduling-Simulation',
    image: '/images/task-scheduling.png',
    stars: 0,
  },
  {
    id: 'hotel-simulation-system',
    repoName: 'Hotel-simulation-program',
    title: 'Hotel Simulation System',
    description: 'Multi-story hotel reservation and guest management system implemented with custom dynamic data structures in C.',
    tech: ['C', 'Memory Management', 'Data Structures'],
    category: 'systems',
    githubUrl: 'https://github.com/SPIN0ZAi/Hotel-simulation-program',
    image: '/images/hotel-simulation.png',
    stars: 0,
  },
  {
    id: 'brick-breaker-game',
    repoName: 'Brick_Breaker_Game_in_Java',
    title: 'Brick Breaker Game',
    description: 'Arcade game engine built in Java Swing featuring collision physics, frame-rate synchronization, and state management.',
    tech: ['Java', 'Swing', 'Object-Oriented Design'],
    category: 'tools',
    githubUrl: 'https://github.com/SPIN0ZAi/Brick_Breaker_Game_in_Java',
    image: '/images/brick-breaker-game.png',
    stars: 0,
  },
  {
    id: 'universal-doc-converter',
    repoName: 'Multi-Format-Converter',
    title: 'Universal Document Converter',
    description: 'Desktop GUI application for batch converting between 20+ document and media formats (PDF, DOCX, XLSX, Images).',
    tech: ['Python', 'Tkinter', 'pandas', 'Pillow'],
    category: 'tools',
    githubUrl: 'https://github.com/SPIN0ZAi/Multi-Format-Converter',
    image: '/images/one-tap-discord-bot.png',
    stars: 0,
  },
  {
    id: 'mkv-to-mp4-converter',
    repoName: 'Mkv-to-mp4-converter-with-UI',
    title: 'MKV to MP4 Converter GUI',
    description: 'Streamlined desktop transcoding utility with real-time FFmpeg progress tracking and H.264/AAC codec passthrough.',
    tech: ['Python', 'FFmpeg', 'Tkinter'],
    category: 'tools',
    githubUrl: 'https://github.com/SPIN0ZAi/Mkv-to-mp4-converter-with-UI',
    image: '/images/switch-1-extractor.png',
    stars: 0,
  },
  {
    id: 'learn-riscv-assembly',
    repoName: 'learn-riscv-assembly',
    title: 'RISC-V Knowledge Base',
    description: 'Collection of RISC-V assembly programs, datapath simulations, and system call implementations for computer architecture.',
    tech: ['RISC-V Assembly', 'Datapath', 'Architecture'],
    category: 'assembly',
    githubUrl: 'https://github.com/SPIN0ZAi/learn-riscv-assembly',
    image: '/images/assembly-pixel-renderer.png',
    stars: 0,
  },
  {
    id: 'pdf-toolkit',
    repoName: 'PDF-Toolkit---Free-PDF-Image-Tools',
    title: 'PDF Toolkit Web',
    description: 'Privacy-focused client-side document processing tool for PDF manipulation, page extraction, and image conversions.',
    tech: ['TypeScript', 'Web APIs', 'Tailwind CSS'],
    category: 'web',
    githubUrl: 'https://github.com/SPIN0ZAi/PDF-Toolkit---Free-PDF-Image-Tools',
    image: '/images/data-structures-visualizer.png',
    stars: 0,
  },
];

export default function ProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>(initialFeaturedProjects);
  const [otherProjects, setOtherProjects] = useState<OtherProject[]>(initialOtherProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllOtherProjects, setShowAllOtherProjects] = useState(false);
  const [frameVaultImg, setFrameVaultImg] = useState('/images/framevault-home.jpg');

  // Track expanded cards
  const [expandedFeatured, setExpandedFeatured] = useState<Record<string, boolean>>({});
  const [expandedOther, setExpandedOther] = useState<Record<string, boolean>>({});

  const toggleFeaturedExpand = (id: string) => {
    setExpandedFeatured((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOtherExpand = (id: string) => {
    setExpandedOther((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Fetch live stars across all repos
  useEffect(() => {
    fetch('https://api.github.com/users/SPIN0ZAi/repos?per_page=100')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API failed');
      })
      .then((repos: Array<{ name: string; stargazers_count: number }>) => {
        const starMap = new Map<string, number>();
        repos.forEach((r) => {
          starMap.set(r.name.toLowerCase(), r.stargazers_count);
        });

        setFeaturedProjects((prev) =>
          prev.map((p) => {
            const count = starMap.get(p.repoName.toLowerCase());
            return typeof count === 'number' ? { ...p, stars: count } : p;
          })
        );

        setOtherProjects((prev) =>
          prev.map((p) => {
            const count = starMap.get(p.repoName.toLowerCase());
            return typeof count === 'number' ? { ...p, stars: count } : p;
          })
        );
      })
      .catch(() => {});
  }, []);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Systems & Native', value: 'systems' },
    { label: 'Web & Full-Stack', value: 'web' },
    { label: 'Tools & Utilities', value: 'tools' },
    { label: 'Low-Level & Assembly', value: 'assembly' },
  ];

  const filteredOtherProjects = useMemo(() => {
    return otherProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [otherProjects, selectedCategory, searchQuery]);

  const displayedOtherProjects = showAllOtherProjects
    ? filteredOtherProjects
    : filteredOtherProjects.slice(0, 6);

  return (
    <section id="featured" className="py-24 relative scroll-mt-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ========================================================
            PART 1: FEATURED SHOWCASE (COMPACT & EXPANDABLE)
           ======================================================== */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center">
                <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
                  My Projects
                </h2>
                <DotMatrix />
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                Native systems tools, Nintendo Switch clean-room archive explorers, and full-stack web platforms.
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('projects-archive');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2 rounded-full border border-white/20 text-xs font-mono font-bold text-white hover:border-[#FF0000] hover:text-[#FF0000] transition-colors self-start md:self-end"
            >
              Show All Repositories →
            </button>
          </div>

          {/* 4 Compact Featured Cards Grid (Image + Title + Stars) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {featuredProjects.map((project, index) => {
              const isExpanded = !!expandedFeatured[project.id];
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group rounded-3xl bg-[#080202] border border-[#3D0000] hover:border-[#FF0000]/60 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Visual Preview Picture Header */}
                  <div className="relative bg-black border-b border-[#3D0000] overflow-hidden">
                    {/* Window Header Chrome */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#3D0000]/80 bg-[#0a0202]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#950101]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3D0000]" />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {project.id}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#FF0000]">
                        {project.num}
                      </span>
                    </div>

                    {/* Picture Preview */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer" onClick={() => toggleFeaturedExpand(project.id)}>
                      <img
                        src={project.isFlagship ? frameVaultImg : project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080202] via-transparent to-transparent opacity-80" />

                      {/* Stars Overlay Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        {project.stars !== undefined && project.stars > 0 && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/90 text-white border border-[#3D0000] backdrop-blur-md shadow-md">
                            <Star className="w-3.5 h-3.5 fill-[#FF0000] text-[#FF0000]" />
                            <span>{project.stars} Stars</span>
                          </span>
                        )}
                      </div>

                      {/* FrameVault Interactive View Tabs (if flagship) */}
                      {project.isFlagship && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 z-20">
                          {[
                            { label: 'Hero', src: '/images/framevault-home.jpg' },
                            { label: 'Profile', src: '/images/framevault-profile.jpg' },
                            { label: 'Movie', src: '/images/framevault-movie.jpg' }
                          ].map((tab) => (
                            <button
                              key={tab.src}
                              onClick={(e) => {
                                e.stopPropagation();
                                setFrameVaultImg(tab.src);
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold backdrop-blur-md transition-all ${
                                frameVaultImg === tab.src
                                  ? 'bg-[#FF0000] text-white font-bold shadow-md shadow-[#FF0000]/40'
                                  : 'bg-black/85 text-zinc-300 hover:text-white border border-[#3D0000]'
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Compact Bottom Bar (Name + Stars + Actions) */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-[#FF0000] transition-colors uppercase tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400">
                          {project.category}
                        </p>
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-[#3D0000]/30 hover:bg-[#3D0000] text-zinc-300 hover:text-white border border-[#3D0000] transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-[#FF0000] hover:bg-[#d60000] text-white flex items-center justify-center transition-transform hover:scale-105"
                            title="Live Demo"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Expand / Collapse Button */}
                    <button
                      onClick={() => toggleFeaturedExpand(project.id)}
                      className="w-full py-2 px-3 rounded-xl bg-black/60 border border-[#3D0000] hover:border-[#FF0000]/40 flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Project Details'}</span>
                      <ChevronDown className={`w-4 h-4 text-[#FF0000] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Expandable Description Area */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 pt-2 border-t border-[#3D0000]"
                        >
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                            {project.description}
                          </p>

                          <div className="space-y-1">
                            <p className="text-[11px] font-mono uppercase font-bold text-zinc-400">
                              // Architecture Highlights:
                            </p>
                            <ul className="space-y-1 text-xs text-zinc-400">
                              {project.features.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2">
                                  <span className="text-[#FF0000] font-bold">•</span>
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#3D0000]/30 text-zinc-300 border border-[#3D0000]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            PART 2: REPOSITORY ARCHIVE (COMPACT IMAGE + TITLE + STARS)
           ======================================================== */}
        <div id="projects-archive" className="scroll-mt-24 pt-8 border-t border-[#3D0000]">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center">
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Archive &amp; Labs
                </h3>
                <DotMatrix />
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Algorithm visualizers, OS simulators, bot engines, and utilities.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-full bg-[#080202] border-[#3D0000] text-xs text-white focus-visible:ring-[#FF0000]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-1.5 text-xs font-mono font-medium rounded-full transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-[#FF0000] text-white font-bold shadow-md shadow-[#FF0000]/25'
                    : 'bg-[#3D0000]/25 hover:bg-[#3D0000]/60 text-zinc-400 hover:text-white border border-[#3D0000]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Compact 3-Column Grid: Picture + Name + Stars */}
          {displayedOtherProjects.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-[#3D0000] bg-[#080202]">
              <p className="text-zinc-400 text-sm">No repositories matched your search.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 rounded-full border-[#3D0000] text-white hover:bg-[#3D0000]"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {displayedOtherProjects.map((project, pIdx) => {
                  const isExpanded = !!expandedOther[project.id];
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, delay: pIdx * 0.03 }}
                      className="group rounded-2xl bg-[#080202] border border-[#3D0000] hover:border-[#FF0000]/60 transition-all overflow-hidden flex flex-col justify-between"
                    >
                      {/* Compact Picture at Top */}
                      <div
                        className="relative h-36 bg-black overflow-hidden border-b border-[#3D0000] cursor-pointer"
                        onClick={() => toggleOtherExpand(project.id)}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080202] via-transparent to-transparent opacity-80" />

                        {/* Stars Badge at Top Right */}
                        <div className="absolute top-2.5 right-2.5">
                          {project.stars !== undefined && project.stars > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FF0000] font-bold bg-black/90 px-2 py-0.5 rounded-full border border-[#3D0000] shadow-md">
                              <Star className="w-3 h-3 fill-[#FF0000] text-[#FF0000]" />
                              <span>{project.stars}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom: Name + Actions */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className="font-heading font-bold text-sm text-white group-hover:text-[#FF0000] transition-colors truncate cursor-pointer"
                            onClick={() => toggleOtherExpand(project.id)}
                          >
                            {project.title}
                          </h4>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-[#3D0000]/50 transition-colors"
                              title="GitHub"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>

                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-6 h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform"
                                title="Live Demo"
                              >
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Expandable description on demand */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pt-2 border-t border-[#3D0000] space-y-2"
                            >
                              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {project.tech.map((t) => (
                                  <span
                                    key={t}
                                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3D0000]/30 text-zinc-400 border border-[#3D0000]"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Show More Button */}
          {filteredOtherProjects.length > 6 && (
            <div className="text-center pt-8">
              <Button
                variant="outline"
                className="rounded-full px-6 font-semibold border-[#3D0000] bg-[#3D0000]/25 hover:bg-[#3D0000]/60 hover:border-[#FF0000] text-white gap-2"
                onClick={() => setShowAllOtherProjects(!showAllOtherProjects)}
              >
                {showAllOtherProjects ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Show All ({filteredOtherProjects.length} Repositories)</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
