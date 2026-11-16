import { Github, Linkedin, Mail, ArrowUp, Shield } from 'lucide-react';
import CropBox from './ui/CropBox';
import { usePortfolio } from '@/context/PortfolioContext';
import { Link } from 'wouter';

export default function Footer() {
  const { data, isAdmin } = usePortfolio();
  const contact = data.contact;

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
                {data.hero.fullName || 'Soulaimane Ben Louaret'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
              3rd-year Computer Science student at Universidad de Castilla-La Mancha (ESII Albacete). Systems programming, clean-room reverse engineering, and modern full-stack web architectures.
            </p>

            <div className="space-y-1 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-[#FF0000]">•</span>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF0000]">•</span>
                <span>{contact.location}</span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 pt-2">
              {contact.social?.github && (
                <a
                  href={contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#3D0000]/30 hover:bg-[#FF0000] text-zinc-300 hover:text-white border border-[#3D0000] transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {contact.social?.linkedin && (
                <a
                  href={contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#3D0000]/30 hover:bg-[#FF0000] text-zinc-300 hover:text-white border border-[#3D0000] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="p-2.5 rounded-full bg-[#3D0000]/30 hover:bg-[#FF0000] text-zinc-300 hover:text-white border border-[#3D0000] transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column matching Image 6 right */}
          <div className="md:col-span-3 space-y-4">
            <div className="inline-block border border-dashed border-[#FF0000]/60 px-3 py-1 rounded">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Sections
              </span>
            </div>

            <ul className="space-y-2 text-xs font-sans text-zinc-400">
              <li>
                <a href="#home" className="hover:text-[#FF0000] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-[#FF0000] transition-colors">
                  My Projects
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#FF0000] transition-colors">
                  The Journey
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-[#FF0000] transition-colors">
                  Achievements
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#FF0000] transition-colors">
                  Education &amp; UCLM
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FF0000] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Works Column matching Image 6 right */}
          <div className="md:col-span-3 space-y-4">
            <div className="inline-block border border-dashed border-[#FF0000]/60 px-3 py-1 rounded">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Flagship Works
              </span>
            </div>

            <ul className="space-y-2 text-xs font-sans text-zinc-400">
              <li>
                <a href="https://github.com/SPIN0ZAi/nup-extractor" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors">
                  nup-extractor (60+ ★)
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
        <span>Copyright © {new Date().getFullYear()} {data.hero.fullName || 'Soulaimane Ben Louaret'} · All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="hover:text-[#FF0000] transition-colors flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#FF0000]" />
            <span>Admin Console {isAdmin ? '(Active)' : ''}</span>
          </Link>
          <span>Crafted with high-performance dark architecture</span>
        </div>
      </div>
    </footer>
  );
}
