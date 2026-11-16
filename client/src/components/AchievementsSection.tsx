import { useState } from 'react';
import { motion } from 'framer-motion';
import DotMatrix from './ui/DotMatrix';
import CropBox from './ui/CropBox';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AchievementsSection() {
  const { data } = usePortfolio();
  const achievementsData = data.achievements;
  const items = achievementsData.items && achievementsData.items.length > 0 ? achievementsData.items : [];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="achievements" className="py-28 relative scroll-mt-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header - Styled matching Stygar "Our Achievements :::" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center">
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
                {achievementsData.title || 'My Achievements'}
              </h2>
              <DotMatrix />
            </div>
            <p className="text-sm text-zinc-400 font-sans">
              {achievementsData.subtitle || 'Key milestones across academic performance, open-source adoption, and systems software engineering.'}
            </p>
          </div>
        </div>

        {/* 2-Column Layout matching Image 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Stylized Year Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center space-y-2 select-none">
            <div className="flex items-center gap-4">
              <span className="font-heading font-black text-7xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-[#FF0000] via-[#950101] to-[#3D0000] leading-none tracking-tighter">
                {achievementsData.year1 || '20'}
              </span>
              <DotMatrix className="scale-125" />
            </div>

            <div className="flex items-center gap-4 pl-8 sm:pl-12">
              <DotMatrix className="scale-125" />
              <span className="font-heading font-black text-7xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-[#FF0000] via-[#950101] to-[#3D0000] leading-none tracking-tighter">
                {achievementsData.year2 || '27'}
              </span>
            </div>

            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest pt-4 pl-2">
              UCLM Academic Track · 2024 — {achievementsData.year1}{achievementsData.year2}
            </p>
          </div>

          {/* Right Column: Achievements List with Technical Crop Boxes */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.div
                  key={item.id || item.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'bg-[#0a0202] border-[#FF0000] shadow-[0_0_20px_rgba(255,0,0,0.15)]'
                      : 'bg-[#080202] border-[#3D0000] hover:border-[#950101]'
                  }`}
                >
                  <CropBox active={isActive} size="sm" className="w-8 h-8 shrink-0 mt-0.5">
                    {item.num}
                  </CropBox>

                  <div className="space-y-1">
                    <h3 className={`font-heading font-bold text-lg transition-colors ${isActive ? 'text-[#FF0000]' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
