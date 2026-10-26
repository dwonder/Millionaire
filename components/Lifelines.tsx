import React from 'react';
import { Lifelines, LifelineType } from '../types';
import { FiftyFiftyIcon, AudienceIcon, PhoneIcon, LightbulbIcon } from './icons';

interface LifelinesProps {
  lifelines: Lifelines;
  onUseLifeline: (type: LifelineType) => void;
}

const LIFELINE_CONFIG = [
  {
    type: LifelineType.FiftyFifty,
    title: '50 : 50',
    subtitle: 'Remove 2 False Answers',
    icon: <FiftyFiftyIcon className="w-6 h-6 text-[#FFCC00]" />,
  },
  {
    type: LifelineType.AskAudience,
    title: 'Ask Audience',
    subtitle: 'Poll 500 Cyber Pros',
    icon: <AudienceIcon className="w-6 h-6 text-[#FFCC00]" />,
  },
  {
    type: LifelineType.PhoneFriend,
    title: 'Smart Friend',
    subtitle: 'Call SOC Analyst Alex',
    icon: <PhoneIcon className="w-6 h-6 text-[#FFCC00]" />,
  },
  {
    type: LifelineType.SafetyClue,
    title: 'Safety Clue',
    subtitle: 'Rule-of-Thumb Hint',
    icon: <LightbulbIcon className="w-6 h-6 text-[#FFCC00]" />,
  },
];

export const LifelinesDisplay: React.FC<LifelinesProps> = ({ lifelines, onUseLifeline }) => {
  const availableCount = Object.values(lifelines).filter(Boolean).length;
  const totalCount = LIFELINE_CONFIG.length;

  return (
    <div className="w-full bg-[#454F63] border-2 border-slate-400/60 rounded-2xl p-3.5 sm:p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2 font-black tracking-wider text-white uppercase">
          <span className="text-[#FFCC00]">🛡️</span>
          <span>Your Safety Lifelines</span>
        </div>
        <div className="text-xs text-slate-200 font-semibold">
          Available: <span className="text-[#FFCC00] font-bold">{availableCount}</span> / {totalCount}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {LIFELINE_CONFIG.map(({ type, title, subtitle, icon }) => {
          const isAvailable = Boolean(lifelines[type]);

          return (
            <button
              key={type}
              onClick={() => isAvailable && onUseLifeline(type)}
              disabled={!isAvailable}
              aria-label={`${title}: ${subtitle}`}
              className={`group relative flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 ${
                isAvailable
                  ? 'bg-[#525D73] hover:bg-[#5E6B83] border-slate-400/80 hover:border-[#FFCC00] hover:scale-[1.02] shadow-md cursor-pointer active:scale-95'
                  : 'bg-[#394253] border-slate-500/60 opacity-40 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 transition-colors ${
                  isAvailable
                    ? 'bg-[#D40511] text-[#FFCC00] group-hover:bg-[#b0040e] shadow-sm'
                    : 'bg-slate-600 text-slate-400'
                }`}
              >
                {icon}
              </div>

              <div className="font-extrabold text-xs sm:text-sm text-white tracking-tight">
                {title}
              </div>
              <div className="text-[10px] text-slate-200 mt-0.5 line-clamp-1">
                {isAvailable ? subtitle : 'Used'}
              </div>

              {!isAvailable && (
                <div className="absolute top-2 right-2 text-[10px] font-bold text-red-300 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/50">
                  USED
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LifelinesDisplay;