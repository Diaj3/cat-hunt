import PhasesHeader from '../components/PhasesHeader';
import type { Player } from '../types/player';

import dawn from './../assets/others/dawn.png';
import dusk from './../assets/others/dusk.png';

interface PhaseTransitionScreenProps {
  type: 'DAWN' | 'DUSK';
  eliminatedPlayer: Player | null;
  onPhaseTransitionComplete: () => void;
}

export default function PhaseTransitionScreen({
  type,
  eliminatedPlayer,
  onPhaseTransitionComplete,
}: PhaseTransitionScreenProps) {
  const isDawn = type === 'DAWN';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        <PhasesHeader
          phase={isDawn ? '🌅 Dawn Phase' : '🌆 Dusk Phase'}
          additionalInfo={isDawn ? `Step: Wakey Wakey` : `Step: Nighty Night`}
        />

        <div className="flex justify-center mt-4">
          <img
            src={isDawn ? dawn : dusk}
            className="bg-slate-950 border border-slate-800 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-amber-500">
            {isDawn ? 'Morning Has Broken!' : 'Night has fallen'}
          </h2>
          <p className="text-xs text-slate-400">
            {isDawn
              ? "Host, tell everyone to wake up, then announce the night's result below."
              : 'Host, make sure everyone has their eyes closed before tapping below to begin the night phase!'}
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2 text-center">
          <h3 className="text-xs uppercase font-mono text-slate-400">
            {isDawn ? 'Night Outcome' : 'Village Vote Result'}
          </h3>

          {eliminatedPlayer ? (
            <div className="space-y-1">
              <p className="text-xl font-bold text-red-400">
                💀 {eliminatedPlayer.name} was eliminated!
              </p>
              <p className="text-xs text-slate-400">
                They must remain silent for the rest of the game.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xl font-bold text-emerald-400">
                {isDawn
                  ? '🛡️ No one was eliminated!'
                  : '🤝 The vote was skipped!'}
              </p>
              <p className="text-xs text-slate-400">
                {isDawn
                  ? 'The Guard Dog successfully protected the target!'
                  : 'No player was eliminated by the village today.'}
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onPhaseTransitionComplete}
          className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3.5 rounded-xl transition-colors cursor-pointer shadow-lg"
        >
          {isDawn ? 'Begin Day Discussion' : 'Start Night Phase'}
        </button>
      </div>
    </div>
  );
}
