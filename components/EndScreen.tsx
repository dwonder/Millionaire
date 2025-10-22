import React, { useEffect } from 'react';

declare var confetti: any;

interface EndScreenProps {
  score: string;
  isWinner: boolean;
  onRestart: () => void;
  playerName: string;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, isWinner, onRestart, playerName }) => {
  useEffect(() => {
    if (isWinner && typeof confetti === 'function') {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#D40511', '#FFFFFF', '#000000'] };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isWinner]);

  return (
    <div className="text-center flex flex-col items-center justify-center h-screen animate-fadeIn">
      {isWinner ? (
        <>
          <h1 className="text-5xl md:text-7xl font-black text-[#D40511] mb-4">
            Congratulations, {playerName}!
          </h1>
          <p className="text-2xl text-gray-800 mb-8">You are a Cybersecurity Millionaire!</p>
        </>
      ) : (
        <h1 className="text-5xl md:text-7xl font-black text-[#D40511] mb-4">
          Game Over, {playerName}
        </h1>
      )}
      <p className="text-xl text-gray-700 mb-4">You walk away with:</p>
      <p className="text-6xl font-bold text-[#D40511] mb-12">{score}</p>
      <button
        onClick={onRestart}
        className="bg-[#D40511] text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg hover:scale-105 hover:opacity-90 transform transition-transform duration-300 ease-in-out"
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;
