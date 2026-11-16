import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminFloatingTrigger() {
  const { isAdmin } = usePortfolio();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Link href="/admin">
        <button
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border text-xs font-mono transition-all duration-300 shadow-2xl active:scale-95 group ${
            isAdmin
              ? 'bg-[#140303]/90 border-[#FF0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.35)]'
              : 'bg-black/80 border-[#3D0000] hover:border-[#FF0000]/60 text-zinc-400 hover:text-white'
          }`}
          title="Open Admin Customization Portal"
        >
          <Shield className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isAdmin ? 'text-[#FF0000]' : 'text-zinc-400 group-hover:text-[#FF0000]'}`} />
          <span className="font-bold tracking-tight">
            {isAdmin ? 'Admin Console' : 'Customize'}
          </span>
          {isAdmin && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
          )}
        </button>
      </Link>
    </div>
  );
}
