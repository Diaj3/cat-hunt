import { useState, useEffect } from 'react';
import { formatTime } from '../utils/format-time';
import type { Player } from '../types/player';
import PhasesHeader from '../components/PhasesHeader';

interface DayScreenProps {
  players: Player[];
  dayNumber: number;
  onDayComplete: (
    updatedPlayers: Player[],
    eliminatedPlayer: Player | null,
  ) => void;
}

export default function DayScreen({
  players,
  dayNumber,
  onDayComplete,
}: DayScreenProps) {
  const [selectedVotedId, setSelectedVotedId] = useState<number | null>(null);

  // 2min 30sec discussion timer (150 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(150);

  const livingPlayers = players.filter((p) => p.isAlive);

  const handleConfirmVote = () => {
    let eliminatedPlayer: Player | null = null;

    const updatedPlayers = players.map((p) => {
      if (selectedVotedId !== null && p.id === selectedVotedId) {
        eliminatedPlayer = p;
        return { ...p, isAlive: false };
      }
      return p;
    });

    onDayComplete(updatedPlayers, eliminatedPlayer);
  };

  // Timer effect: when time runs out, auto-confirm whatever choice is selected
  useEffect(() => {
    if (timeLeft <= 0) {
      handleConfirmVote();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        <PhasesHeader
          phase={`☀️ Day ${dayNumber}`}
          additionalInfo="Discussion ⏳"
        />

        <div className="space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-xl font-bold text-slate-200">
              Village Discussion
            </h2>
            <p className="text-xs text-slate-400">
              Debate suspicions and find the Cats before the timer expires.
              Host, select the player voted out by the majority:
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div
              className={`text-5xl font-mono font-bold tracking-wider ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}
            >
              {formatTime(timeLeft)}
            </div>
            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              Discussion Time Remaining
            </p>
          </div>

          <div className="space-y-2">
            {/* SKIP VOTE OPTION */}
            <button
              type="button"
              onClick={() => setSelectedVotedId(null)}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                selectedVotedId === null
                  ? 'bg-amber-600/20 border-amber-500 text-slate-950'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              🤝 Skip Vote (No Elimination)
            </button>

            {/* LIVING PLAYERS LIST */}
            {livingPlayers.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => setSelectedVotedId(player.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  selectedVotedId === player.id
                    ? 'bg-amber-600/20 border-amber-500 text-slate-950'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{player.name}</span>
                {selectedVotedId === player.id && <span>🗳️ Voted Out</span>}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleConfirmVote}
            className="w-full bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
