import type { Role } from './role';

export interface Player {
  id: number;
  name: string;
  role: Role;
  isAlive: boolean;
}
