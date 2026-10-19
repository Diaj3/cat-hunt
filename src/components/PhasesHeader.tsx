interface PhasesHeaderProps {
  phase: string;
  additionalInfo: string;
}

export default function PhasesHeader({
  phase,
  additionalInfo,
}: PhasesHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
      <span className="text-xs font-mono uppercase text-amber-500 tracking-wider">
        {phase}
      </span>
      <span className="text-xs bg-slate-950 text-slate-400 px-2.5 py-1 rounded-full border border-slate-800 font-mono">
        {additionalInfo}
      </span>
    </div>
  );
}
