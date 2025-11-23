'use client';

import { useState, useEffect } from 'react';
import { RaffleWheel } from '@/components/raffle-wheel';
import { WinnerDisplay } from '@/components/winner-display';

// Sample names - replace with your actual list
const initialNames = [
  'Alex Chen',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
  'Sarah Johnson',
  'Michael Rodriguez',
  'Emma Wilson',
  'David Kim',
  'Jessica Brown',
  'Ryan Martinez',
  'Olivia Taylor',
  'Daniel Lee',
  'Sophia Anderson',
  'James Garcia',
  'Emily White',
  'Christopher Davis',
  'Isabella Moore',
  'Matthew Jackson',
];

export default function RafflePage() {
  const [names, setNames] = useState<string[]>(initialNames);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isSpinning && !winner && names.length > 0) {
        startRaffle();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSpinning, names, winner]);

  const startRaffle = () => {
    setWinner(null);
    setShowConfetti(false);
    setIsSpinning(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      const selectedWinner = names[randomIndex];

      setWinner(selectedWinner);
      setIsSpinning(false);
      setShowConfetti(true);

      setTimeout(() => {
        setWinner(null);
        setShowConfetti(false);
        // Remove winner from list
        setNames((prev) => prev.filter((_, idx) => idx !== randomIndex));
      }, 5000);
    }, 4500);
  };

  // const resetRaffle = () => {
  //   setNames(initialNames);
  //   setWinner(null);
  //   setShowConfetti(false);
  //   setIsSpinning(false);
  // };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#568bc9] to-[#1CAAD3] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {!winner && names.length > 0 && (
          <RaffleWheel names={names} isSpinning={isSpinning} />
        )}

        {winner && (
          <WinnerDisplay winner={winner} showConfetti={showConfetti} />
        )}

        {names.length === 0 && !winner && (
          <div className="text-center py-20">
            <h2 className="text-4xl font-bold text-foreground">
              All participants have been selected.
            </h2>
          </div>
        )}
      </div>

      {/* Reset button */}
    </div>
  );
}
