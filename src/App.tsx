import { useState } from 'react';
import SetupScreen from './screens/SetupScreen';
import type { GameStep, Player } from './types/game';
import DistributionScreen from './screens/DistributionScreen';
import RulesModal from './components/RulesModal';

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
    // ! TODO
    setStep('NIGHT'); // ! TODO Night Screen!
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
            <h1 className="text-3xl font-bold text-amber-500 mb-4">
              Night Phase Starts Here!
            </h1>
            <p className="text-slate-400 mb-6">
              Roles have been successfully distributed to {gamePlayers.length}{' '}
              players.
            </p>
            <pre className="bg-slate-900 p-4 rounded-xl text-xs text-slate-300 max-w-sm overflow-auto">
              {JSON.stringify(gamePlayers, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
