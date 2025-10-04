import React from 'react';
import { motion } from 'framer-motion';

const TerminalWindow: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div 
      className={`bg-stone-900 border-2 border-stone-700 rounded-2xl shadow-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-stone-800 px-4 py-3 border-b border-stone-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-amber-700 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-700 rounded-full"></div>
          <div className="w-3 h-3 bg-emerald-800 rounded-full"></div>
        </div>
        <span className="text-stone-300 text-sm font-mono font-medium">soulaimane@dev ~ zsh</span>
        <div className="w-16"></div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm bg-stone-900 min-h-[120px]">
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-amber-600 mr-2">➜</span>
            <span className="text-amber-500 mr-2">portfolio</span>
            <span className="text-stone-400 mr-1">git:(</span>
            <span className="text-orange-600 mr-1">main</span>
            <span className="text-stone-400 mr-2">)</span>
            <span className="text-stone-100">npm run dev</span>
          </div>
          <div className="text-amber-400">  VITE v5.4.1  ready in 423 ms</div>
          <div className="text-stone-300">  ➜  Local:   <span className="text-amber-400 underline">http://localhost:5173/</span></div>
          <div className="text-stone-300">  ➜  Network: <span className="text-amber-400">use --host to expose</span></div>
          <div className="text-emerald-600 mt-3">✓ All systems operational</div>
          <div className="flex items-center mt-2">
            <span className="text-amber-600 mr-2">➜</span>
            <span className="text-amber-500 mr-2">portfolio</span>
            <span className="text-stone-400 mr-1">git:(</span>
            <span className="text-orange-600 mr-1">main</span>
            <span className="text-stone-400 mr-2">)</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-stone-300 w-2 h-4 inline-block ml-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalWindow;