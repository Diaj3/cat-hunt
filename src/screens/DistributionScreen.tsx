import { useState } from 'react';
import type { Player } from '../types/game';
import { assignRandomRoles } from '../utils/assign-random-roles';
import { getRoleDescription } from '../utils/get-role-description';

interface DistributionScreenProps {
    playerNames: string[];
    onDistributionComplete: (assignedPlayers: Player[]) => void;
}

export default function DistributionScreen({ playerNames, onDistributionComplete }: DistributionScreenProps) {
    // 1. Initialize players and assign random roles when this screen loads
    const [players] = useState<Player[]>(() => {
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