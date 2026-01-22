'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface RainDrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  height: number;
}

interface Splash {
  id: number;
  left: number;
  animationDelay: number;
  key: number; // Add key to force re-render
}

export default function RainAnimation() {
  const { theme } = useTheme();
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [splashes, setSplashes] = useState<Splash[]>([]);

  useEffect(() => {
    const generateDrops = () => {
      const drops: RainDrop[] = [];
      const newSplashes: Splash[] = [];
      const dropCount = 10;

      for (let i = 0; i < dropCount; i++) {
        const animationDelay = Math.random();
        const left = Math.random() * 100;
        const animationDuration = Math.random() + 3;
        
        drops.push({
          id: i,
          left,
          animationDuration,
          animationDelay,
          opacity: Math.random() * 0.3 + 0.2,
          height: Math.random() * 15 + 10,
        });
        
        // Create splash that triggers when drop hits bottom
        newSplashes.push({
          id: i,
          left,
          animationDelay: animationDelay + animationDuration,
          key: 0, // Initial key
        });
        
        console.log(`Drop ${i}: delay=${animationDelay.toFixed(2)}s, duration=${animationDuration.toFixed(2)}s, splash at ${(animationDelay + animationDuration).toFixed(2)}s`);
      }

      setRainDrops(drops);
      setSplashes(newSplashes);
    };

    // Initial generation
    generateDrops();
    
    // Create staggered intervals for each splash position
    const splashIntervals: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < 10; i++) {
      const interval = setInterval(() => {
        setSplashes(prevSplashes => {
          if (prevSplashes.length > i) {
            return prevSplashes.map((splash, index) => 
              index === i 
                ? { ...splash, left: Math.random() * 100, animationDelay: 0, key: Date.now() }
                : splash
            );
          }
          return prevSplashes;
        });
      }, 1500 + (i * 200)); // Stagger by 200ms per splash
      splashIntervals.push(interval);
    }

    // Regenerate all positions every 5 seconds
    const dropInterval = setInterval(generateDrops, 5000);

    return () => {
      splashIntervals.forEach(interval => clearInterval(interval));
      clearInterval(dropInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            background: theme === 'dark' 
              ? 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.6))'
              : 'linear-gradient(to bottom, transparent, rgba(74, 144, 226, 0.6))',
            animation: `rainfall ${drop.animationDuration}s linear ${drop.animationDelay}s infinite`,
          }}
        />
      ))}
      {splashes.map((splash) => (
        <div
          key={`${splash.id}-${splash.key}`}
          className="rain-splash"
          style={{
            left: `${splash.left}%`,
            bottom: '0px',
            background: theme === 'dark'
              ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.8) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(74, 144, 226, 0.8) 0%, transparent 70%)',
            animation: `splash 0.6s ease-out ${splash.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}
