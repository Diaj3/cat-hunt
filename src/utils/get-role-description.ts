import type { Role } from '../types/game';

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
    // Mouse use case
    default:
      return 'You have no special powers. Work with the other mice during the day to find the cats.';
  }
}
