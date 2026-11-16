import React from 'react';

interface CropBoxProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CropBox({
  children,
  active = false,
  className = '',
  size = 'md'
}: CropBoxProps) {
  const sizeClasses = {
    sm: 'p-1 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`relative inline-flex items-center justify-center font-mono font-bold transition-all ${
        active
          ? 'border border-[#FF0000] text-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.25)]'
          : 'border border-white/20 text-zinc-300'
      } ${sizeClasses[size]} ${className}`}
    >
      {/* 4 Corner Crop Nodes */}
      <span className={`absolute -top-1 -left-1 w-1.5 h-1.5 ${active ? 'bg-[#FF0000]' : 'bg-white'}`} />
      <span className={`absolute -top-1 -right-1 w-1.5 h-1.5 ${active ? 'bg-[#FF0000]' : 'bg-white'}`} />
      <span className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 ${active ? 'bg-[#FF0000]' : 'bg-white'}`} />
      <span className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 ${active ? 'bg-[#FF0000]' : 'bg-white'}`} />
      {children}
    </span>
  );
}
