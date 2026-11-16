import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  subtext?: string;
  color?: string;
}

export interface HeroData {
  fullName: string;
  nickname: string;
  outlineText: string;
  availabilityBadge: string;
  headlinePrefix: string;
  headlineCropWord: string;
  headlineSuffix: string;
  bio: string;
  avatarUrl: string;
  metrics: MetricItem[];
}

export interface ProjectItem {
  id: string;
  repoName: string;
  num?: string;
  title: string;
  category: string;
  badge?: string;
  badgeColor?: string;
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
  isFeatured: boolean;
  priority?: number;
}

export interface JourneyItem {
  id: string;
  step: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface AchievementItem {
  id: string;
  num: string;
  title: string;
  description: string;
}

export interface AchievementsData {
  year1: string;
  year2: string;
  title: string;
  subtitle: string;
  items: AchievementItem[];
}

export interface SubjectItem {
  name: string;
  theme: string;
  tag?: string;
}

export interface AcademicYearItem {
  id: string;
  year: string;
  title: string;
  status: 'in-progress' | 'passed';
  statusLabel: string;
  institution: string;
  location: string;
  description: string;
  subjects: SubjectItem[];
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
  note?: string;
}

export interface SkillGroupItem {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface CtaData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  buttonText: string;
  avatarUrl: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  twitter?: string;
  discord?: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  email: string;
  location: string;
  status: string;
  social: SocialLinks;
}

export interface ThemeSettings {
  primaryColor: string; // Electric Red e.g. #FF0000
  crimsonColor: string; // Crimson e.g. #950101
  maroonColor: string;  // Deep Maroon e.g. #3D0000
  backgroundColor: string; // #000000
  glowIntensity: number; // 0 - 100
  showDotMatrix: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface PortfolioData {
  hero: HeroData;
  projects: ProjectItem[];
  journey: JourneyItem[];
  achievements: AchievementsData;
  education: AcademicYearItem[];
  skills: SkillGroupItem[];
  cta: CtaData;
  contact: ContactData;
  theme: ThemeSettings;
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    fullName: 'Soulaimane Ben Louaret',
    nickname: 'SPIN0ZAi',
    outlineText: 'SOULAIMANE',
    availabilityBadge: 'AVAILABLE FOR SOFTWARE ENGINEERING ROLES · 2026/27',
    headlinePrefix: 'Turning',
    headlineCropWord: 'Ideas',
    headlineSuffix: 'Into Digital Reality',
    bio: 'I am Soulaimane Ben Louaret, a 3rd-year Computer Science student at Universidad de Castilla-La Mancha (ESII Albacete). Having cleared 100% of coursework in Years 1 & 2, I engineer high-performance systems tools, reverse-engineer Nintendo Switch archives (nup-extractor · 60+ stars), and craft modern full-stack web platforms (FrameVault).',
    avatarUrl: '/images/soulaimane-3d.png?v=2',
    metrics: [
      {
        id: 'metric-1',
        value: '60+',
        label: 'Stars on nup-extractor',
        subtext: 'Flagship Tool',
        color: '#FF0000'
      },
      {
        id: 'metric-2',
        value: '100%',
        label: 'Passed Years 1 & 2 Coursework',
        subtext: 'Zero Backlogs',
        color: '#FF0000'
      },
      {
        id: 'metric-3',
        value: '3rd Year',
        label: 'Computer Science (2026–27)',
        subtext: 'UCLM Albacete',
        color: '#FF0000'
      },
      {
        id: 'metric-4',
        value: 'Rust · C# · TS',
        label: 'Systems & Full-Stack Stack',
        subtext: 'Core Arsenal',
        color: '#FF0000'
      }
    ]
  },
  projects: [
    {
      id: 'nup-extractor',
      repoName: 'nup-extractor',
      num: '01',
      title: 'nup-extractor',
      category: 'Systems & Native Desktop',
      badge: 'Flagship Tool · 60+ Stars',
      badgeColor: 'border-[#FF0000]/60 text-[#FF0000] bg-[#3D0000]/40',
      oneLiner: 'Native desktop GUI for inspecting, exploring, verifying, and extracting Nintendo Switch 1 & 2 clean-room (.nup) container archives.',
      description: 'High-performance native desktop tool built for deep inspection and clean-room extraction of Nintendo Switch 1 and next-generation Switch 2 (.nup) container archives. Features hierarchical tree browsing, SHA-256 integrity verification, automated file-type deduction, and selective extraction.',
      tech: ['C#', '.NET 10', 'Avalonia / WPF', 'Reverse Engineering', 'Python', 'Win32'],
      features: [
        'Dual Switch 1 & 2 clean-room .nup format support',
        'Hierarchical virtual tree archive browser',
        'Instant cryptographic verification (SHA-256)',
        'Selective sub-asset extraction & zero-copy decompression'
      ],
      githubUrl: 'https://github.com/SPIN0ZAi/nup-extractor',
      liveUrl: 'https://spin0zai.github.io/nup-extractor/',
      liveUrlLabel: 'Showcase',
      image: '/images/nup-extractor.png',
      stars: 60,
      isFlagship: true,
      isFeatured: true,
      priority: 1
    },
    {
      id: 'framevault',
      repoName: 'FrameVault',
      num: '02',
      title: 'FrameVault',
      category: 'Full-Stack Web Ecosystem',
      badge: "Flagship Web App · Life's Biggest Project",
      badgeColor: 'border-[#FF0000]/60 text-[#FF0000] bg-[#3D0000]/40',
      oneLiner: 'Social movie-tracking platform where users log films, rate them, write reviews, and build personal watchlists.',
      description: 'Comprehensive full-stack social film-tracking and cinephile ecosystem. Designed and engineered as a modern flagship application with instantaneous movie search, rich social activity feeds, personalized film diaries, review interactions, and watchlist curation backed by Supabase and PostgreSQL.',
      tech: ['Next.js 15', 'TypeScript', 'Prisma ORM', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'TMDB API'],
      features: [
        'Movie logging, diary tracking, and precision 5-star ratings',
        'Personalized watchlists with public profile sharing',
        'Interactive review authoring and community activity feeds',
        'Real-time metadata syncing with TMDB catalogue'
      ],
      githubUrl: 'https://github.com/SPIN0ZAi/FrameVault',
      liveUrl: 'https://frame-vault-xi.vercel.app',
      liveUrlLabel: 'Live App',
      image: '/images/framevault-home.jpg',
      stars: 6,
      isFlagship: true,
      isFeatured: true,
      priority: 2
    },
    {
      id: 'switch-1-extractor',
      repoName: 'Switch-1-extractor',
      num: '03',
      title: 'Switch-1-extractor',
      category: 'Systems Software & High Performance',
      badge: 'Systems Tool · Memory-Safe',
      badgeColor: 'border-[#FF0000]/60 text-[#FF0000] bg-[#3D0000]/40',
      oneLiner: 'Memory-safe systems tool in Rust for parsing and unpacking Nintendo Switch 1 title packages (NCA, NSP, XCI).',
      description: 'High-performance systems software written in Rust for decoding and extracting Nintendo Switch 1 container formats (NSP, XCI, NCA). Implements BKTR delta fragment merging, direct crypto AES-XTS verification, zero-copy buffer streaming, and automated header deduction.',
      tech: ['Rust', 'Systems Programming', 'Reverse Engineering', 'Cryptography', 'BKTR', 'AES-XTS'],
      features: [
        'Zero-copy streaming pipeline for multi-gigabyte title archives',
        'BKTR delta fragment decompression and base patch reconstruction',
        'Deterministic cryptographic verification with memory-safety guarantees',
        'Fast CLI with detailed partition layout and header reports'
      ],
      githubUrl: 'https://github.com/SPIN0ZAi/Switch-1-extractor',
      image: '/images/switch-1-extractor.png',
      stars: 4,
      isFlagship: false,
      isFeatured: true,
      priority: 3
    },
    {
      id: 'cognitia',
      repoName: 'Cognitia',
      num: '04',
      title: 'Cognitia',
      category: 'Full-Stack Educational Workbench',
      badge: 'Academic Platform · Intelligent Systems',
      badgeColor: 'border-[#FF0000]/60 text-[#FF0000] bg-[#3D0000]/40',
      oneLiner: 'Authoritative educational workbench and algorithm visualizer for UCLM Intelligent Systems coursework.',
      description: 'A dedicated educational platform built for students and faculty in Intelligent Systems at UCLM. Visualizes graph searches (A*, BFS, DFS, Dijkstra), heuristic evaluation spaces, and knowledge representation models through an interactive WebGL & React UI.',
      tech: ['TypeScript', 'React 18', 'Tailwind CSS', 'Vite', 'Heuristic Algorithms', 'Graph Theory'],
      features: [
        'Step-by-step heuristic search visualizer (A*, Greedy, Hill Climbing)',
        'Interactive state-space graph builder with custom cost heuristics',
        'Real-time algorithm performance metrics & branch factor comparison',
        'Exportable study notes and structured problem set solutions'
      ],
      githubUrl: 'https://github.com/SPIN0ZAi/Cognitia',
      liveUrl: 'https://cognitia-platform.vercel.app',
      liveUrlLabel: 'Demo',
      image: '/images/cognitia.png',
      stars: 5,
      isFlagship: false,
      isFeatured: true,
      priority: 4
    },
    {
      id: 'sb-manifest-db',
      repoName: 'SB_manifest_DB',
      title: 'SB_manifest_DB',
      description: 'Centralized clean-room database repository cataloging verified metadata, cryptographic SHA-256 digests, and partition specs for Switch title archives.',
      tech: ['Python', 'SQLite', 'JSON Schema', 'Data Engineering'],
      category: 'Systems & Data',
      githubUrl: 'https://github.com/SPIN0ZAi/SB_manifest_DB',
      image: '/images/sb-manifest-db.png',
      stars: 12,
      isFeatured: false,
      features: ['Automated cryptographic digest cataloging', 'Fast SQLite indexed search'],
      oneLiner: 'Cryptographic SHA-256 database for Switch manifests.'
    },
    {
      id: 'dungeon-riscv',
      repoName: 'dungeon-crawler-riscv',
      title: '2D Dungeon Crawler in RISC-V',
      description: 'A complete 2D retro dungeon crawler written 100% in pure RISC-V 32-bit assembly. Features bitmap graphics rendering, tile collision, and sprite animations.',
      tech: ['RISC-V Assembly', 'RARS Simulator', 'Low-Level Optimization', 'Computer Organization'],
      category: 'Assembly & Hardware',
      githubUrl: 'https://github.com/SPIN0ZAi',
      image: '/images/riscv-dungeon.png',
      stars: 9,
      isFeatured: false,
      features: ['Pixel-perfect bitmap frame buffer manipulation', 'Direct register allocation and datapath optimization'],
      oneLiner: 'Pure RISC-V assembly game with frame-buffer rendering.'
    },
    {
      id: 'c-task-scheduler',
      repoName: 'c-concurrency-scheduler',
      title: 'Preemptive Task Scheduler in C',
      description: 'Custom multi-threaded task scheduler and mutex synchronization suite created for Operating Systems coursework at UCLM.',
      tech: ['C', 'POSIX Threads', 'Mutexes & Semaphores', 'Operating Systems'],
      category: 'Operating Systems',
      githubUrl: 'https://github.com/SPIN0ZAi',
      image: '/images/c-scheduler.png',
      stars: 7,
      isFeatured: false,
      features: ['Priority queue thread scheduling', 'Deadlock detection algorithms'],
      oneLiner: 'POSIX thread scheduler with mutex synchronization in C.'
    }
  ],
  journey: [
    {
      id: 'journey-1',
      step: '1',
      year: '2024–25 · Year 1',
      title: 'Foundations of Computing',
      subtitle: '100% Passed · UCLM ESII Albacete',
      description: 'Mastered mathematical foundations, algorithmic problem solving, calculus, and digital circuits. Developed first 2D sprite engines and RISC-V assembly programs with datapath simulations.',
      tags: ['Algorithms', 'Discrete Math', 'RISC-V Assembly', 'C Basics']
    },
    {
      id: 'journey-2',
      step: '2',
      year: '2025–26 · Year 2',
      title: 'Systems & Concurrent Engineering',
      subtitle: '100% Passed (All 10 Subjects) · Zero Backlogs',
      description: 'Cleared operating system kernels, mutex concurrency, thread synchronisation, computer organization, and relational databases. Built custom C task schedulers and simulation systems.',
      tags: ['Operating Systems', 'Concurrency', 'Computer Organization', 'Databases']
    },
    {
      id: 'journey-3',
      step: '3',
      year: '2025–26 · Breakthrough',
      title: 'nup-extractor & Native Tooling',
      subtitle: '60+ GitHub Stars · Open Source Systems Tool',
      description: 'Designed and authored nup-extractor, the native desktop GUI for inspecting, exploring, and extracting Nintendo Switch 1 & 2 clean-room archives. Followed by Switch-1-extractor in Rust with BKTR delta merging.',
      tags: ['C# / .NET 10', 'Rust', 'Reverse Engineering', 'SHA-256 Decompression']
    },
    {
      id: 'journey-4',
      step: '4',
      year: '2026 · Flagship Platforms',
      title: 'FrameVault & Cognitia',
      subtitle: 'Full-Stack Architecture & Academic Platforms',
      description: 'Architected FrameVault, a comprehensive social film-tracking platform (Next.js 15, Prisma, Supabase) and Cognitia, an authoritative educational workbench for UCLM\'s Intelligent Systems coursework.',
      tags: ['Next.js 15', 'Prisma ORM', 'Supabase', 'Intelligent Systems AI']
    },
    {
      id: 'journey-5',
      step: '5',
      year: '2026–27 · Year 3 (Current)',
      title: 'Advanced Horizons & Industry Roles',
      subtitle: 'In Progress · Available for Software Roles',
      description: 'Currently deepening knowledge in distributed systems, heuristic search algorithms, and human-computer interaction while actively seeking software engineering internships and junior systems roles.',
      tags: ['Distributed Systems', 'Heuristics', 'HCI', '2026/27 Opportunities']
    }
  ],
  achievements: {
    year1: '20',
    year2: '27',
    title: 'My Achievements',
    subtitle: 'Key milestones across academic performance, open-source adoption, and systems software engineering.',
    items: [
      {
        id: 'ach-1',
        num: '1',
        title: 'nup-extractor Open-Source Recognition',
        description: 'Authored the premier native GUI for Nintendo Switch 1 & 2 clean-room (.nup) container archives, growing past 60+ stars and widespread community adoption.'
      },
      {
        id: 'ach-2',
        num: '2',
        title: '100% Academic Pass Rate at UCLM',
        description: 'Successfully passed every single course across Years 1 & 2 at Escuela Superior de Ingeniería Informática (Albacete) with zero backlogs.'
      },
      {
        id: 'ach-3',
        num: '3',
        title: 'FrameVault Full-Stack Flagship',
        description: 'Engineered a modern social film ecosystem using Next.js 15 App Router, Prisma ORM, and Supabase PostgreSQL with TMDB syncing.'
      },
      {
        id: 'ach-4',
        num: '4',
        title: 'Low-Level Systems Engineering in Rust & C#',
        description: 'Developed Switch-1-extractor with BKTR delta merging, alongside custom C task schedulers and RISC-V assembly renderers.'
      }
    ]
  },
  education: [
    {
      id: 'year-3',
      year: '2026-27',
      title: 'Year 3: Advanced Systems, Architecture & AI',
      status: 'in-progress',
      statusLabel: 'Current Year · In Progress',
      institution: 'Escuela Superior de Ingeniería Informática (ESII) · UCLM',
      location: 'Albacete, Spain',
      description: 'Current 3rd-year coursework focusing on distributed architectures, intelligent systems and heuristic AI, advanced algorithm design, and human-computer interaction.',
      subjects: [
        { name: 'Intelligent Systems', theme: 'AI', tag: 'AI & Heuristics' },
        { name: 'Distributed Systems', theme: 'Networks', tag: 'Distributed Tech' },
        { name: 'Computer Architecture', theme: 'Systems', tag: 'Advanced Arch' },
        { name: 'Algorithm Design', theme: 'Programming', tag: 'Advanced Algos' },
        { name: 'Software Engineering II', theme: 'Programming', tag: 'Engineering' },
        { name: 'Human-Computer Interaction I', theme: 'AI', tag: 'UI / UX' },
        { name: 'Professional Aspects of Computing', theme: 'Management', tag: 'Ethics & Law' }
      ]
    },
    {
      id: 'year-2',
      year: '2025-26',
      title: 'Year 2: Core Systems, Algorithms & Engineering',
      status: 'passed',
      statusLabel: 'Passed · 100% of Subjects Completed',
      institution: 'Escuela Superior de Ingeniería Informática (ESII) · UCLM',
      location: 'Albacete, Spain',
      description: 'Successfully passed every single subject of the second year, mastering operating system kernels, concurrency, datapath organization, relational databases, and algorithm complexity.',
      subjects: [
        { name: 'Operating Systems I', theme: 'Systems', tag: 'Kernels & Process' },
        { name: 'Computer Organization', theme: 'Systems', tag: 'RISC-V Datapath' },
        { name: 'Data Structures & Algorithms', theme: 'Programming', tag: 'Complexity' },
        { name: 'Concurrent & Real-Time Programming', theme: 'Systems', tag: 'Mutex & Threads' },
        { name: 'Databases', theme: 'Systems', tag: 'SQL & Relational' },
        { name: 'Software Engineering I', theme: 'Programming', tag: 'Architecture' },
        { name: 'Statistics & Numerical Methods', theme: 'Math', tag: 'Data Science' }
      ]
    },
    {
      id: 'year-1',
      year: '2024-25',
      title: 'Year 1: Mathematical Foundations & Hardware Basics',
      status: 'passed',
      statusLabel: 'Passed · 100% of Subjects Completed',
      institution: 'Escuela Superior de Ingeniería Informática (ESII) · UCLM',
      location: 'Albacete, Spain',
      description: 'Completed foundational coursework in discrete mathematics, calculus, linear algebra, logic circuits, and fundamental procedural programming.',
      subjects: [
        { name: 'Fundamentals of Programming I & II', theme: 'Programming', tag: 'C & Algorithmic' },
        { name: 'Computer Fundamentals', theme: 'Systems', tag: 'Digital Logic' },
        { name: 'Calculus & Numerical Analysis', theme: 'Math', tag: 'Mathematics' },
        { name: 'Discrete Mathematics', theme: 'Math', tag: 'Graph Theory' },
        { name: 'Linear Algebra', theme: 'Math', tag: 'Matrices & Vectors' },
        { name: 'Physics for Computing', theme: 'Systems', tag: 'Circuits' }
      ]
    }
  ],
  skills: [
    {
      id: 'systems',
      title: 'Systems & Low-Level Programming',
      subtitle: 'Native architecture, desktop tooling, memory management, and binary archive inspection',
      skills: [
        { name: 'C# / .NET 10', highlight: true, note: 'nup-extractor' },
        { name: 'Rust', highlight: true, note: 'Switch-1-extractor' },
        { name: 'C', highlight: true, note: 'Operating Systems & Schedulers' },
        { name: 'RISC-V Assembly', highlight: true, note: 'Datapath & 2D Engine' },
        { name: 'Reverse Engineering', note: 'Container specs & clean-room formats' },
        { name: 'Concurrency & Threads', note: 'Mutexes, semaphores & sync' },
        { name: 'Memory Management', note: 'Pointers, buffers & zero-copy' },
        { name: 'Win32 API & Avalonia' }
      ]
    },
    {
      id: 'web',
      title: 'Full-Stack & Modern Web',
      subtitle: 'Component-driven frontends, reactive interfaces, and scalable API services',
      skills: [
        { name: 'TypeScript', highlight: true },
        { name: 'Next.js 15 (App Router)', highlight: true, note: 'FrameVault flagship' },
        { name: 'React 18', highlight: true },
        { name: 'Node.js & Express', highlight: true },
        { name: 'Tailwind CSS', highlight: true },
        { name: 'RESTful API Architecture' },
        { name: 'JWT & Session Security' },
        { name: 'Vite & Frontend Tooling' },
        { name: 'HTML5 / Modern CSS' }
      ]
    },
    {
      id: 'database',
      title: 'Databases & Backend Infrastructure',
      subtitle: 'Relational data modeling, ORM workflows, and embedded persistence',
      skills: [
        { name: 'PostgreSQL', highlight: true, note: 'Supabase production' },
        { name: 'Supabase', highlight: true },
        { name: 'Prisma ORM', highlight: true },
        { name: 'MongoDB & Mongoose' },
        { name: 'SQLite', note: 'Local desktop & bots' },
        { name: 'Redis Cache' },
        { name: 'Database Normalization' },
        { name: 'Data Pipeline Design' }
      ]
    },
    {
      id: 'tools',
      title: 'Tools, Workflows & Reverse Engineering',
      subtitle: 'Developer efficiency, version control, build systems, and binary analysis',
      skills: [
        { name: 'Git & GitHub Actions', highlight: true },
        { name: 'Hex Editors (ImHex, 010)', highlight: true },
        { name: 'Linux / Bash' },
        { name: 'Visual Studio & VS Code' },
        { name: 'Docker Containers' },
        { name: 'Postman / API Testing' },
        { name: 'Figma UI Design' }
      ]
    }
  ],
  cta: {
    title: "Let's Build",
    titleHighlight: "Something Amazing",
    subtitle: "Whether you have an internship opportunity, a systems challenge, or an innovative full-stack project in mind, I am ready to build with you.",
    buttonText: "Send",
    avatarUrl: "/images/soulaimane-3d.png?v=2"
  },
  contact: {
    title: "Let's Talk About Your Idea",
    subtitle: "Have a project in mind, an internship opportunity, or want to collaborate on systems engineering? Drop me a message or connect through any of my channels.",
    email: "ssolayman244@gmail.com",
    location: "Albacete, Spain (CET / GMT+1)",
    status: "Available for Software Engineering Roles (2026/27)",
    social: {
      github: "https://github.com/SPIN0ZAi",
      linkedin: "https://www.linkedin.com/in/soulaimane-ben-louaret-98471428b/",
      email: "mailto:ssolayman244@gmail.com",
      twitter: "https://twitter.com/SPIN0ZAi",
      discord: "https://discord.com"
    }
  },
  theme: {
    primaryColor: '#FF0000',
    crimsonColor: '#950101',
    maroonColor: '#3D0000',
    backgroundColor: '#000000',
    glowIntensity: 75,
    showDotMatrix: true
  }
};

const STORAGE_KEY = 'soulaimane_portfolio_custom_v1';
const AUTH_KEY = 'soulaimane_admin_auth_v1';
const MESSAGES_KEY = 'soulaimane_contact_inquiries_v1';
const CUSTOM_HASH_KEY = 'soulaimane_custom_auth_hash';

// Salted cryptographic hash of master key (prevents plaintext exposure in source)
const MASTER_SALT = 'soulaimane_spinoza_portfolio_secure_salt_2026_';
const MASTER_AUTH_HASH = '5abb1feba218bb7e03417e8089e55160deb228f87796c7d687c4f8dcc966f43f';

async function computeSha256(text: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

interface PortfolioContextType {
  data: PortfolioData;
  isAdmin: boolean;
  messages: ContactMessage[];
  login: (pass: string) => Promise<boolean>;
  logout: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => Promise<boolean>;
  updateHero: (hero: Partial<HeroData>) => void;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  updateCta: (cta: Partial<CtaData>) => void;
  updateContact: (contact: Partial<ContactData>) => void;
  updateAchievements: (achievements: Partial<AchievementsData>) => void;
  // Projects CRUD
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  // Journey CRUD
  addJourneyStep: (step: Omit<JourneyItem, 'id'>) => void;
  updateJourneyStep: (id: string, step: Partial<JourneyItem>) => void;
  deleteJourneyStep: (id: string) => void;
  // Achievements CRUD
  addAchievementItem: (item: Omit<AchievementItem, 'id'>) => void;
  updateAchievementItem: (id: string, item: Partial<AchievementItem>) => void;
  deleteAchievementItem: (id: string) => void;
  // Education CRUD
  updateEducation: (years: AcademicYearItem[]) => void;
  // Skills CRUD
  updateSkills: (groups: SkillGroupItem[]) => void;
  // Inquiries / Messages
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  deleteMessage: (id: string) => void;
  markMessageRead: (id: string) => void;
  // Backup & Reset
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultPortfolioData, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio data', e);
    }
    return defaultPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (session && session.authenticated && session.expiresAt && Date.now() < session.expiresAt) {
        return true;
      }
      localStorage.removeItem(AUTH_KEY);
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
    return false;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const savedMsgs = localStorage.getItem(MESSAGES_KEY);
      if (savedMsgs) {
        return JSON.parse(savedMsgs);
      }
    } catch (e) {
      console.warn('Failed to parse messages', e);
    }
    return [
      {
        id: 'msg-demo-1',
        name: 'Technical Recruiter',
        email: 'talent@techfirm.eu',
        subject: 'Software Engineering Internship - Summer 2026',
        message: 'Hello Soulaimane, we came across your nup-extractor and systems projects. We would love to discuss opportunities with you!',
        createdAt: new Date().toISOString(),
        isRead: false
      }
    ];
  });

  // Save changes to localStorage whenever data updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages to localStorage', e);
    }
  }, [messages]);

  // Apply theme root variables
  useEffect(() => {
    const root = document.documentElement;
    if (data.theme) {
      root.style.setProperty('--color-primary-red', data.theme.primaryColor || '#FF0000');
      root.style.setProperty('--color-crimson', data.theme.crimsonColor || '#950101');
      root.style.setProperty('--color-maroon', data.theme.maroonColor || '#3D0000');
      root.style.setProperty('--color-bg-black', data.theme.backgroundColor || '#000000');
    }
  }, [data.theme]);

  // Secure Cryptographic Authentication
  const login = async (pass: string): Promise<boolean> => {
    if (!pass || typeof pass !== 'string') return false;

    // Artificial timing delay against high-speed automated brute-force scripts
    await new Promise((r) => setTimeout(r, 350));

    try {
      const computed = await computeSha256(MASTER_SALT + pass);
      const customHash = localStorage.getItem(CUSTOM_HASH_KEY);
      const targetHash = customHash || MASTER_AUTH_HASH;

      if (computed === targetHash) {
        setIsAdmin(true);
        const session = {
          authenticated: true,
          ts: Date.now(),
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
          token: 'sec_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
        };
        try {
          localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        } catch {}
        return true;
      }
    } catch (e) {
      console.error('Crypto error during authentication', e);
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  const changeAdminPassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    if (!newPass || newPass.length < 8) return false;
    const isOldValid = await login(oldPass);
    if (!isOldValid) return false;
    const newHash = await computeSha256(MASTER_SALT + newPass);
    try {
      localStorage.setItem(CUSTOM_HASH_KEY, newHash);
    } catch {}
    return true;
  };

  const updateHero = (hero: Partial<HeroData>) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero }
    }));
  };

  const updateTheme = (theme: Partial<ThemeSettings>) => {
    setData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...theme }
    }));
  };

  const updateCta = (cta: Partial<CtaData>) => {
    setData((prev) => ({
      ...prev,
      cta: { ...prev.cta, ...cta }
    }));
  };

  const updateContact = (contact: Partial<ContactData>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contact }
    }));
  };

  const updateAchievements = (achievements: Partial<AchievementsData>) => {
    setData((prev) => ({
      ...prev,
      achievements: { ...prev.achievements, ...achievements }
    }));
  };

  // Projects CRUD
  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const id = project.repoName.toLowerCase().replace(/[^a-z0-9]/g, '-') || `project-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      projects: [{ ...project, id }, ...prev.projects]
    }));
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  // Journey CRUD
  const addJourneyStep = (step: Omit<JourneyItem, 'id'>) => {
    const id = `journey-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      journey: [...prev.journey, { ...step, id }]
    }));
  };

  const updateJourneyStep = (id: string, updated: Partial<JourneyItem>) => {
    setData((prev) => ({
      ...prev,
      journey: prev.journey.map((j) => (j.id === id ? { ...j, ...updated } : j))
    }));
  };

  const deleteJourneyStep = (id: string) => {
    setData((prev) => ({
      ...prev,
      journey: prev.journey.filter((j) => j.id !== id)
    }));
  };

  // Achievements CRUD
  const addAchievementItem = (item: Omit<AchievementItem, 'id'>) => {
    const id = `ach-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: [...prev.achievements.items, { ...item, id }]
      }
    }));
  };

  const updateAchievementItem = (id: string, updated: Partial<AchievementItem>) => {
    setData((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: prev.achievements.items.map((a) => (a.id === id ? { ...a, ...updated } : a))
      }
    }));
  };

  const deleteAchievementItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: prev.achievements.items.filter((a) => a.id !== id)
      }
    }));
  };

  // Education
  const updateEducation = (years: AcademicYearItem[]) => {
    setData((prev) => ({
      ...prev,
      education: years
    }));
  };

  // Skills
  const updateSkills = (groups: SkillGroupItem[]) => {
    setData((prev) => ({
      ...prev,
      skills: groups
    }));
  };

  // Messages
  const addMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
  };

  // Backup & Reset
  const exportDataJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setData({ ...defaultPortfolioData, ...parsed });
        return true;
      }
    } catch (e) {
      console.error('Import failed', e);
    }
    return false;
  };

  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        messages,
        login,
        logout,
        changeAdminPassword,
        updateHero,
        updateTheme,
        updateCta,
        updateContact,
        updateAchievements,
        addProject,
        updateProject,
        deleteProject,
        addJourneyStep,
        updateJourneyStep,
        deleteJourneyStep,
        addAchievementItem,
        updateAchievementItem,
        deleteAchievementItem,
        updateEducation,
        updateSkills,
        addMessage,
        deleteMessage,
        markMessageRead,
        exportDataJson,
        importDataJson,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
