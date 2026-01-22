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

export default function RainAnimation() {
  const { theme } = useTheme();
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    const drops: RainDrop[] = [];
    const dropCount = 10;

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 0.5 + 3,
        animationDelay: Math.random(),
        opacity: Math.random() * 0.3 + 0.2,
        height: Math.random() * 15 + 10,
      });
    }

    setRainDrops(drops);
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
    </div>
  );
}
