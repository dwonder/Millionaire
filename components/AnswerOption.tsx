import React from 'react';
import { AnswerState } from '../types';

interface AnswerOptionProps {
  optionLabel: string;
  optionText: string;
  state: AnswerState;
  onClick: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  optionLabel,
  optionText,
  state,
  onClick,
}) => {
  const isSelected = state === AnswerState.Selected;
  const isCorrect = state === AnswerState.Correct;
  const isIncorrect = state === AnswerState.Incorrect;
  const isDisabled = state === AnswerState.Disabled;

  const getCardClasses = () => {
    if (isCorrect) {
      return 'bg-emerald-600 border-2 border-emerald-300 text-white shadow-xl shadow-emerald-950/70 scale-[1.01]';
    }
    if (isIncorrect) {
      return 'bg-red-600 border-2 border-red-300 text-white shadow-xl shadow-red-950/70';
    }
    if (isSelected) {
      return 'bg-[#D40511] border-2 border-[#FFCC00] text-white shadow-2xl shadow-red-950/80 ring-4 ring-[#FFCC00]/50 animate-pulse';
    }
    if (isDisabled) {
      return 'bg-[#394253] border-2 border-slate-500 text-slate-400 opacity-35 cursor-not-allowed';
    }
    return 'bg-[#4C576D] hover:bg-[#59667F] border-2 border-slate-400/80 hover:border-[#FFCC00] text-white shadow-lg cursor-pointer hover:scale-[1.01] active:scale-95';
  };

  const getBadgeClasses = () => {
    if (isCorrect) return 'bg-emerald-900 text-white border-2 border-emerald-300';
    if (isIncorrect) return 'bg-red-900 text-white border-2 border-red-300';
    if (isSelected) return 'bg-[#FFCC00] text-gray-950 border-2 border-white font-black';
    if (isDisabled) return 'bg-slate-600 text-slate-400 border-slate-500';
    return 'bg-[#394253] text-[#FFCC00] border-2 border-slate-400 group-hover:border-[#FFCC00] group-hover:bg-[#FFCC00] group-hover:text-gray-950';
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isCorrect || isIncorrect}
      className={`group w-full p-4 sm:p-5 rounded-2xl flex items-start text-left transition-all duration-200 ${getCardClasses()}`}
    >
      {/* Letter Badge */}
      <span
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm sm:text-base shrink-0 mr-3.5 transition-all shadow-sm ${getBadgeClasses()}`}
      >
        {optionLabel}
      </span>

      {/* Option Text in crisp high-contrast white */}
      <span className="text-sm sm:text-base font-bold leading-relaxed self-center text-white">
        {optionText}
      </span>
    </button>
  );
};

export default AnswerOption;
