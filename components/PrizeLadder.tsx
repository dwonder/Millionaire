import React, { useEffect, useRef } from 'react';
import { PRIZE_LADDER } from '../constants';

interface PrizeLadderProps {
  currentLevel: number;
}

const PrizeLadder: React.FC<PrizeLadderProps> = ({ currentLevel }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Initialize the refs array to the correct size
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, PRIZE_LADDER.length);
  }, []);

  useEffect(() => {
    // The prize ladder array is ordered from 15 down to 1. The map index is 0-14.
    // The visual list is now ordered from top to bottom (15 to 1).
    // currentLevel 1 -> prize at PRIZE_LADDER[14] -> ref index 14
    // currentLevel 15 -> prize at PRIZE_LADDER[0] -> ref index 0
    // The correct index in the refs array is: PRIZE_LADDER.length - currentLevel
    const itemIndex = PRIZE_LADDER.length - currentLevel;
    const currentItem = itemRefs.current[itemIndex];

    if (currentItem) {
      // Delay scrolling slightly to make the animation feel smoother after a re-render
      setTimeout(() => {
        currentItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }, [currentLevel]);

  return (
    <div className="bg-black/30 p-4 rounded-lg shadow-lg backdrop-blur-sm h-full">
      <ul ref={listRef} className="h-full overflow-y-auto flex flex-col no-scrollbar">
        {PRIZE_LADDER.map((item, index) => (
          <li
            key={item.level}
            // FIX: The ref callback should not return a value. Changed from an implicit return arrow function to a block body.
            ref={(el) => { itemRefs.current[index] = el; }}
            className={`
              flex justify-between items-center text-lg p-2 my-1 rounded transition-all duration-300 ease-in-out
              ${
                currentLevel === item.level
                  ? 'bg-yellow-500 text-black font-bold scale-105 shadow-lg shadow-yellow-500/50'
                  : item.isSafeZone
                  ? 'text-cyan-300 font-semibold bg-indigo-900/60'
                  : 'text-gray-300'
              }
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