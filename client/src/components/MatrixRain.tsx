import React from 'react';
import { motion } from 'framer-motion';

const MatrixRain: React.FC = () => {
  const matrixChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  const columns = 12;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="absolute" style={{ left: `${(i / columns) * 100}%`, width: '50px' }}>
          {Array.from({ length: 20 }).map((_, j) => (
            <motion.div
              key={j}
              className="text-orange-400 font-mono text-sm leading-tight"
              initial={{ y: -100, opacity: 1 }}
              animate={{ 
                y: window.innerHeight + 100,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ marginBottom: '5px' }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;