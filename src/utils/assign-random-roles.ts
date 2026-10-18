import type { Role } from '../types/role';

/**
 * Assigns random roles to players based on the total number of players.
 * The distribution of roles is as follows:
 * - One CAT for every 4 players
 * - One mandatory HOST role
 * - One GUARD DOG if there are 6 or more players
 * - One RACCOON if there are 7 or more players
 * - One OWL if there are 10 or more players
 * - All remaining players are assigned the MOUSE role
 *
 * @param totalPlayers - The total number of players in the game.
 * @returns An array of roles assigned to each player.
 */
export function assignRandomRoles(totalPlayers: number): Role[] {
  const roles: Role[] = [];
  const catCount = Math.floor(totalPlayers / 4);

  for (let i = 0; i < catCount; i++) {
    roles.push('CAT');
  }
  roles.push('HOST');

  if (totalPlayers >= 7) {
    roles.push('GUARD DOG');
  }
  if (totalPlayers >= 8) {
    roles.push('RACCOON');
  }
  if (totalPlayers >= 10) {
    roles.push('OWL');
  }
  while (roles.length < totalPlayers) {
    roles.push('MOUSE');
  }

  // Shuffle array randomly (Fisher-Yates shuffle)
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}
