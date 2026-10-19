import type { Role } from './role';

export type WinnerRole = Extract<Role, 'CAT' | 'MOUSE' | 'RACCOON'>;
