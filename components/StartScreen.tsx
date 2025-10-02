
import React from 'react';
import { LogoIcon } from './icons';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-screen animate-fadeIn">
      <div className="bg-white/10 p-8 rounded-full mb-8 shadow-2xl">
        <LogoIcon className="h-24 w-24 text-yellow-400" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mb-4">
        Who Wants to Be a
      </h1>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
        Cybersecurity Millionaire?
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-12">
        Test your knowledge, trust your instincts, and climb the ladder. One wrong click could cost you everything...
      </p>
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-yellow-400 to-amber-600 text-gray-900 font-bold py-4 px-12 rounded-full text-2xl shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
