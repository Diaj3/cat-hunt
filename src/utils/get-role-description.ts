import type { Player } from '../types/player';
import type { Role } from '../types/role';

export function getRoleDescription(role: Role): string | undefined {
  switch (role) {
    case 'CAT':
      return 'Wake up at night to hunt and choose a victim to eliminate.';
    case 'OWL':
      return 'Wake up each night to secretly check the true identity of one player.';
    case 'GUARD DOG':
      return 'You watch over the mice! Each night, you can protect one target or yourself from a cat attack.';
    case 'RACCOON':
      return "You're a Jester! You are on your own team. Trick the mice into voting you out during the day to win the game alone!";
    case 'HOST':
      return 'You are the Game Master! Announce your role to everyone. You hold the phone, read the night prompts, and lead the story.';
    // Mouse use case
    default:
      return `You have no special powers. Work with the other mice during the day to find the cats.`;
  }
}

export const MINI_ROLE_DESCRIPTIONS: Record<
  Role,
  { icon: string; shortDesc: string }
> = {
  CAT: {
    icon: '🐱',
    shortDesc: 'Wakes up at night to choose a mouse to eliminate.',
  },
  MOUSE: {
    icon: '🐭',
    shortDesc: 'Innocent mouse. Votes during the day to find cats.',
  },
  OWL: {
    icon: '🦉',
    shortDesc: 'Inspects one player each night to learn their role.',
  },
  'GUARD DOG': {
    icon: '🐶',
    shortDesc:
      'Protects one player each night from a cat attack. It can protect itself.',
  },
  RACCOON: {
    icon: '🦡',
    shortDesc: 'Solo trickster. Wins if voted out.',
  },
  HOST: {
    icon: '🤴',
    shortDesc: 'Game Master. Announces roles and leads the story.',
  },
};

export function getRoleSummary(players: Player[]): Record<string, number> {
  return players.reduce(
    (acc, player) => {
      acc[player.role] = (acc[player.role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}
