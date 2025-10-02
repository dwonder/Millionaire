
import React, { useState } from 'react';
import { LogoIcon } from './icons';

interface StartScreenProps {
  onStart: (name: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      onStart(name);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center h-screen animate-fadeIn">
      <div className="bg-white/10 p-8 rounded-full mb-8 shadow-2xl">
        <LogoIcon className="h-24 w-24 text-yellow-400" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mb-4">
        Who Wants to Be a
      </h1>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
        Cybersecurity Millionaire?
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
        Test your knowledge, trust your instincts, and climb the ladder. One wrong click could cost you everything...
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter Your Name"
        className="w-full max-w-md bg-white/10 text-white placeholder-gray-400 text-center text-2xl p-4 rounded-full border-2 border-transparent focus:border-yellow-400 focus:outline-none transition-all duration-300 mb-8 shadow-inner"
        aria-label="Player Name"
      />
      <button
        onClick={handleStart}
        disabled={!name.trim()}
        className={`bg-gradient-to-r from-yellow-400 to-amber-600 text-gray-900 font-bold py-4 px-12 rounded-full text-2xl shadow-lg transform transition-all duration-300 ease-in-out ${
          !name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
