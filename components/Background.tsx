import React from 'react';
import { motion } from 'framer-motion';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background Image with slow zoom (Ken Burns effect) */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
            // Using a high quality fantasy landscape that resembles Runeterra
            backgroundImage: `url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2560&auto=format&fit=crop')`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
        }}
      />

      {/* Overlays for atmosphere */}
      <div className="absolute inset-0 bg-[#010A13]/60" /> {/* Darken */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010A13] via-transparent to-transparent" /> {/* Bottom fade */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" /> {/* Noise/Dust */}
      
      {/* Animated Particles (CSS based for simplicity/performance) */}
      <div className="absolute inset-0 opacity-50">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-hextech-blue-500 rounded-full blur-sm"
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 100,
                    opacity: 0,
                    scale: 0
                }}
                animate={{ 
                    y: -100,
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                }}
                style={{
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                }}
            />
        ))}
      </div>
    </div>
  );
};
