import React, { useState } from 'react';
import { SavedGameState } from '../types';

interface StartScreenProps {
  onStart: (name: string) => void;
  onResume: (savedGame: SavedGameState) => void;
  savedGame: SavedGameState | null;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onResume, savedGame }) => {
  const [name, setName] = useState(savedGame?.playerName || '');

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
    <div className="text-center flex flex-col items-center justify-center min-h-screen animate-fadeIn p-4">
      {/* Hidden iframe for background music on the start screen */}
      <iframe
        src="https://drive.google.com/file/d/1AmyJyOeshKPlUG_cLuyHBabpLQ8_qK6F/preview"
        className="w-0 h-0 border-0 absolute"
        allow="autoplay"
        frameBorder="0"
        title="Game Song"
      ></iframe>

      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#D40511] mb-2">
        Who Wants to Be a
      </h1>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
        Cybersecurity Millionaire?
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-8">
        Test your knowledge, trust your instincts, and climb the ladder. One wrong click could cost you everything...
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter Your Name"
        className="w-full max-w-md bg-white text-gray-800 placeholder-gray-500 text-center text-2xl p-4 rounded-full border-2 border-gray-300 focus:border-[#D40511] focus:outline-none transition-all duration-300 mb-8 shadow-inner"
        aria-label="Player Name"
      />
      <button
        onClick={handleStart}
        disabled={!name.trim()}
        className={`bg-[#D40511] text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg transform transition-all duration-300 ease-in-out ${
          !name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:opacity-90'
        }`}
      >
        {savedGame ? 'Start New Game' : 'Start Game'}
      </button>
      {savedGame && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">or</p>
          <button
            onClick={() => onResume(savedGame)}
            className="bg-[#D40511] text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg hover:scale-105 hover:opacity-90 transform transition-transform duration-300 ease-in-out"
          >
            Resume: {savedGame.playerName} (Q{savedGame.currentQuestionIndex + 1})
          </button>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
