import type { Player } from '../types/game';

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
): 'MICE' | 'CATS' | 'RACCOON' | null => {
  if (ejectedPlayer && ejectedPlayer.role === 'Raccoon') {
    return 'RACCOON';
  }

  const living = currentPlayers.filter((p) => p.isAlive);
  const catsCount = living.filter((p) => p.role === 'Cat').length;
  const nonCatsCount = living.length - catsCount;

  if (catsCount === 0) {
    return 'MICE';
  }

  if (catsCount >= nonCatsCount) {
    return 'CATS';
  }

  return null;
};
