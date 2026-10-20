import type { Player } from '../types/player';

interface CatPhaseProps {
  livingPlayers: Player[];
  catTargetId: number | null;
  setCatTargetId: (id: number | null) => void;
  onNext: () => void;
}

export default function CatPhase({
  livingPlayers,
  catTargetId,
  setCatTargetId,
  onNext,
}: CatPhaseProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
        <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
          Host Read Aloud
        </span>
        <p className="text-sm font-semibold text-slate-200 leading-relaxed">
          "Everyone, close your eyes... Cats, wake up, look at each other, and
          point to the player you want to eliminate."
        </p>
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase font-mono text-slate-400 block text-left">
          Select Cats' Target:
        </label>
        <div className="grid grid-cols-1 gap-2">
          {livingPlayers.map((player) => (
            <button
              key={player.id}
              type="button"
              onClick={() => setCatTargetId(player.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                catTargetId === player.id
                  ? 'bg-amber-600/20 border-amber-500 text-slate-950'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{player.name}</span>
              {catTargetId === player.id && <span>🎯 Target</span>}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={catTargetId === null}
        className={`w-full font-bold py-3.5 rounded-xl ${
          catTargetId !== null
            ? 'bg-amber-600 text-slate-950 cursor-pointer'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Confirm
      </button>
    </div>
  );
}
