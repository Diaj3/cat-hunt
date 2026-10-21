import { useState } from 'react';
import type { Player } from '../types/player';
import type { Role } from '../types/role';

interface OwlPhaseProps {
  isOwlAlive: boolean;
  livingPlayers: Player[];
  onNext: () => void;
}

export default function OwlPhase({
  isOwlAlive,
  livingPlayers,
  onNext,
}: OwlPhaseProps) {
  const [owlInspectedRole, setOwlInspectedRole] = useState<Role | null>(null);
  const [owlTargetId, setOwlTargetId] = useState<number | null>(null);

  const handleOwlInspect = (targetId: number) => {
    setOwlTargetId(targetId);
    const target = livingPlayers.find((p) => p.id === targetId);
    if (target) {
      setOwlInspectedRole(target.role);
    }
  };

  return (
    <div className="space-y-6">
      {!isOwlAlive && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded-xl text-xs text-center">
          ⚠️ <strong>Host Notice:</strong> Owl is inactive/dead. Read script
          aloud, pause 5 seconds, then continue.
        </div>
      )}

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
        <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
          Host Read Aloud
        </span>
        <p className="text-sm text-slate-200 leading-relaxed">
          "Guard Dog, close your eyes... Owl, wake up and point to a player
          whose identity you want to inspect."
        </p>
      </div>

      {isOwlAlive ? (
        <div className="space-y-3">
          <label className="text-xs uppercase font-mono text-slate-400 block text-left">
            Select Player for Owl to Inspect:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {livingPlayers.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => handleOwlInspect(player.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  owlTargetId === player.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{player.name}</span>
                {owlTargetId === player.id && <span>🔍 Inspected</span>}
              </button>
            ))}
          </div>

          {/* SHOW RESULT FOR OWL TO SEE */}
          {owlInspectedRole && (
            <div className="bg-slate-950 border border-amber-500/40 p-4 rounded-xl text-center space-y-2 animate-in fade-in">
              <p className="text-xs text-slate-400">
                Silently show this result to the Owl:
              </p>
              <div className="flex items-center justify-center gap-2 text-lg font-bold text-amber-400">
                <span>{owlInspectedRole}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-500 text-center py-2 italic">
          (Pausing for fake step...)
        </p>
      )}

      <button
        onClick={onNext}
        disabled={isOwlAlive && owlTargetId === null}
        className={`w-full font-bold py-3.5 rounded-xl ${
          !isOwlAlive || owlTargetId !== null
            ? 'bg-amber-600 text-slate-950 cursor-pointer'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Complete Night
      </button>
    </div>
  );
}
