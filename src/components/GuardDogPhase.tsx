import type { Player } from '../types/player';

interface GuardDogPhaseProps {
  isGuardDogAlive: boolean;
  livingPlayers: Player[];
  onSetGuardedTargetId: (id: number) => void;
  guardedTargetId: number | null;
  onNext: () => void;
}

export default function GuardDogPhase({
  isGuardDogAlive,
  livingPlayers,
  onSetGuardedTargetId,
  guardedTargetId,
  onNext,
}: GuardDogPhaseProps) {
  return (
    <div className="space-y-6">
      {!isGuardDogAlive && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded-xl text-xs text-center">
          ⚠️ <strong>Host Notice:</strong> Guard Dog is inactive/dead. Read the
          script aloud, pause 5 seconds, then continue.
        </div>
      )}

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
        <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
          Host Read Aloud
        </span>
        <p className="text-sm text-slate-200 leading-relaxed">
          "Cats, close your eyes... Guard Dog, wake up and point to the player
          you want to protect tonight."
        </p>
      </div>

      {isGuardDogAlive ? (
        <div className="space-y-3">
          <label className="text-xs uppercase font-mono text-slate-400 block text-left">
            Select Protected Player:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {livingPlayers.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => onSetGuardedTargetId(player.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  guardedTargetId === player.id
                    ? 'bg-amber-600/20 border-amber-500 text-slate-950'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{player.name}</span>
                {guardedTargetId === player.id && <span>🛡️ Protected</span>}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500 text-center py-2 italic">
          (Pausing for fake step...)
        </p>
      )}

      <button
        onClick={onNext}
        disabled={isGuardDogAlive && guardedTargetId === null}
        className={`w-full font-bold py-3.5 rounded-xl ${
          !isGuardDogAlive || guardedTargetId !== null
            ? 'bg-amber-600 text-slate-950 cursor-pointer'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Confirm
      </button>
    </div>
  );
}
