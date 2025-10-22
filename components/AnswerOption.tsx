import React from 'react';
import { AnswerState } from '../types';

interface AnswerOptionProps {
  optionLabel: string;
  optionText: string;
  state: AnswerState;
  onClick: () => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ optionLabel, optionText, state, onClick }) => {
  const isHighlighted = state === AnswerState.Selected || state === AnswerState.Correct || state === AnswerState.Incorrect;
  
  const getBackgroundColor = () => {
    switch (state) {
      case AnswerState.Selected:
        return 'animate-pulse bg-[#D40511]';
      case AnswerState.Correct:
        return 'animate-flashCorrect bg-green-500';
      case AnswerState.Incorrect:
        return 'animate-flashIncorrect bg-red-600';
      case AnswerState.Disabled:
        return 'bg-gray-300 text-gray-500 opacity-70';
      default:
        return 'bg-white hover:bg-gray-100';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={state === AnswerState.Disabled || state === AnswerState.Correct || state === AnswerState.Incorrect}
      className={`
        w-full p-4 rounded-lg border-2 border-[#D40511]
        flex items-center text-left text-xl font-medium
        transition-all duration-300 transform shadow-lg
        ${getBackgroundColor()}
        ${isHighlighted ? 'text-white' : 'text-gray-800'}
        ${state !== AnswerState.Disabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
      `}
    >
      <span className={`font-bold mr-4 ${isHighlighted ? 'text-white' : 'text-[#D40511]'}`}>{optionLabel}:</span>
      <span>{optionText}</span>
    </button>
  );
};

export default AnswerOption;
