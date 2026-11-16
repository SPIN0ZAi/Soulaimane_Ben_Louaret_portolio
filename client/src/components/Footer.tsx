import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import CropBox from './ui/CropBox';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-black text-white relative">
      {/* Dashed line divider matching Image 6 & 7 */}
      <div className="w-full border-t border-dashed border-[#3D0000]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Brand Column */}
          <div className="md:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="grid grid-cols-2 gap-1 w-6 h-6 items-center">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FF0000]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#950101]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#950101]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FF0000]" />
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-white uppercase">
                Soulaimane Ben Louaret
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
              3rd-year Computer Science student at Universidad de Castilla-La Mancha (ESII Albacete). Systems programming, reverse engineering, and modern full-stack web architectures.
            </p>

            <div className="space-y-1 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-[#FF0000]">•</span>
                <a href="mailto:ssolayman244@gmail.com" className="hover:text-white transition-colors">
                  ssolayman244@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF0000]">•</span>
                <span>Albacete, Spain (CET / GMT+1)</span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/SPIN0ZAi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#3D0000]/30 hover:bg-[#FF0000] text-zinc-300 hover:text-white border border-[#3D0000] transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/soulaimane-ben-louaret-98471428b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#3D0000]/30 hover:bg-[#FF0000] text-zinc-300 hover:text-white border border-[#3D0000] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:ssolayman244@gmail.com"
                className="p-2.5 rounded-full bg-[#3D0000]/30 hover:bg-[#FF0000] text-zinc-300 hover:text-white border border-[#3D0000] transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Columns with Crop Box Headers */}
          <div className="md:col-span-3 space-y-4">
            <CropBox active size="sm">
              Navigation
            </CropBox>
            <ul className="space-y-2 text-xs font-mono text-zinc-400 pt-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#featured" className="hover:text-white transition-colors">My Projects</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-white transition-colors">My Journey</a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-white transition-colors">My Achievements</a>
              </li>
              <li>
                <a href="#education" className="hover:text-white transition-colors">Academic Record</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <CropBox size="sm">
              Flagship Works
            </CropBox>
            <ul className="space-y-2 text-xs font-mono text-zinc-400 pt-2">
              <li>
                <a href="https://github.com/SPIN0ZAi/nup-extractor" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">
                  nup-extractor (57★)
                </a>
              </li>
              <li>
                <a href="https://github.com/SPIN0ZAi/FrameVault" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">
                  FrameVault (Flagship)
                </a>
              </li>
              <li>
                <a href="https://github.com/SPIN0ZAi/Switch-1-extractor" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">
                  Switch-1-extractor
                </a>
              </li>
              <li>
                <a href="https://github.com/SPIN0ZAi/Cognitia" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">
                  Cognitia AI Platform
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-[#FF0000] hover:underline"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Bottom dashed divider and copyright bar */}
      <div className="w-full border-t border-dashed border-[#3D0000]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
        <span>Copyright © {new Date().getFullYear()} Soulaimane Ben Louaret · All rights reserved.</span>
        <span>Crafted with high-performance dark architecture</span>
      </div>
    </footer>
  );
}
