import { motion } from 'framer-motion';
import {
  Cpu,
  Code2,
  Database,
  Terminal,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const groupIcons = [Cpu, Code2, Database, Terminal];

export default function SkillsSection() {
  const { data } = usePortfolio();
  const groups = data.skills;

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

        {/* Bento Group Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group, idx) => {
            const Icon = groupIcons[idx % groupIcons.length] || Cpu;
            return (
              <motion.div
                key={group.id || group.title}
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
                      <p className="text-xs text-zinc-400 font-mono">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-colors inline-flex items-center gap-1.5 ${
                          skill.highlight
                            ? 'bg-[#3D0000]/40 text-white border-[#FF0000]/50 shadow-[0_0_12px_rgba(255,0,0,0.15)]'
                            : 'bg-[#0f0404] text-zinc-300 border-[#3D0000] hover:border-zinc-700'
                        }`}
                      >
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
                        )}
                        <span>{skill.name}</span>
                        {skill.note && (
                          <span className="text-[10px] text-zinc-500 font-sans">
                            · {skill.note}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom line hint */}
                <div className="pt-4 border-t border-[#3D0000]/50 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{group.skills.length} Capabilities</span>
                  <span className="text-[#FF0000]">Verified in Production</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
