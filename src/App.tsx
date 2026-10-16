import { useState } from 'react';
import SetupScreen from './screens/SetupScreen';
import type { GameStep, Player } from './types/game';
import DistributionScreen from './screens/DistributionScreen';
import RulesModal from './components/RulesModal';
import NightScreen from './screens/NightScreen';

export default function App() {
  const [step, setStep] = useState<GameStep>('SETUP');
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

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
    eliminatedPlayerId: number | null,
  ) => {
    setGamePlayers(updatedPlayers);
    setStep('NIGHT'); // ! TODO Replace with appropriate step
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative">
      {/* PERSISTENT TOP BAR */}
      <header className="absolute top-4 left-4 z-40">
        <button
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
      </main>
    </div>
  );
}
