export type Role = 'Cat' | 'Mouse' | 'Owl' | 'Guard Dog' | 'Raccoon';

export interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
}

export type GameStep = 'SETUP' | 'DISTRIBUTE' | 'NIGHT' | 'DAY' | 'GAME_OVER';