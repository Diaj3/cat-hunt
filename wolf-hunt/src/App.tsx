import { useState } from 'react';
import type { GameStep } from './types/game';
import SetupScreen from './screens/setup';

export default function App() {
  // Global game state
  const [step, setStep] = useState<GameStep>('SETUP');
  const [players, setPlayers] = useState<string[]>([]);

  // This function is passed down to SetupScreen as a prop
  const handleStartGame = (namesList: string[]) => {
    setPlayers(namesList); // Save the names in App.tsx state
    setStep('DISTRIBUTE'); // Move to the role distribution phase
  };

  return (
    <main>
      {step === 'SETUP' && (
        <SetupScreen onStartGame={handleStartGame} />
      )}

      {step === 'DISTRIBUTE' && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center space-y-4">
            <h1 className="text-2xl font-bold text-amber-500">Role Distribution Phase</h1>
            <p className="text-slate-400 text-sm">
              Players registered: <span className="text-white font-medium">{players.join(', ')}</span>
            </p>
            <p className="text-slate-500 text-xs">Next, we will build the pass-the-phone role reveal screen here!</p>

            <button
              onClick={() => setStep('SETUP')}
              className="text-amber-500 hover:underline text-sm font-medium cursor-pointer"
            >
              ← Back to Setup
            </button>
          </div>
        </div>
      )}
    </main>
  );
}