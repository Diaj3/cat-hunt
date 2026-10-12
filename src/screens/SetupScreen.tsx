import { useState, type FormEvent } from 'react';

interface SetupScreenProps {
    onStartGame: (players: string[]) => void;
}

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
    const [currentName, setCurrentName] = useState<string>('');
    const [players, setPlayers] = useState<string[]>([]);

    // Handle adding a player to the list
    const handleAddPlayer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedName = currentName.trim();

        if (!trimmedName) return;
        if (players.includes(trimmedName)) {
            alert('This player name is already added!');
            return;
        }

        setPlayers([...players, trimmedName]);
        setCurrentName(''); // Reset input box
    };

    // Handle removing a player card
    const handleRemovePlayer = (indexToRemove: number) => {
        setPlayers(players.filter((_, index) => index !== indexToRemove));
    };

    // Final validation and start
    const handleStartClick = () => {
        // TODO: Validate minimum number of players (e.g., at least 4)
        if (players.length < 4) {
            alert('You need at least 4 players for Wolf Hunt!');
            return;
        }
        onStartGame(players);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-center text-amber-500 mb-2">Wolf Hunt</h1>
                    <p className="text-slate-400 text-center text-sm">Add your players to the roster</p>
                </div>

                {/* Input & Add Button Form */}
                <form onSubmit={handleAddPlayer} className="flex gap-2">
                    <input
                        type="text"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                        placeholder="Enter player name..."
                    />
                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold px-5 rounded-xl transition-colors cursor-pointer"
                    >
                        Add
                    </button>
                </form>

                {/* Player Cards List Box */}
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {players.length === 0 ? (
                        <p className="text-center text-slate-500 text-sm py-4">No players added yet.</p>
                    ) : (
                        players.map((name, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500 font-mono">#{index + 1}</span>
                                    <span className="font-medium text-slate-200">{name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemovePlayer(index)}
                                    className="text-slate-500 hover:text-red-400 text-xs font-medium transition-colors cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Start Game Button */}
                <button
                    type="button"
                    onClick={handleStartClick}
                    // TODO: This hasn't been validated yet
                    disabled={players.length < 4}
                    className={`w-full font-semibold py-3 rounded-xl transition-colors ${players.length >= 4
                        ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    Start Game ({players.length} Players)
                </button>
            </div>
        </div>
    );
}