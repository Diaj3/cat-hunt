import { useState } from 'react';
import type { Role, RoleCounts } from '../types/role';
import { MINI_ROLE_DESCRIPTIONS } from '../utils/get-role-description';
import { getDefaultRoleCounts } from '../utils/assign-random-roles';

interface GameSetupScreenProps {
  playerNames: string[];
  onGameSetupComplete: (roleCounts: RoleCounts) => void;
  onOpenRules: () => void;
}

const SELECTABLE_ROLES: Role[] = [
  'MOUSE',
  'CAT',
  'GUARD DOG',
  'OWL',
  'RACCOON',
  'HOST',
];

export default function GameSetupScreen({
  playerNames,
  onGameSetupComplete,
  onOpenRules,
}: GameSetupScreenProps) {
  const [roleCounts, setRoleCounts] = useState<RoleCounts>(() =>
    getDefaultRoleCounts(playerNames.length),
  );
  const assignedCount = Object.values(roleCounts).reduce(
    (total, count) => total + count,
    0,
  );
  const remainingCount = playerNames.length - assignedCount;
  const catsDoNotOutnumberMice = roleCounts.CAT <= roleCounts.MOUSE;
  const canDealRoles = remainingCount === 0 && catsDoNotOutnumberMice;

  const updateRoleCount = (role: Role, change: number) => {
    setRoleCounts((currentCounts) => {
      const currentTotal = Object.values(currentCounts).reduce(
        (total, count) => total + count,
        0,
      );
      const nextCount = currentCounts[role] + change;

      if (
        role === 'HOST' ||
        nextCount < 0 ||
        (change > 0 && currentTotal >= playerNames.length) ||
        (role === 'CAT' &&
          change > 0 &&
          currentCounts.CAT >= currentCounts.MOUSE) ||
        (role === 'MOUSE' &&
          change < 0 &&
          currentCounts.MOUSE <= currentCounts.CAT)
      ) {
        return currentCounts;
      }

      return { ...currentCounts, [role]: nextCount };
    });
  };

  const handleStartGame = () => {
    if (canDealRoles) {
      onGameSetupComplete(roleCounts);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-slate-100">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-400">
            Choose the roles
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Set the role roster for the {playerNames.length} players.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() =>
                setRoleCounts(getDefaultRoleCounts(playerNames.length))
              }
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 py-3 text-slate-200 hover:border-amber-500 hover:text-amber-400"
            >
              Use suggested roles
            </button>
            <button
              type="button"
              onClick={onOpenRules}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 py-3 text-slate-200 hover:border-amber-500 hover:text-amber-400"
            >
              📖 Rules
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {SELECTABLE_ROLES.map((role) => {
            const { icon, shortDesc } = MINI_ROLE_DESCRIPTIONS[role];
            const isHost = role === 'HOST';
            const count = roleCounts[role];

            return (
              <div
                key={role}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 px-3 py-3"
              >
                <div className="min-w-0">
                  <div className="font-medium text-slate-200">
                    <span className="mr-2" aria-hidden="true">
                      {icon}
                    </span>
                    {role}
                    {isHost && (
                      <span className="ml-2 text-xs text-slate-500">
                        always 1
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{shortDesc}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Decrease ${role} count`}
                    onClick={() => updateRoleCount(role, -1)}
                    disabled={
                      isHost ||
                      count === 0 ||
                      (role === 'MOUSE' && count <= roleCounts.CAT)
                    }
                    className="h-9 w-9 rounded-lg border border-slate-700 bg-slate-900 text-lg font-bold text-slate-200 enabled:hover:border-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>
                  <span
                    className="w-5 text-center font-mono font-bold text-amber-400"
                    aria-live="polite"
                  >
                    {count}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${role} count`}
                    onClick={() => updateRoleCount(role, 1)}
                    disabled={
                      isHost ||
                      remainingCount <= 0 ||
                      (role === 'CAT' && roleCounts.CAT >= roleCounts.MOUSE)
                    }
                    className="h-9 w-9 rounded-lg border border-slate-700 bg-slate-900 text-lg font-bold text-slate-200 enabled:hover:border-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center text-sm"
          aria-live="polite"
        >
          {remainingCount === 0 && catsDoNotOutnumberMice ? (
            <p className="font-medium text-green-400">
              All {playerNames.length} players have a role.
            </p>
          ) : remainingCount === 0 ? (
            <p className="text-red-400">
              Cats cannot outnumber mice. Add mice or remove cats.
            </p>
          ) : (
            <p className="text-slate-300">
              Assign {remainingCount} more{' '}
              {remainingCount === 1 ? 'role' : 'roles'} to fill the roster.
            </p>
          )}
          <p className="mt-2 text-xs text-slate-500">
            Cats cannot outnumber mice.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartGame}
          disabled={!canDealRoles}
          className={`w-full rounded-xl py-3 ${
            canDealRoles
              ? 'cursor-pointer bg-amber-600 text-slate-950'
              : 'cursor-not-allowed bg-slate-800 text-slate-500'
          }`}
        >
          Deal Roles
        </button>
      </div>
    </div>
  );
}
