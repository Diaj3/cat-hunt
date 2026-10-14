import type { Role } from "../types/game";

export function assignRandomRoles(totalPlayers: number): Role[] {
    const roles: Role[] = [];

    // One cat per every 4 players
    const catCount = Math.floor(totalPlayers / 4);

    for (let i = 0; i < catCount; i++) {
        roles.push('Cat')
    };

    if (totalPlayers >= 6) {
        roles.push('Guard Dog');
    }
    if (totalPlayers >= 7) {
        roles.push('Raccoon');
    }
    if (totalPlayers >= 10) {
        roles.push('Owl')
    }

    // Fill remaining slots with Mice
    while (roles.length < totalPlayers) {
        roles.push('Mouse');
    }

    // Shuffle array randomly (Fisher-Yates shuffle)
    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    return roles;
}
