import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ theme }) => {
  const isDark = theme === 'dark';
  
  // Vivid colors for dark mode context, soft pastels for light mode context
  const colors = isDark 
    ? ['#4f46e5', '#9333ea', '#2563eb'] 
    : ['#c7d2fe', '#e9d5ff', '#bfdbfe']; 

  // Generate random stars only once
  const stars = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5
  })), []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      
      {/* Twinkling Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          animate={{
            opacity: isDark ? [0.1, 0.7, 0.1] : [0.05, 0.3, 0.05],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: star.duration, 
            repeat: Infinity, 
            delay: star.delay, 
            ease: "easeInOut" 
          }}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: isDark ? '#ffffff' : '#6b7280',
            borderRadius: '50%',
            boxShadow: isDark ? '0 0 4px rgba(255,255,255,0.8)' : 'none'
          }}
        />
      ))}

      {/* Aura Orbs */}
      <motion.div
        animate={{
          x: ['0%', '15%', '-10%', '0%'],
          y: ['0%', '-15%', '10%', '0%'],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%', left: '-10%',
          width: '50vw', height: '50vw',
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 60%)`,
          filter: 'blur(100px)',
          opacity: isDark ? 0.3 : 0.6,
        }}
      />
      
      <motion.div
        animate={{
          x: ['0%', '-15%', '10%', '0%'],
          y: ['0%', '15%', '-20%', '0%'],
          scale: [1, 1.1, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          top: '30%', right: '-10%',
          width: '40vw', height: '40vw',
          background: `radial-gradient(circle, ${colors[1]} 0%, transparent 65%)`,
          filter: 'blur(120px)',
          opacity: isDark ? 0.25 : 0.5,
        }}
      />
      
      <motion.div
        animate={{
          y: ['0%', '20%', '-15%', '0%'],
          x: ['0%', '10%', '-10%', '0%'],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{
          position: 'absolute',
          bottom: '-20%', left: '20%',
          width: '60vw', height: '60vw',
          background: `radial-gradient(circle, ${colors[2]} 0%, transparent 60%)`,
          filter: 'blur(130px)',
          opacity: isDark ? 0.2 : 0.4,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
