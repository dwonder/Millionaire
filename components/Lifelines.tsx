import React from 'react';
import { Lifelines, LifelineType } from '../types';
import { FiftyFiftyIcon, AudienceIcon, PhoneIcon } from './icons';

interface LifelinesProps {
  lifelines: Lifelines;
  onUseLifeline: (type: LifelineType) => void;
}

const LifelineButton: React.FC<{
  type: LifelineType,
  isAvailable: boolean,
  onClick: (type: LifelineType) => void,
  children: React.ReactNode
  'aria-label': string;
}> = ({ type, isAvailable, onClick, children, 'aria-label': ariaLabel }) => {
  return (
    <button
      onClick={() => isAvailable && onClick(type)}
      disabled={!isAvailable}
      aria-label={ariaLabel}
      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 transform
        ${isAvailable ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-gray-900 shadow-lg hover:scale-110' : 'bg-gray-700 cursor-not-allowed'}
      `}
    >
      {children}
      {!isAvailable && <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center text-white text-4xl font-black rounded-full">X</div>}
    </button>
  );
};

const lifelineData = [
    { type: LifelineType.FiftyFifty, label: '50:50', icon: <FiftyFiftyIcon className="w-full h-full p-3"/> },
    { type: LifelineType.AskAudience, label: 'Ask Audience', icon: <AudienceIcon className="w-full h-full p-3"/> },
    { type: LifelineType.PhoneFriend, label: 'Phone Friend', icon: <PhoneIcon className="w-full h-full p-3"/> },
];

const LifelinesDisplay: React.FC<LifelinesProps> = ({ lifelines, onUseLifeline }) => {
  return (
    <div className="flex justify-center md:justify-end space-x-4 p-4">
        {lifelineData.map(({type, label, icon}) => (
            <div key={type} className="flex flex-col items-center">
                <LifelineButton 
                    type={type} 
                    isAvailable={lifelines[type]} 
                    onClick={onUseLifeline}
                    aria-label={label}
                >
                    {icon}
                </LifelineButton>
                <span className={`mt-2 text-white text-xs font-semibold transition-opacity ${!lifelines[type] ? 'opacity-50' : ''}`}>
                    {label}
                </span>
            </div>
        ))}
    </div>
  );
};

export default LifelinesDisplay;