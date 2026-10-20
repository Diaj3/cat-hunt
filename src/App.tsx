import { useEffect, useState } from 'react';
import PlayersSetupScreen from './screens/PlayersSetupScreen';
import DistributionScreen from './screens/DistributionScreen';
import NightScreen from './screens/NightScreen';
import DayScreen from './screens/DayScreen';
import RulesModal from './components/RulesModal';
import type { GameStep } from './types/game';
import GameOverScreen from './screens/GameOverScreen';
import type { WinnerRole } from './types/winnerRole';
import type { Player } from './types/player';
import PhaseTransitionScreen from './screens/PhaseTransictionsScreen';
import { checkWinConditions } from './utils/check-win-conditions';
import { preloadGameAssets } from './utils/preload-assets';
import GameSetupScreen from './screens/GameSetupScreen';

export default function App() {
  useEffect(() => {
    preloadGameAssets();
  }, []);

  const [step, setStep] = useState<GameStep>('PLAYERS_SETUP');
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  const [dayNumber, setDayNumber] = useState<number>(1);
  const [winner, setWinner] = useState<WinnerRole | null>(null);

  const handlePlayerSetup = (names: string[]) => {
    setPlayerNames(names);
    setStep('GAME_SETUP');
  };

  const handleGameSetup = () => {
    setStep('DISTRIBUTE');
  };

  const handleDistributionComplete = (assignedPlayers: Player[]) => {
    setGamePlayers(assignedPlayers);
    setStep('NIGHT');
  };

  const handlePhaseTransictionComplete = () => {
    if (step === 'DAWN') {
      setStep('DAY');
    } else if (step === 'DUSK') {
      setStep('NIGHT');
    }
  };

  const handleNightComplete = (
    updatedPlayers: Player[],
    eliminatedPlayer: Player | null,
  ) => {
    setGamePlayers(updatedPlayers);

    const winner = checkWinConditions(updatedPlayers, eliminatedPlayer, false);

    if (winner) {
      setWinner(winner);
      setStep('GAME_OVER');
    } else {
      setStep('DAWN');
    }
  };

  const handleDayComplete = (
    updatedPlayers: Player[],
    eliminatedPlayer: Player | null,
  ) => {
    setGamePlayers(updatedPlayers);

    const winner = checkWinConditions(updatedPlayers, eliminatedPlayer, true);

    if (winner) {
      setWinner(winner);
      setStep('GAME_OVER');
    } else {
      setDayNumber((prev) => prev + 1);
      setStep('DUSK');
    }
  };

  const handlePlayAgain = () => {
    setGamePlayers([]); // !TODO: change this to reset to initial state instead of empty array
    setDayNumber(1);
    setWinner(null);
    setStep('PLAYERS_SETUP');
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
        {step === 'PLAYERS_SETUP' && (
          <PlayersSetupScreen
            previousGamePlayers={playerNames}
            onPlayerSetupComplete={handlePlayerSetup}
          />
        )}

        {step === 'GAME_SETUP' && (
          <GameSetupScreen onGameSetupComplete={handleGameSetup} />
        )}

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

        {(step === 'DAWN' || step === 'DUSK') && (
          <PhaseTransitionScreen
            type={step}
            eliminatedPlayer={null}
            onPhaseTransitionComplete={handlePhaseTransictionComplete}
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
