import { motion } from 'framer-motion';
import {
  Cpu,
  Code2,
  Database,
  Terminal,
} from 'lucide-react';

interface SkillGroup {
  title: string;
  subtitle: string;
  icon: typeof Cpu;
  skills: Array<{ name: string; highlight?: boolean; note?: string }>;
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Systems & Low-Level Programming',
    subtitle: 'Native architecture, desktop tooling, memory management, and binary archive inspection',
    icon: Cpu,
    skills: [
      { name: 'C# / .NET 10', highlight: true, note: 'nup-extractor' },
      { name: 'Rust', highlight: true, note: 'Switch-1-extractor' },
      { name: 'C', highlight: true, note: 'Operating Systems & Schedulers' },
      { name: 'RISC-V Assembly', highlight: true, note: 'Datapath & 2D Engine' },
      { name: 'Reverse Engineering', note: 'Container specs & clean-room formats' },
      { name: 'Concurrency & Threads', note: 'Mutexes, semaphores & sync' },
      { name: 'Memory Management', note: 'Pointers, buffers & zero-copy' },
      { name: 'Win32 API & Avalonia' },
    ],
  },
  {
    title: 'Full-Stack & Modern Web',
    subtitle: 'Component-driven frontends, reactive interfaces, and scalable API services',
    icon: Code2,
    skills: [
      { name: 'TypeScript', highlight: true },
      { name: 'Next.js 15 (App Router)', highlight: true, note: 'FrameVault flagship' },
      { name: 'React 18', highlight: true },
      { name: 'Node.js & Express', highlight: true },
      { name: 'Tailwind CSS', highlight: true },
      { name: 'RESTful API Architecture' },
      { name: 'JWT & Session Security' },
      { name: 'Vite & Frontend Tooling' },
      { name: 'HTML5 / Modern CSS' },
    ],
  },
  {
    title: 'Databases & Backend Infrastructure',
    subtitle: 'Relational data modeling, ORM workflows, and embedded persistence',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', highlight: true, note: 'Supabase production' },
      { name: 'Supabase', highlight: true },
      { name: 'Prisma ORM', highlight: true },
      { name: 'MongoDB & Mongoose' },
      { name: 'SQLite', note: 'Local desktop & bots' },
      { name: 'Redis Cache' },
      { name: 'Database Normalization' },
      { name: 'Data Pipeline Design' },
    ],
  },
  {
    title: 'Algorithms, Theory & Developer Tools',
    subtitle: 'Formal computer science foundations, version control, and Unix environments',
    icon: Terminal,
    skills: [
      { name: 'Data Structures & Algorithms', highlight: true, note: 'Trees, Graphs, Search' },
      { name: 'Intelligent Systems & AI', note: 'A*, heuristics & state space' },
      { name: 'Distributed Systems' },
      { name: 'Git & GitHub Workflows' },
      { name: 'Docker & Containers' },
      { name: 'Linux / WSL & Bash' },
      { name: 'FFmpeg & Transcoding' },
      { name: 'Unit Testing & Benchmarking' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative scroll-mt-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0000]">
            // 04 · CAPABILITIES &amp; STACK
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Technical Stack
          </h2>
          <p className="text-sm text-zinc-400">
            Systems engineering languages, full-stack frameworks, databases, and theoretical computer science tooling.
          </p>
        </div>

        {/* 4 Bento Group Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="rounded-3xl bg-[#080202] border border-[#3D0000] hover:border-[#950101] p-7 space-y-6 shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-[#3D0000]/40 text-[#FF0000] border border-[#3D0000]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-white">
                        {group.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                          skill.highlight
                            ? 'bg-[#3D0000]/50 text-white font-semibold border border-[#950101] shadow-sm'
                            : 'bg-black/80 text-zinc-300 border border-[#3D0000]'
                        }`}
                      >
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
                        )}
                        <span>{skill.name}</span>
                        {skill.note && (
                          <span className="text-[10px] text-zinc-400 pl-1 font-sans">
                            ({skill.note})
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3D0000] flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>{group.skills.length} Capabilities</span>
                  <span className="text-[#FF0000]">Verified via projects</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
