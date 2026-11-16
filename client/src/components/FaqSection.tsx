import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: 'Roles & Timing',
    question: 'What kind of opportunities are you looking for in 2026/27?',
    answer: 'I am actively seeking software engineering internships, junior systems developer positions, and full-stack software roles starting in 2026/2027. I am eager to contribute to high-performance infrastructure, native tooling, and modern web platforms.',
  },
  {
    category: 'Technical Focus',
    question: 'What are your core engineering strengths?',
    answer: 'My strengths lie at the intersection of low-level systems programming (Rust, C#, C, Win32, reverse engineering) and modern full-stack web applications (Next.js 15, TypeScript, Prisma, PostgreSQL). I have strong foundations in computer architecture, memory models, algorithms, and concurrent programming.',
  },
  {
    category: 'Academic Background',
    question: 'What is your current academic status at UCLM?',
    answer: 'I am in my 3rd year (2026–2027) of the Computer Science Degree at Universidad de Castilla-La Mancha (ESII Albacete). I have successfully completed and passed 100% of the subjects from Years 1 and 2 without backlogs, building on a prior two-year foundation in Science & Technology from FST Tanger.',
  },
  {
    category: 'Location & Remote',
    question: 'Where are you based and are you open to relocation or remote work?',
    answer: 'I am based in Albacete, Spain (Central European Time / GMT+1). I am fully available for remote roles worldwide, and open to on-site relocation for summer internships or full-time opportunities.',
  },
  {
    category: 'Open Source',
    question: 'Are your projects open source and where can I view the code?',
    answer: 'Yes! All my major projects—including nup-extractor, Switch-1-extractor, FrameVault, and Cognitia—are open-source and hosted on my GitHub profile at github.com/SPIN0ZAi with full commit histories and documentation.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
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
    <section className="py-24 relative scroll-mt-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0000]">
            // 05 · QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-400">
            Key details about availability, technical focus, and collaboration.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left CTA Card */}
          <div className="lg:col-span-4 rounded-3xl bg-[#080202] border border-[#3D0000] p-7 space-y-6 shadow-xl">
            <div className="p-3 rounded-2xl bg-[#3D0000]/40 text-[#FF0000] border border-[#3D0000] w-fit">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                Have a different question?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Feel free to reach out directly via email or LinkedIn. I am always open to discussing new projects, internships, or engineering challenges.
              </p>
            </div>

            <Button
              className="w-full rounded-full font-bold bg-[#FF0000] text-white hover:bg-[#d60000] shadow-md shadow-[#FF0000]/25"
              onClick={scrollToContact}
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#0e0303] border-[#950101] shadow-lg'
                      : 'bg-[#080202] border-[#3D0000] hover:border-[#950101]'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#FF0000] font-semibold tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                        {item.question}
                      </h4>
                    </div>

                    <div
                      className={`p-2 rounded-full shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#3D0000]/60 text-[#FF0000] rotate-180'
                          : 'bg-[#3D0000]/25 text-zinc-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-[#3D0000]"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
