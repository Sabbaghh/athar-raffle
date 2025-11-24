'use client';

import { useEffect, useRef, useState } from 'react';

interface RaffleWheelProps {
  names: string[];
  isSpinning: boolean;
  onWinnerSelected?: (winner: string) => void;
}

export function RaffleWheel({
  names,
  isSpinning,
  onWinnerSelected,
}: RaffleWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayNames, setDisplayNames] = useState<string[]>([]);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const velocityRef = useRef(0);
  const hasReportedWinnerRef = useRef(false);

  useEffect(() => {
    // Create extended list for seamless looping
    const extended = [...names, ...names, ...names, ...names, ...names];
    setDisplayNames(extended);
  }, [names]);

  useEffect(() => {
    if (isSpinning) {
      velocityRef.current = 120; // High velocity for draw
      hasReportedWinnerRef.current = false; // Reset winner reporting flag
    } else {
      velocityRef.current = 2; // Slow continuous scroll when idle
    }

    const animate = () => {
      scrollPositionRef.current += velocityRef.current;

      if (isSpinning) {
        velocityRef.current *= 0.988; // Slower deceleration for longer animation

        if (
          velocityRef.current < 0.5 &&
          !hasReportedWinnerRef.current &&
          onWinnerSelected
        ) {
          hasReportedWinnerRef.current = true;

          // Calculate which name is in the center selection box
          const itemHeight = 80;
          const containerHeight = window.innerHeight;
          const centerOffset = containerHeight / 2; // Center of the visible area

          // Account for the padding at the top of the scrolling container
          const adjustedScrollPosition =
            scrollPositionRef.current + centerOffset - 160;

          // Calculate which item index is at the center
          const centerItemIndex = Math.floor(
            adjustedScrollPosition / itemHeight,
          );

          // Map back to the original names array (handle the extended list wrapping)
          const actualIndex = centerItemIndex % names.length;
          const winner = names[actualIndex];

          console.log(
            '[v0] Winner selected at scroll position:',
            scrollPositionRef.current,
          );
          console.log('[v0] Center item index:', centerItemIndex);
          console.log('[v0] Actual index:', actualIndex);
          console.log('[v0] Winner:', winner);

          onWinnerSelected(winner);
        }
      }

      if (containerRef.current) {
        const itemHeight = 80;
        const totalHeight = displayNames.length * itemHeight;

        // Loop seamlessly
        if (scrollPositionRef.current > totalHeight / 2) {
          scrollPositionRef.current -= totalHeight / 2;
        }

        containerRef.current.style.transform = `translateY(-${scrollPositionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, displayNames, names, onWinnerSelected]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative h-screen overflow-hidden bg-[#1CA9D3]  shadow-2xl">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none">
          <div className="mx-4 py-4 border-y-2 border-white/40 bg-white/30">
            <div className="h-12" />
          </div>
        </div>

        {/* Scrolling names */}
        <div ref={containerRef} className="absolute inset-0 py-[160px]">
          {displayNames.map((name, index) => (
            <div
              key={`${name}-${index}`}
              className="h-20 flex items-center justify-center px-8"
            >
              <span className="text-2xl md:text-3xl font-medium text-white">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
