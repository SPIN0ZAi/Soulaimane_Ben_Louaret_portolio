import React, { useEffect, useState } from 'react';
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
  'ssh user@server',
  'chmod +x script.sh',
  '0x4A 0x61 0x76 0x61',
  '101010 110011 101101',
  '{api_key: "hidden"}',
  'try { code() } catch(e) {}',
  '127.0.0.1:3000',
  'HTTP/1.1 200 OK',
  '</div>',
  'async/await promise',
];

const FloatingCode: React.FC = () => {
  const [elements, setElements] = useState<FloatingCodeElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingCodeElement[] = [];
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          content: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 15 + Math.random() * 20,
          color: ['orange', 'golden', 'amber', 'warm'][Math.floor(Math.random() * 4)],
        });
      }
      setElements(newElements);
    };

    generateElements();
    const interval = setInterval(generateElements, 45000); // Regenerate every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'orange': return 'text-orange-400';
      case 'golden': return 'text-yellow-400';
      case 'amber': return 'text-amber-400';
      case 'warm': return 'text-orange-300';
      default: return 'text-orange-400';
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <motion.div
          key={`${element.id}-${element.content}`}
          className={`absolute text-xs font-mono opacity-30 ${getColorClass(element.color)} code-float`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.3, 0],
            scale: [0, 1, 1, 0],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
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