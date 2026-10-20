import { MINI_ROLE_DESCRIPTIONS } from '../utils/get-role-description';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="text-lg font-bold text-slate-100">
              Cat Hunt Rules & Roles
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 text-sm font-semibold px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm">
          <section className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-amber-500">
              Objective
            </h3>
            <p className="leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <strong className="text-slate-100">Mice & Specials:</strong> Work
              together during the day to identify and eliminate all Cats.
              <br />
              <strong className="text-slate-100">Cats:</strong> Blend in during
              discussions and eliminate Mice each night until equal in number.
              <br />
              <strong className="text-slate-100">Raccoon:</strong> Work by
              yourself to trick the Mice into voting you out during the day to
              win the game alone!
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-amber-500">
              Roles & Abilities
            </h3>

            <div className="space-y-2">
              {Object.entries(MINI_ROLE_DESCRIPTIONS).map(
                ([roleName, meta]) => (
                  <div
                    key={roleName}
                    className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1"
                  >
                    <div className="flex items-center gap-2 font-bold text-amber-400">
                      <span>{meta.icon}</span>
                      <span>{roleName}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">
                      {meta.shortDesc}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-mono font-bold text-amber-500">
              Night Sequence
            </h3>
            <div className="space-y-1 text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <ol className="list-decimal list-inside">
                <li>Everyone closes their eyes.</li>
                <li>
                  <strong className="text-slate-200">Cats</strong> wake up to
                  choose a target to eliminate.
                </li>
                <li>
                  <strong className="text-slate-200">Guard Dog</strong> wakes up
                  to protect one player.
                </li>
                <li>
                  <strong className="text-slate-200">Owl</strong> wakes up to
                  inspect one player’s true identity.
                </li>
                <li>Everyone wakes up for Day phase discussion!</li>
                <br />
              </ol>
              <strong className="text-slate-200">Important:</strong> During
              night, all actions should be performed{' '}
              <strong className="text-slate-200">silently </strong>
              and discretely. Use hand signals or body language to communicate
              your actions without revealing your role to others. The Host will
              guide the flow of the game and announce when each role should wake
              up and perform their actions.
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/90 text-center">
          <button
            onClick={onClose}
            className="w-full bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl cursor-pointer"
          >
            Got it, back to the game!
          </button>
        </div>
      </div>
    </div>
  );
}
