import type { Player, Role } from '../types/game';

export function getRoleDescription(role: Role): string | undefined {
  switch (role) {
    case 'Cat':
      return 'Wake up at night to hunt and choose a victim to eliminate.';
    case 'Owl':
      return 'Wake up each night to secretly check the true identity of one player.';
    case 'Guard Dog':
      return 'You watch over the mice! Each night, you can protect one target from a cat attack.';
    case 'Raccoon':
      return "You're a Jester! You are on your own team. Trick the mice into voting you out during the day to win the game alone!";
    case 'Host':
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
  Cat: {
    icon: '🐱',
    shortDesc: 'Wakes up at night to choose a mouse to eliminate.',
  },
  Mouse: {
    icon: '🐭',
    shortDesc: 'Innocent mouse. Votes during the day to find cats.',
  },
  Owl: {
    icon: '🦉',
    shortDesc: 'Inspects one player each night to learn their role.',
  },
  'Guard Dog': {
    icon: '🐶',
    shortDesc:
      'Protects one player each night from a cat attack. It can protect itself.',
  },
  Raccoon: {
    icon: '🦡',
    shortDesc: 'Solo trickster. Wins if voted out.',
  },
  Host: {
    icon: '🧑',
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
