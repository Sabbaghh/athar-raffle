'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface WinnerDisplayProps {
  winner: string;
  showConfetti: boolean;
}

export function WinnerDisplay({ winner, showConfetti }: WinnerDisplayProps) {
  useEffect(() => {
    if (showConfetti) {
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = [
        '#0F68CB', // deep blue
        '#FF3D00', // bright red
        '#FFB300', // golden yellow
        '#00C853', // bright green
        '#D500F9', // vibrant purple
        '#FF4081', // pink
        '#00B0FF', // sky blue
        '#FFD600', // yellow
        '#FF6D00', // orange
        '#76FF03', // lime green
      ];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      // Initial burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });

      frame();
    }
  }, [showConfetti]);

  return (
    <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
      <div className="mb-8 p-16 rounded-3xl bg-white border-2 border-[#0F68CB]/30 shadow-2xl">
        <h2 className="text-6xl md:text-8xl font-bold text-balance bg-gradient-to-br from-[#0F68CB] to-[#4DA3FF] bg-clip-text text-transparent">
          {winner}
        </h2>
      </div>
    </div>
  );
}
