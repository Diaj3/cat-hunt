import type { WinnerRole } from '../types/winnerRole';

const winnerDetails: Record<
  WinnerRole,
  { icon: string; title: string; description: string; color: string }
> = {
  MOUSE: {
    icon: '🐭',
    title: 'The Mice Win!',
    description: 'The village found every Cat and saved the day.',
    color: 'text-emerald-400',
  },
  CAT: {
    icon: '🐱',
    title: 'The Cats Win!',
    description: 'The Cats have taken control of the village.',
    color: 'text-red-400',
  },
  RACCOON: {
    icon: '🦡',
    title: 'The Raccoon Wins!',
    description: 'The Raccoon was voted out and wins the game alone.',
    color: 'text-amber-400',
  },
};

/**
 *
 * ! ADD GIF LOGIC INTO THIS
 */
export function getWinnerRoleDetails(winner: WinnerRole) {
  return winnerDetails[winner];
}
