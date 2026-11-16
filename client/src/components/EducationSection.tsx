import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  ChevronDown,
  Building2
} from 'lucide-react';

interface Subject {
  name: string;
  theme: 'Systems' | 'Programming' | 'Math' | 'Networks' | 'AI' | 'Management';
  tag?: string;
}

interface AcademicYear {
  id: string;
  year: string;
  title: string;
  status: 'in-progress' | 'passed';
  statusLabel: string;
  institution: string;
  location: string;
  description: string;
  subjects: Subject[];
}

const academicYears: AcademicYear[] = [
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
      { name: 'Professional Aspects of Computing', theme: 'Management', tag: 'Ethics & Law' },
    ],
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
      { name: 'Concurrent and Real-Time Programming', theme: 'Systems', tag: 'Threads & Sync' },
      { name: 'Data Structures', theme: 'Programming', tag: 'Trees, Graphs, Queues' },
      { name: 'Algorithms Analysis and Design', theme: 'Programming', tag: 'Big-O & Optimization' },
      { name: 'Databases', theme: 'Programming', tag: 'SQL & Relational Models' },
      { name: 'Software Engineering I', theme: 'Programming', tag: 'UML & Lifecycles' },
      { name: 'Computer Networks II', theme: 'Networks', tag: 'Routing & Protocols' },
      { name: 'Logic', theme: 'Math', tag: 'Formal Proofs & Boolean' },
      { name: 'Statistics', theme: 'Math', tag: 'Probability & Regression' },
    ],
  },
  {
    id: 'year-1',
    year: '2024-25',
    title: 'Year 1: Foundations of Computing & Engineering',
    status: 'passed',
    statusLabel: 'Passed · 100% of Subjects Completed',
    institution: 'Escuela Superior de Ingeniería Informática (ESII) · UCLM',
    location: 'Albacete, Spain',
    description: 'Successfully passed all foundational first-year engineering coursework in calculus, discrete mathematics, digital hardware technology, networking fundamentals, and programming.',
    subjects: [
      { name: 'Programming Fundamentals I', theme: 'Programming', tag: 'Intro to Code' },
      { name: 'Programming Fundamentals II', theme: 'Programming', tag: 'OOP & Modular' },
      { name: 'Computer Architecture Fundamentals', theme: 'Systems', tag: 'Hardware Basics' },
      { name: 'Computer Technology (Tecnología de Computadores)', theme: 'Systems', tag: 'Digital Circuits' },
      { name: 'Computer Networks I', theme: 'Networks', tag: 'Network Layers' },
      { name: 'Information Systems', theme: 'Programming', tag: 'Data Flows' },
      { name: 'Calculus and Numerical Methods', theme: 'Math', tag: 'Calculus' },
      { name: 'Algebra and Discrete Mathematics', theme: 'Math', tag: 'Discrete Math' },
      { name: 'Physics for Computing Science', theme: 'Math', tag: 'Electromagnetism' },
      { name: 'Business Management Fundamentals', theme: 'Management', tag: 'Economics' },
    ],
  },
];

const themeStyles: Record<Subject['theme'], { badge: string; dot: string }> = {
  Systems: {
    badge: 'bg-[#3D0000]/40 text-[#ff4d4d] border-[#3D0000]',
    dot: 'bg-[#FF0000]',
  },
  Programming: {
    badge: 'bg-[#3D0000]/40 text-zinc-200 border-[#3D0000]',
    dot: 'bg-[#FF0000]',
  },
  Math: {
    badge: 'bg-[#3D0000]/40 text-zinc-300 border-[#3D0000]',
    dot: 'bg-[#950101]',
  },
  Networks: {
    badge: 'bg-[#3D0000]/40 text-[#ff6666] border-[#3D0000]',
    dot: 'bg-[#FF0000]',
  },
  AI: {
    badge: 'bg-[#3D0000]/40 text-[#FF0000] border-[#950101]',
    dot: 'bg-[#FF0000]',
  },
  Management: {
    badge: 'bg-[#3D0000]/40 text-zinc-400 border-[#3D0000]',
    dot: 'bg-zinc-500',
  },
};

