import { motion } from 'framer-motion';
import {
  Binary,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Binary;
  tags: string[];
}

const steps: ProcessStep[] = [
  {
    step: '01',
    title: 'Format Specification & Analysis',
    subtitle: 'Clean-room reverse engineering & container inspection',
    description: 'Deconstructing complex binary container formats (.nup, NSP, XCI, NCA). Analyzing memory layouts, endianness, header checksums, and directory structures with clean-room discipline.',
    icon: Binary,
    tags: ['Binary Parsing', 'Header Inspection', 'Format Specs'],
  },
  {
    step: '02',
    title: 'High-Throughput Systems Architecture',
    subtitle: 'Zero-copy pipelines & algorithm optimization',
    description: 'Engineering native desktop engines in Rust and C# (.NET 10). Implementing BKTR delta merging algorithms, memory-mapped I/O, asynchronous worker threads, and low latency extraction.',
    icon: Cpu,
    tags: ['Rust / C#', 'BKTR Merging', 'Zero-Copy I/O'],
  },
  {
    step: '03',
    title: 'Modern Full-Stack Execution',
    subtitle: 'Reactive interfaces & relational persistence',
    description: 'Building cinematic, user-centric web platforms like FrameVault. Implementing Next.js 15 App Router, type-safe Prisma models, Supabase PostgreSQL with RLS, and responsive layouts.',
    icon: Layers,
    tags: ['Next.js 15', 'Prisma / Supabase', 'Tailwind CSS'],
  },
  {
    step: '04',
    title: 'Verification, Testing & Open Source',
    subtitle: 'Cryptographic integrity & public releases',
    description: 'Guaranteeing data integrity through automated SHA-256 cryptographic verification, benchmark profiling, clean documentation, and transparent open-source releases on GitHub.',
    icon: ShieldCheck,
    tags: ['SHA-256 Verification', 'Benchmarking', 'Open Source'],
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 relative scroll-mt-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0000]">
            // 02 · METHODOLOGY
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Engineering Process
          </h2>
          <p className="text-sm text-zinc-400">
            A systematic engineering lifecycle from binary deconstruction to production-grade deployment.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group rounded-3xl bg-[#080202] border border-[#3D0000] hover:border-[#950101] p-6 flex flex-col justify-between space-y-6 transition-all duration-300 relative overflow-hidden shadow-xl"
              >
                {/* Step Number Top */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-zinc-600 group-hover:text-[#FF0000] transition-colors">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-[#3D0000]/30 text-zinc-300 group-hover:text-[#FF0000] group-hover:bg-[#3D0000]/80 border border-[#3D0000] transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#FF0000] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-[#3D0000] flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#3D0000]/25 text-zinc-400 border border-[#3D0000]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
