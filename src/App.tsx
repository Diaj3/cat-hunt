import { useState } from 'react';
import SetupScreen from './screens/SetupScreen';
import DistributionScreen from './screens/DistributionScreen';
import NightScreen from './screens/NightScreen';
import DayScreen from './screens/DayScreen';
import RulesModal from './components/RulesModal';
import type { GameStep } from './types/game';
import GameOverScreen from './screens/GameOverScreen';
import type { WinnerRole } from './types/winnerRole';
import type { Player } from './types/player';

export default function App() {
  const [step, setStep] = useState<GameStep>('SETUP');
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  const [eliminatedTonightId, setEliminatedTonightId] = useState<number | null>(
    null,
  );
  const [dayNumber, setDayNumber] = useState<number>(1);
  const [winner, setWinner] = useState<WinnerRole | null>(null);

  const handleStartGame = (names: string[]) => {
    setPlayerNames(names);
    setStep('DISTRIBUTE');
  };

  const handleDistributionComplete = (assignedPlayers: Player[]) => {
    setGamePlayers(assignedPlayers);
    setStep('NIGHT');
  };

  const handleNightComplete = (
    updatedPlayers: Player[],
    eliminatedId: number | null,
  ) => {
    setGamePlayers(updatedPlayers);
    setEliminatedTonightId(eliminatedId);

    // Check if night attack triggered a win condition before day (e.g. Cats equal Mice)
    const catsCount = updatedPlayers.filter(
      (p) => p.isAlive && p.role === 'CAT',
    ).length;
    const nonCatsCount = updatedPlayers.filter(
      (p) => p.isAlive && p.role !== 'CAT',
    ).length;

    if (catsCount === 0) {
      setWinner('MOUSE');
      setStep('GAME_OVER');
    } else if (catsCount >= nonCatsCount) {
      setWinner('CAT');
      setStep('GAME_OVER');
    } else {
      setStep('DAY');
    }
  };

  const handleDayComplete = (
    updatedPlayers: Player[],
    _votedPlayerId: number | null,
    gameWinner: WinnerRole | null,
  ) => {
    setGamePlayers(updatedPlayers);

    if (gameWinner) {
      setWinner(gameWinner);
      setStep('GAME_OVER');
    } else {
      setDayNumber((prev) => prev + 1);
      setStep('NIGHT');
    }
  };

  const handlePlayAgain = () => {
    setGamePlayers([]);
    setEliminatedTonightId(null);
    setDayNumber(1);
    setWinner(null);
    setStep('SETUP');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative">
      {/* PERSISTENT TOP BAR */}
      <header className="absolute top-4 left-4 z-40">
        <button
          type="button"
          onClick={() => setIsRulesOpen(true)}
          className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 px-3.5 py-2 rounded-xl text-xs font-semibold backdrop-blur transition-colors cursor-pointer shadow-md"
        >
          <span>📖</span>
          <span>Rules</span>
        </button>
      </header>

      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      <main>
        {step === 'SETUP' && <SetupScreen onStartGame={handleStartGame} />}

        {step === 'DISTRIBUTE' && (
          <DistributionScreen
            playerNames={playerNames}
            onDistributionComplete={handleDistributionComplete}
          />
        )}

        {step === 'NIGHT' && (
          <NightScreen
            players={gamePlayers}
            onNightComplete={handleNightComplete}
          />
        )}

        {step === 'DAY' && (
          <DayScreen
            players={gamePlayers}
            dayNumber={dayNumber}
            onDayComplete={handleDayComplete}
          />
        )}

        {step === 'GAME_OVER' && winner && (
          <GameOverScreen
            winner={winner}
            players={gamePlayers}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>
    </div>
  );
}
