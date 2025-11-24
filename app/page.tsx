'use client';

import { useState, useEffect } from 'react';
import { RaffleWheel } from '@/components/raffle-wheel';
import { WinnerDisplay } from '@/components/winner-display';

interface Visitor {
  id: number;
  uuid: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  badge_path: string;
  checked_in_at: string | null;
}

export default function RafflePage() {
  const [names, setNames] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://app.addedtownhall.ae/api/visitors',
        );

        if (!response.ok) {
          throw new Error('Failed to fetch visitors');
        }

        const data: Visitor[] = await response.json();
        const visitorNames = data.map((visitor) => visitor.name);
        setNames(visitorNames);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load visitors',
        );
        console.error('Error fetching visitors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

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
  };

  const handleWinnerSelected = (selectedWinner: string) => {
    setWinner(selectedWinner);
    setIsSpinning(false);
    setShowConfetti(true);

    setTimeout(() => {
      setWinner(null);
      setShowConfetti(false);
      // Remove winner from list
      setNames((prev) => prev.filter((name) => name !== selectedWinner));
    }, 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-4">
            Loading visitors...
          </div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="relative z-10 text-center bg-white p-8 rounded-lg shadow-2xl border border-gray-200">
          <div className="text-4xl font-bold text-red-600 mb-4">Error</div>
          <p className="text-xl text-gray-900">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl">
        {!winner && names.length > 0 && (
          <RaffleWheel
            names={names}
            isSpinning={isSpinning}
            onWinnerSelected={handleWinnerSelected}
          />
        )}

        {winner && (
          <WinnerDisplay winner={winner} showConfetti={showConfetti} />
        )}

        {names.length === 0 && !winner && (
          <div className="text-center py-20">
            <h2 className="text-4xl font-bold text-blue-600">
              All participants have been selected!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
