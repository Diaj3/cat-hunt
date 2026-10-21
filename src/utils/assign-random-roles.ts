import type { Role, RoleCounts } from '../types/role';

const ROLE_ORDER: Role[] = [
  'CAT',
  'MOUSE',
  'OWL',
  'GUARD DOG',
  'RACCOON',
  'HOST',
];

export function getDefaultRoleCounts(totalPlayers: number): RoleCounts {
  const counts: RoleCounts = {
    CAT: Math.floor(totalPlayers / 4),
    MOUSE: 0,
    OWL: totalPlayers >= 10 ? 1 : 0,
    'GUARD DOG': totalPlayers >= 7 ? 1 : 0,
    RACCOON: totalPlayers >= 8 ? 1 : 0,
    HOST: 1,
  };
  counts.MOUSE =
    totalPlayers -
    counts.CAT -
    counts.OWL -
    counts['GUARD DOG'] -
    counts.RACCOON -
    counts.HOST;
  return counts;
}

export function assignRandomRoles(roleCounts: RoleCounts): Role[] {
  const roles = ROLE_ORDER.flatMap((role) =>
    Array.from({ length: roleCounts[role] }, () => role),
  );

  // Shuffle array randomly (Fisher-Yates shuffle)
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}
