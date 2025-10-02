
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
}> = ({ type, isAvailable, onClick, children }) => {
  return (
    <button
      onClick={() => isAvailable && onClick(type)}
      disabled={!isAvailable}
      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 transform
        ${isAvailable ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-gray-900 shadow-lg hover:scale-110' : 'bg-gray-700 cursor-not-allowed'}
      `}
    >
      {children}
      {!isAvailable && <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center text-white text-4xl font-black rounded-full">X</div>}
    </button>
  );
};

const LifelinesDisplay: React.FC<LifelinesProps> = ({ lifelines, onUseLifeline }) => {
  return (
    <div className="flex justify-center md:justify-end space-x-4 p-4">
      <LifelineButton type={LifelineType.FiftyFifty} isAvailable={lifelines.fiftyFifty} onClick={onUseLifeline}>
        <FiftyFiftyIcon className="w-full h-full p-3"/>
      </LifelineButton>
      <LifelineButton type={LifelineType.AskAudience} isAvailable={lifelines.askAudience} onClick={onUseLifeline}>
        <AudienceIcon className="w-full h-full p-3"/>
      </LifelineButton>
      <LifelineButton type={LifelineType.PhoneFriend} isAvailable={lifelines.phoneFriend} onClick={onUseLifeline}>
        <PhoneIcon className="w-full h-full p-3"/>
      </LifelineButton>
    </div>
  );
};

export default LifelinesDisplay;
