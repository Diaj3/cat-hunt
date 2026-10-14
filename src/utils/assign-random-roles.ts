import type { Role } from '../types/game';

/**
 * Assigns random roles to players based on the total number of players.
 * The distribution of roles is as follows:
 * - One Cat for every 4 players
 * - One mandatory Host role
 * - One Guard Dog if there are 6 or more players
 * - One Raccoon if there are 7 or more players
 * - One Owl if there are 10 or more players
 * - All remaining players are assigned the Mouse role
 *
 * @param totalPlayers - The total number of players in the game.
 * @returns An array of roles assigned to each player.
 */
export function assignRandomRoles(totalPlayers: number): Role[] {
  const roles: Role[] = [];
  const catCount = Math.floor(totalPlayers / 4);

  for (let i = 0; i < catCount; i++) {
    roles.push('Cat');
  }
  roles.push('Host');

  if (totalPlayers >= 6) {
    roles.push('Guard Dog');
  }
  if (totalPlayers >= 7) {
    roles.push('Raccoon');
  }
  if (totalPlayers >= 10) {
    roles.push('Owl');
  }
  while (roles.length < totalPlayers) {
    roles.push('Mouse');
  }

  // Shuffle array randomly (Fisher-Yates shuffle)
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}
