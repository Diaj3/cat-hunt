import { useState } from 'react';
import type { Player, Role } from '../types/game';

interface DistributionScreenProps {
    playerNames: string[];
    onDistributionComplete: (assignedPlayers: Player[]) => void;
}

export default function DistributionScreen({ playerNames, onDistributionComplete }: DistributionScreenProps) {
    // 1. Initialize players and assign random roles when this screen loads
    const [players, setPlayers] = useState<Player[]>(() => {
        const assignedRoles = assignRandomRoles(playerNames.length);
        return playerNames.map((name, index) => ({
            id: index,
            name,
            role: assignedRoles[index],
            isAlive: true,
        }));
    });

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);

    const currentPlayer = players[currentIndex];

    const handleNext = () => {
        setIsRevealed(false); // Lock it before moving to the next person
        if (currentIndex + 1 < players.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Everyone has seen their role! Send the final player array up to App.tsx
            onDistributionComplete(players);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center space-y-6">

                {/* Progress tracker */}
                <div className="text-xs uppercase tracking-wider text-slate-500 font-mono">
                    Player {currentIndex + 1} of {players.length}
                </div>

                {!isRevealed ? (
                    // --- BLINDFOLD STATE (Safe to pass device) ---
                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <h2 className="text-xl text-slate-300">Pass the device to</h2>
                            <p className="text-3xl font-bold text-amber-500">{currentPlayer.name}</p>
                        </div>

                        <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                            Make sure no one else is looking at the screen!
                        </p>

                        <button
                            onClick={() => setIsRevealed(true)}
                            className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                        >
                            Reveal My Role
                        </button>
                    </div>
                ) : (
                    // --- REVEALED STATE (Shown only to the current player) ---
                    <div className="space-y-6 py-2">
                        <div className="space-y-1">
                            <span className="text-xs text-slate-400">Your secret role is</span>
                            <h2 className="text-4xl font-extrabold text-amber-400 tracking-wide uppercase">
                                {currentPlayer.role}
                            </h2>
                        </div>

                        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-300 text-sm">
                            {getRoleDescription(currentPlayer.role)}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer border border-slate-700"
                        >
                            Hide & Pass Device
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

// --- Helper Functions ---

function assignRandomRoles(totalPlayers: number): Role[] {
    const roles: Role[] = [];

    // Rule of thumb for Werewolf ratios: roughly 1 werewolf per 4-5 players
    const werewolfCount = totalPlayers >= 8 ? 2 : 1;

    for (let i = 0; i < werewolfCount; i++) roles.push('Werewolf');
    roles.push('Seer');
    if (totalPlayers >= 5) roles.push('Witch');

    // Fill remaining slots with Villagers
    while (roles.length < totalPlayers) {
        roles.push('Villager');
    }

    // Shuffle array randomly (Fisher-Yates shuffle)
    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    return roles;
}

function getRoleDescription(role: Role): string | undefined {
    switch (role) {
        case 'Werewolf':
            return 'Wake up at night with your pack to choose a victim to eliminate.';
        case 'Seer':
            return 'Wake up each night to secretly check the true identity of one player.';
        case 'Witch':
            return 'You have a healing potion and a poison potion to use once per game.';
        case 'Villager':
            return 'You have no special powers. Work with the village during the day to find the wolves.';
    }
}