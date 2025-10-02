
import React from 'react';
import { PRIZE_LADDER } from '../constants';

interface PrizeLadderProps {
  currentLevel: number;
}

const PrizeLadder: React.FC<PrizeLadderProps> = ({ currentLevel }) => {
  return (
    <div className="bg-black/30 p-4 rounded-lg shadow-lg backdrop-blur-sm">
      <ul className="flex flex-col-reverse">
        {PRIZE_LADDER.map((item) => (
          <li
            key={item.level}
            className={`
              flex justify-between items-center text-lg p-2 my-1 rounded transition-all duration-300
              ${currentLevel === item.level ? 'bg-yellow-500 text-black font-bold scale-105' : ''}
              ${item.isSafeZone ? 'text-cyan-300 font-semibold' : 'text-gray-300'}
            `}
          >
            <span className="w-8">{item.level}</span>
            <span className="font-bold">{item.prize}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrizeLadder;
