
import React from 'react';
import { AnswerState } from '../types';

interface AnswerOptionProps {
  optionLabel: string;
  optionText: string;
  state: AnswerState;
  onClick: () => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ optionLabel, optionText, state, onClick }) => {
  const getBackgroundColor = () => {
    switch (state) {
      case AnswerState.Selected:
        return 'animate-pulse bg-gradient-to-r from-orange-500 to-yellow-500';
      case AnswerState.Correct:
        return 'animate-flashCorrect bg-gradient-to-r from-green-500 to-teal-500';
      case AnswerState.Incorrect:
        return 'animate-flashIncorrect bg-gradient-to-r from-red-500 to-rose-500';
      case AnswerState.Disabled:
        return 'bg-gray-700 opacity-50';
      default:
        return 'bg-gradient-to-r from-indigo-800 to-indigo-900 hover:from-indigo-700 hover:to-indigo-800';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={state === AnswerState.Disabled || state === AnswerState.Correct || state === AnswerState.Incorrect}
      className={`
        w-full p-4 rounded-lg border-2 border-yellow-400
        flex items-center text-left text-xl font-medium
        transition-all duration-300 transform shadow-lg
        ${getBackgroundColor()}
        ${state !== AnswerState.Disabled ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
      `}
    >
      <span className="text-yellow-400 font-bold mr-4">{optionLabel}:</span>
      <span>{optionText}</span>
    </button>
  );
};

export default AnswerOption;
