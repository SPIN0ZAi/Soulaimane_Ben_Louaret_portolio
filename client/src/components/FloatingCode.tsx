import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingCodeElement {
  id: number;
  content: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

const codeSnippets = [
  'console.log("Hello World");',
  'const portfolio = await build();',
  'function() { return "success"; }',
  'git commit -m "feature: added"',
  'npm install react',
  'import { useState } from "react";',
  'export default function App()',
  '<!-- HTML Comment -->',
  'SELECT * FROM projects;',
  'docker run -d app',
];

const FloatingCode: React.FC = () => {
  const [elements, setElements] = useState<FloatingCodeElement[]>([]);

  // Memoize color class getter
  const getColorClass = useMemo(() => (color: string) => {
    switch (color) {
      case 'orange': return 'text-orange-400';
      case 'golden': return 'text-yellow-400';
      case 'amber': return 'text-amber-400';
      case 'warm': return 'text-orange-300';
      default: return 'text-orange-400';
    }
  }, []);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingCodeElement[] = [];
      // Reduced from 15 to 8 elements for better performance
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          content: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 20 + Math.random() * 15, // Slower animations
          color: ['orange', 'golden', 'amber', 'warm'][Math.floor(Math.random() * 4)],
        });
      }
      setElements(newElements);
    };

    generateElements();
    // Increased regeneration time from 45s to 60s
    const interval = setInterval(generateElements, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ willChange: 'transform' }}>
      {elements.map((element) => (
        <motion.div
          key={`${element.id}-${element.content}`}
          className={`absolute text-xs font-mono opacity-30 ${getColorClass(element.color)} code-float`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.3, 0],
            scale: [0, 1, 1, 0],
            x: [0, (Math.random() - 0.5) * 150], // Reduced movement range
            y: [0, (Math.random() - 0.5) * 150],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {element.content}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCode;