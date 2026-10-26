import React, { useEffect, useRef } from 'react';
import { PRIZE_LADDER } from '../constants';
import { VaultIcon } from './icons';

interface PrizeLadderProps {
  currentLevel: number;
}

export const PrizeLadder: React.FC<PrizeLadderProps> = ({ currentLevel }) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Current level 1 is index 14 in PRIZE_LADDER, level 15 is index 0
    const itemIndex = PRIZE_LADDER.length - currentLevel;
    const currentItem = itemRefs.current[itemIndex];

    if (currentItem) {
      setTimeout(() => {
        currentItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  }, [currentLevel]);

  // Compute guaranteed banked amount
  const getBankedAmount = () => {
    if (currentLevel > 15) return '€1,000,000';
    if (currentLevel > 10) return '€32,000';
    if (currentLevel > 5) return '€1,000';
    return '€0';
  };

  return (
    <div className="flex flex-col h-full bg-[#454F63] border-2 border-slate-400/60 rounded-2xl p-3.5 sm:p-4 text-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-400/60">
        <div className="flex items-center gap-2 font-black tracking-wider uppercase text-xs">
          <span className="text-[#FFCC00]">🏆</span>
          <span>Safety Ladder</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#525D73] text-[#FFCC00] border border-slate-400/80">
          15 Tiers
        </span>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[10px] text-slate-200 py-2 border-b border-slate-400/50">
        <span className="flex items-center gap-1 text-amber-300">
          <span>🔒</span> Guaranteed Milestone
        </span>
        <span className="flex items-center gap-1 text-[#FFCC00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D40511] inline-block animate-pulse"></span> Active Step
        </span>
      </div>

      {/* Tiers List */}
      <ul className="flex-grow overflow-y-auto my-2 space-y-1 pr-1 text-xs no-scrollbar">
        {PRIZE_LADDER.map((item, index) => {
          const isActive = currentLevel === item.level;
          const isPassed = currentLevel > item.level;

          return (
            <li
              key={item.level}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#D40511] text-white font-extrabold shadow-lg shadow-red-900/60 ring-2 ring-[#FFCC00] scale-[1.02]'
                  : isPassed
                  ? 'bg-[#394253]/80 text-slate-300 line-through decoration-emerald-400/70'
                  : item.isSafeZone
                  ? 'bg-[#394253] text-[#FFCC00] font-bold border-2 border-[#FFCC00]/70 shadow-sm'
                  : 'bg-[#525D73] text-slate-100 hover:bg-[#5E6B83]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-5 text-right font-mono font-bold text-slate-200 text-[11px]">
                  {item.level}
                </span>

                {item.isSafeZone && (
                  <span className="text-[10px]" title="Guaranteed Safe Haven">
                    🔒
                  </span>
                )}

                <span className="truncate text-[11px] font-medium text-slate-100">
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className={`font-mono font-extrabold text-[12px] ${isActive ? 'text-white' : item.isSafeZone ? 'text-[#FFCC00]' : 'text-slate-100'}`}>
                  {item.prize}
                </span>
                {isActive && <span className="text-[#FFCC00] font-bold text-xs">←</span>}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Safety Vault Banked Card */}
      <div className="bg-[#525D73] border border-slate-400/70 rounded-xl p-3 text-center my-2 shadow-inner">
        <div className="text-[10px] font-bold tracking-wider text-slate-200 uppercase flex items-center justify-center gap-1 mb-0.5">
          <VaultIcon className="w-3.5 h-3.5 text-[#FFCC00]" />
          <span>Safety Vault Banked:</span>
        </div>
        <div className="text-xl sm:text-2xl font-black text-[#FFCC00] tracking-tight">
          {getBankedAmount()}
        </div>
        <div className="text-[10px] text-slate-200 mt-0.5">
          Guaranteed take-home payout
        </div>
      </div>

      {/* Microlearning tip */}
      <div className="bg-[#394253] border border-slate-400/60 rounded-xl p-2.5 text-[10px] text-slate-200 leading-snug">
        <span className="font-bold text-white block mb-0.5">👥 Share with Colleagues:</span>
        Over 80% of real security scams are stopped just by discussing unusual requests with a peer.
      </div>
    </div>
  );
};

export default PrizeLadder;