export default function EducationSection() {
  const [expandedYear, setExpandedYear] = useState<string>('year-3');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const themes: Array<{ label: string; value: string }> = [
    { label: 'All Subjects', value: 'all' },
    { label: 'Systems & Architecture', value: 'Systems' },
    { label: 'Programming & Software', value: 'Programming' },
    { label: 'Math & Theory', value: 'Math' },
    { label: 'Networks & Dist.', value: 'Networks' },
    { label: 'AI & Heuristics', value: 'AI' },
  ];

  return (
    <section id="education" className="py-24 relative scroll-mt-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0000]">
            // 03 · ACADEMIC PROGRESSION
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Education &amp; Coursework
          </h2>
          <p className="text-sm text-zinc-400">
            Bachelor of Science in Computer Science at <span className="text-white font-semibold">Universidad de Castilla-La Mancha</span> (ESII Albacete). All subjects in Years 1 &amp; 2 completed and passed.
          </p>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#080202] border border-[#3D0000] flex items-center gap-4 hover:border-[#950101] transition-colors">
            <div className="p-3 rounded-xl bg-[#3D0000]/50 text-[#FF0000] border border-[#3D0000] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-xl text-white">100% Passed</div>
              <div className="text-xs text-zinc-400">Years 1 &amp; 2 Cleared (All Subjects)</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#080202] border border-[#3D0000] flex items-center gap-4 hover:border-[#950101] transition-colors">
            <div className="p-3 rounded-xl bg-[#3D0000]/50 text-[#FF0000] border border-[#3D0000] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-xl text-white">3rd Year Active</div>
              <div className="text-xs text-zinc-400">2026–2027 Academic Year</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#080202] border border-[#3D0000] flex items-center gap-4 hover:border-[#950101] transition-colors">
            <div className="p-3 rounded-xl bg-[#3D0000]/50 text-[#FF0000] border border-[#3D0000] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-xl text-white">ESII · UCLM</div>
              <div className="text-xs text-zinc-400">Albacete Campus, Spain</div>
            </div>
          </div>
        </div>

        {/* Theme Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-mono text-zinc-500 mr-1">Filter theme:</span>
          {themes.map((th) => (
            <button
              key={th.value}
              onClick={() => setSelectedTheme(th.value)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                selectedTheme === th.value
                  ? 'bg-[#FF0000] text-white font-bold shadow-md shadow-[#FF0000]/25'
                  : 'bg-[#3D0000]/25 hover:bg-[#3D0000]/60 text-zinc-400 hover:text-white border border-[#3D0000]'
              }`}
            >
              {th.label}
            </button>
          ))}
        </div>

        {/* Timeline List Accordion */}
        <div className="space-y-6">
          {academicYears.map((ay) => {
            const isExpanded = expandedYear === ay.id;
            const filteredSubjects =
              selectedTheme === 'all'
                ? ay.subjects
                : ay.subjects.filter((s) => s.theme === selectedTheme);

            return (
              <motion.div
                key={ay.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  ay.status === 'in-progress'
                    ? 'bg-[#080202] border-[#950101] shadow-2xl shadow-black/80'
                    : 'bg-[#080202] border-[#3D0000] hover:border-[#950101]'
                }`}
              >
                {/* Year Header / Trigger */}
                <button
                  onClick={() => setExpandedYear(isExpanded ? '' : ay.id)}
                  className="w-full p-6 sm:p-8 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-2xl shrink-0 mt-1 ${
                        ay.status === 'in-progress'
                          ? 'bg-[#FF0000]/15 text-[#FF0000] border border-[#FF0000]/30'
                          : 'bg-[#3D0000]/40 text-[#FF0000] border border-[#3D0000]'
                      }`}
                    >
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#FF0000] uppercase tracking-wider">
                          {ay.year}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold ${
                            ay.status === 'in-progress'
                              ? 'bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/40'
                              : 'bg-[#3D0000]/40 text-zinc-300 border border-[#3D0000]'
                          }`}
                        >
                          {ay.statusLabel}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                        {ay.title}
                      </h3>

                      <p className="text-xs text-zinc-400 font-mono">
                        {ay.institution} · {ay.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-xs font-mono text-zinc-400">
                      {filteredSubjects.length} subjects
                    </span>
                    <div
                      className={`p-2 rounded-full border border-[#3D0000] bg-[#3D0000]/30 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[#FF0000]' : 'text-zinc-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Subjects Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[#3D0000] px-6 sm:px-8 py-6 space-y-6"
                    >
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {ay.description}
                      </p>

                      {filteredSubjects.length === 0 ? (
                        <p className="text-xs text-zinc-500 italic py-2">
                          No subjects in this year match the selected theme.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {filteredSubjects.map((subject, sIdx) => {
                            const style = themeStyles[subject.theme];
                            return (
                              <div
                                key={sIdx}
                                className="p-3.5 rounded-2xl bg-black/60 border border-[#3D0000] flex items-center justify-between gap-3 hover:border-[#950101] transition-colors"
                              >
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                                    />
                                    <span className="font-heading font-bold text-xs sm:text-sm text-white">
                                      {subject.name}
                                    </span>
                                  </div>
                                  {subject.tag && (
                                    <p className="text-[11px] font-mono text-zinc-400 pl-3.5">
                                      {subject.tag}
                                    </p>
                                  )}
                                </div>

                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 ${style.badge}`}
                                >
                                  {subject.theme}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
