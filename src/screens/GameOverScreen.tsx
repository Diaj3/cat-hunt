import type { Player } from '../types/player';
import type { WinnerRole } from '../types/winnerRole';
import { MINI_ROLE_DESCRIPTIONS } from '../utils/get-role-description';
import { getWinnerRoleDetails } from '../utils/get-role-win-details';

interface GameOverScreenProps {
  winner: WinnerRole;
  players: Player[];
  onPlayAgain: () => void;
}

function isWinner(player: Player, winner: GameOverScreenProps['winner']) {
  if (winner === 'RACCOON') return player.role === 'RACCOON';
  if (winner === 'CAT') return player.role === 'CAT';
  return player.role !== 'CAT' && player.role !== 'RACCOON';
}

export default function GameOverScreen({
  winner,
  players,
  onPlayAgain,
}: GameOverScreenProps) {
  const details = getWinnerRoleDetails(winner);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-slate-100">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
            🏁 Game Over
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-mono text-slate-400">
            Final Results
          </span>
        </div>

        <div className="space-y-3 py-2">
          <div className="text-6xl" aria-hidden="true">
            {details.icon}
          </div>
          <div className="space-y-1">
            <h1 className={`text-3xl font-bold ${details.color}`}>
              {details.title}
            </h1>
            <p className="text-sm text-slate-400">{details.description}</p>
          </div>
        </div>

        <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left">
          <h2 className="text-center text-xs font-mono uppercase tracking-wider text-slate-400">
            Final Roster
          </h2>
          <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {players.map((player) => {
              const roleDetails = MINI_ROLE_DESCRIPTIONS[player.role];
              const playerWon = isWinner(player, winner);

              return (
                <li
                  key={player.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-200">
                      {roleDetails.icon} {player.name}
                    </p>
                    <p className="pl-6 text-xs text-slate-500">{player.role}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {playerWon && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-400">
                        Winner
                      </span>
                    )}
                    <span
                      className={`text-xs ${player.isAlive ? 'text-emerald-400' : 'text-slate-500'}`}
                    >
                      {player.isAlive ? 'Alive' : 'Out'}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <button
          type="button"
          onClick={onPlayAgain}
          className="w-full cursor-pointer rounded-xl bg-amber-600 py-3.5 font-bold text-slate-950 shadow-lg transition-colors hover:bg-amber-500"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
