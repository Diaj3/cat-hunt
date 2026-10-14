import { useState } from 'react';
import SetupScreen from './screens/SetupScreen';
import type { GameStep, Player } from './types/game';
import DistributionScreen from './screens/DistributionScreen';

export default function App() {
  const [step, setStep] = useState<GameStep>('SETUP');
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);

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
  );
}
