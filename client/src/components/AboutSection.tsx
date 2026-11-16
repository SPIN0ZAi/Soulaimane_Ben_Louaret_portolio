import { motion } from 'framer-motion';
import {
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Star,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutSection() {
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
    <section id="about" className="py-24 relative scroll-mt-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0000]">
            // PROFILE &amp; IDENTITY
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Who Am I
          </h2>
          <p className="text-sm text-zinc-400">
            Engineering background, systems mindset, and academic trajectory.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Developer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl bg-[#080202] border border-[#3D0000] p-6 flex flex-col justify-between overflow-hidden relative shadow-2xl hover:border-[#950101] transition-colors"
          >
            <div className="space-y-6">
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-black border border-[#3D0000]">
                <img
                  src="/images/profile-photo.png"
                  alt="Soulaimane Ben Louaret Portrait"
                  className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080202] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-black/90 text-white border border-[#950101] backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
                    <span>UCLM · 3rd Year</span>
                  </span>

                  <span className="text-xs font-mono text-zinc-400 bg-black/80 px-2.5 py-1 rounded-full border border-[#3D0000]">
                    Albacete, ES
                  </span>
                </div>
              </div>

              {/* Bio snippet */}
              <div className="space-y-2">
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                  Soulaimane Ben Louaret
                </h3>
                <p className="text-xs font-mono text-[#FF0000] font-semibold">
                  Systems Developer &amp; Computer Science Student
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                  <span>Escuela Superior de Ingeniería Informática (UCLM)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#3D0000] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">GITHUB: @SPIN0ZAi</span>
              <a
                href="https://github.com/SPIN0ZAi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#FF0000] transition-colors"
              >
                <span>View Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl bg-[#080202] border border-[#3D0000] p-8 flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden hover:border-[#950101] transition-colors"
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#FF0000] tracking-wider uppercase font-semibold">
                  // THE ENGINEERING PERSPECTIVE
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Bridging low-level systems precision with modern full-stack application craft.
                </h3>
              </div>

              <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
                <p>
                  I am a 3rd-year Computer Science student at <span className="text-white font-semibold">Universidad de Castilla-La Mancha</span> (ESII Albacete). Having cleared 100% of my coursework in Years 1 and 2 without backlogs, my work spans deep systems programming, reverse engineering, and full-stack web platforms.
                </p>
                <p>
                  I authored <span className="text-[#FF0000] font-mono font-medium">nup-extractor</span> (57+ stars), a native GUI for Nintendo Switch 1 &amp; 2 clean-room archives, built <span className="text-[#FF0000] font-mono font-medium">Switch-1-extractor</span> in Rust with BKTR delta merging, and designed <span className="text-[#FF0000] font-mono font-medium">FrameVault</span>, a full-stack social film platform with Next.js 15, Prisma, and Supabase.
                </p>
              </div>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#3D0000]/25 border border-[#3D0000]">
                  <div className="flex items-center gap-1.5 text-2xl font-mono font-black text-[#FF0000]">
                    <Star className="w-5 h-5 fill-[#FF0000] text-[#FF0000]" />
                    <span>57+</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-sans mt-1">
                    Stars on nup-extractor
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#3D0000]/25 border border-[#3D0000]">
                  <div className="flex items-center gap-1.5 text-2xl font-mono font-black text-[#FF0000]">
                    <ShieldCheck className="w-5 h-5" />
                    <span>100%</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-sans mt-1">
                    Pass rate (Years 1 &amp; 2)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#3D0000]/25 border border-[#3D0000]">
                  <div className="text-2xl font-mono font-black text-[#FF0000]">
                    3rd Year
                  </div>
                  <div className="text-xs text-zinc-400 font-sans mt-1">
                    UCLM CS (2026–27)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#3D0000]/25 border border-[#3D0000]">
                  <div className="text-2xl font-mono font-black text-[#ff4d4d]">
                    27
                  </div>
                  <div className="text-xs text-zinc-400 font-sans mt-1">
                    CS Modules Completed / Active
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#3D0000]">
              <Button
                className="rounded-full px-6 font-semibold bg-[#FF0000] text-white hover:bg-[#d60000]"
                onClick={() => scrollTo('#education')}
              >
                <span>View Academic Record</span>
                <GraduationCap className="w-4 h-4 ml-1.5" />
              </Button>

              <Button
                variant="outline"
                className="rounded-full px-6 font-semibold border-[#3D0000] bg-[#3D0000]/30 text-zinc-200 hover:bg-[#3D0000]"
                onClick={() => scrollTo('#contact')}
              >
                <span>Contact Me</span>
              </Button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
