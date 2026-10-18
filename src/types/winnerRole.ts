import type { Role } from './game';

export type WinnerRole = Extract<Role, 'CAT' | 'MOUSE' | 'RACCOON'>;
