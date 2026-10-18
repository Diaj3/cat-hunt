import type { Player } from '../types/player';
import type { WinnerRole } from '../types/winnerRole';

/**
 * Win conditions:
 * 1. RACCOON WIN: Voted out player was Raccoon
 * 2. MICE WIN: All Cats eliminated
 * 3. CATS WIN: Cats equal or outnumber living non-Cats
 * 4. Game continues: None of the above conditions met
 */
export const checkWinConditions = (
  currentPlayers: Player[],
  ejectedPlayer: Player | null,
): WinnerRole | null => {
  if (ejectedPlayer && ejectedPlayer.role === 'RACCOON') {
    return 'RACCOON';
  }

  const living = currentPlayers.filter((p) => p.isAlive);
  const catsCount = living.filter((p) => p.role === 'CAT').length;
  const nonCatsCount = living.length - catsCount;

  if (catsCount === 0) {
    return 'MOUSE';
  }

  if (catsCount >= nonCatsCount) {
    return 'CAT';
  }

  return null;
};
