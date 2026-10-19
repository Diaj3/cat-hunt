import { useState } from 'react';
import OwlPhase from '../components/OwlPhase';
import GuardDogPhase from '../components/GuardDogPhase';

import CatPhase from '../components/CatPhase';
import type { Player } from '../types/player';
import PhasesHeader from '../components/PhasesHeader';

interface NightScreenProps {
  players: Player[];
  onNightComplete: (
    updatedPlayers: Player[],
    eliminatedPlayer: Player | null,
  ) => void;
}

type NightPhase = 'CATS' | 'GUARD_DOG' | 'OWL';

export default function NightScreen({
  players,
  onNightComplete,
}: NightScreenProps) {
  const [phase, setPhase] = useState<NightPhase>('CATS');

  // Targets selected by roles
  const [catTargetId, setCatTargetId] = useState<number | null>(null);
  const [guardTargetId, setGuardTargetId] = useState<number | null>(null);

  // In-game role checks
  const isGuardDogInGame = players.some((p) => p.role === 'GUARD DOG');
  const isOwlInGame = players.some((p) => p.role === 'OWL');

  // Alive role checks
  const livingPlayers = players.filter((p) => p.isAlive);
  const isGuardDogAlive = players.some(
    (p) => p.role === 'GUARD DOG' && p.isAlive,
  );
  const isOwlAlive = players.some((p) => p.role === 'OWL' && p.isAlive);

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
    handleStartDay();
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
    onNightComplete(updatedPlayers, eliminatedPlayer);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        <PhasesHeader
          phase="🌙 Night Phase"
          additionalInfo={`Step: ${phase}`}
        />

        {phase === 'CATS' && (
          <CatPhase
            livingPlayers={livingPlayers}
            catTargetId={catTargetId}
            setCatTargetId={setCatTargetId}
            onNext={handleNextFromCats}
          />
        )}

        {phase === 'GUARD_DOG' && (
          <GuardDogPhase
            isGuardDogAlive={isGuardDogAlive}
            livingPlayers={livingPlayers}
            onSetGuardedTargetId={setGuardTargetId}
            guardedTargetId={guardTargetId}
            onNext={handleNextFromGuardDog}
          />
        )}

        {phase === 'OWL' && (
          <OwlPhase
            isOwlAlive={isOwlAlive}
            livingPlayers={livingPlayers}
            onNext={handleNextFromOwl}
          />
        )}
      </div>
    </div>
  );
}
