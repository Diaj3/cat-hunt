export type Role = 'Cat' | 'Villager' | 'Seer' | 'Witch' | 'Hunter';

export interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
}

export type GameStep = 'SETUP' | 'DISTRIBUTE' | 'NIGHT' | 'DAY' | 'GAME_OVER';