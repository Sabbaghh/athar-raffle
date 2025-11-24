'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface WinnerDisplayProps {
  winner: string;
  showConfetti: boolean;
}

export function WinnerDisplay({ winner, showConfetti }: WinnerDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!showConfetti) return;
    if (!canvasRef.current) return; // <-- avoid calling before canvas exists

    // create confetti instance bound to the canvas element
    const myConfetti = confetti.create(canvasRef.current, { resize: true });

    const duration = 6000;
    const end = Date.now() + duration;

    const colors = [
      '#0F68CB',
      '#FF3D00',
      '#FFB300',
      '#00C853',
      '#D500F9',
      '#FF4081',
      '#00B0FF',
      '#FFD600',
      '#FF6D00',
      '#76FF03',
    ];

    const frame = () => {
      myConfetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 }, // left edge of the canvas
        colors,
      });
      myConfetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 }, // right edge of the canvas
        colors,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    // initial burst (center-ish)
    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors,
    });

    frame();

    // optional: cleanup if component unmounts while running
    return () => {
      // canvas-confetti has no explicit destroy, but you can clear the canvas if desired
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
  }, [showConfetti]);

  return (
    <div className="relative text-center h-screen max-w-6xl bg-[#1CA9D3] py-12 flex justify-center items-center overflow-hidden">
      {/* canvas sits on top of the box and covers it */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <div className="mb-8 p-16 w-full max-w-6xl relative z-10">
        <h2 className="text-6xl md:text-8xl font-bold text-white">{winner}</h2>
      </div>
    </div>
  );
}
