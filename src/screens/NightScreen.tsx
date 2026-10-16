import { useState } from 'react';
import type { Player } from '../types/game';
import OwlPhase from '../components/OwlPhase';
import GuardDogPhase from '../components/GuardDogPhase';

import morning from './../assets/others/morning.jpeg';
import CatPhase from '../components/CatPhase';

interface NightScreenProps {
  players: Player[];
  onNightComplete: (
    updatedPlayers: Player[],
    eliminatedPlayerId: number | null,
  ) => void;
}

type NightPhase = 'CATS' | 'GUARD_DOG' | 'OWL' | 'SUMMARY';

export default function NightScreen({
  players,
  onNightComplete,
}: NightScreenProps) {
  const [phase, setPhase] = useState<NightPhase>('CATS');

  // Targets selected by roles
  const [catTargetId, setCatTargetId] = useState<number | null>(null);
  const [guardTargetId, setGuardTargetId] = useState<number | null>(null);

  // In-game role checks
  const isGuardDogInGame = players.some((p) => p.role === 'Guard Dog');
  const isOwlInGame = players.some((p) => p.role === 'Owl');

  // Alive role checks
  const livingPlayers = players.filter((p) => p.isAlive);
  const isGuardDogAlive = players.some(
    (p) => p.role === 'Guard Dog' && p.isAlive,
  );
  const isOwlAlive = players.some((p) => p.role === 'Owl' && p.isAlive);

  // Phase Handlers
  const handleNextFromCats = () => {
    if (isGuardDogInGame) {
      setPhase('GUARD_DOG');
    } else {
      handleNextFromGuardDog();
    }
  };

  const handleNextFromGuardDog = () => {
    if (isOwlInGame) {
      setPhase('OWL');
    } else {
      handleNextFromOwl();
    }
  };

  const handleNextFromOwl = () => {
    setPhase('SUMMARY');
  };

  // Calculate elimination result
  const eliminatedPlayer =
    catTargetId !== null && catTargetId !== guardTargetId
      ? (players.find((p) => p.id === catTargetId) ?? null)
      : null;

  const handleStartDay = () => {
    const updatedPlayers = players.map((p) =>
      eliminatedPlayer && p.id === eliminatedPlayer.id
        ? { ...p, isAlive: false }
        : p,
    );
    onNightComplete(
      updatedPlayers,
      eliminatedPlayer ? eliminatedPlayer.id : null,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        {/* HEADER BADGE */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase text-amber-500 tracking-wider">
            🌙 Night Phase
          </span>
          <span className="text-xs bg-slate-950 text-slate-400 px-2.5 py-1 rounded-full border border-slate-800 font-mono">
            Step: {phase}
          </span>
        </div>

        {/* ---------------- 1. CATS PHASE ---------------- */}
        {phase === 'CATS' && (
          <CatPhase
            livingPlayers={livingPlayers}
            catTargetId={catTargetId}
            setCatTargetId={setCatTargetId}
            onNext={handleNextFromCats}
          />
        )}

        {/* ---------------- 2. GUARD DOG PHASE ---------------- */}
        {phase === 'GUARD_DOG' && (
          <GuardDogPhase
            isGuardDogAlive={isGuardDogAlive}
            livingPlayers={livingPlayers}
            onSetGuardedTargetId={setGuardTargetId}
            guardedTargetId={guardTargetId}
            onNext={handleNextFromGuardDog}
          />
        )}

        {/* ---------------- 3. OWL PHASE ---------------- */}
        {phase === 'OWL' && (
          <OwlPhase
            isOwlAlive={isOwlAlive}
            livingPlayers={livingPlayers}
            onNext={handleNextFromOwl}
          />
        )}

        {/* ---------------- 4. NIGHT SUMMARY / DAWN ---------------- */}
        {phase === 'SUMMARY' && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center mt-4">
              <img
                src={morning}
                className="bg-slate-950 border border-slate-800 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-amber-500">
                Morning Has Broken!
              </h2>
              <p className="text-xs text-slate-400">
                Host, tell everyone to wake up, then announce the night's result
                below.
              </p>
            </div>

            {/* MORNING REVEAL CARD */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2 text-center">
              <h3 className="text-xs uppercase font-mono text-slate-400">
                Night Outcome
              </h3>
              {eliminatedPlayer ? (
                <div className="space-y-1">
                  <p className="text-xl font-bold text-red-400">
                    💀 {eliminatedPlayer.name} was eliminated!
                  </p>
                  <p className="text-xs text-slate-400">
                    They must remain silent for the rest of the game.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xl font-bold text-emerald-400">
                    🛡️ No one was eliminated!
                  </p>
                  <p className="text-xs text-slate-400">
                    The Guard Dog successfully protected the target!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleStartDay}
              className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3.5 rounded-xl transition-colors cursor-pointer shadow-lg"
            >
              Begin Day Discussion & Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
