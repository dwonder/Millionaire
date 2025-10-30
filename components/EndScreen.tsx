import React, { useEffect, useState } from 'react';

declare var confetti: any;
declare var html2canvas: any;

interface EndScreenProps {
  score: string;
  isWinner: boolean;
  onRestart: () => void;
  playerName: string;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, isWinner, onRestart, playerName }) => {
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

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

  const handleScreenshot = () => {
    if (typeof html2canvas !== 'function') {
      console.error('html2canvas library is not loaded.');
      alert('Screenshot feature is not available at the moment.');
      return;
    }
    
    const buttonsContainer = document.getElementById('end-screen-buttons');
    if (buttonsContainer) {
      buttonsContainer.style.visibility = 'hidden';
    }

    // Give a slight delay for the DOM to update before taking the screenshot
    setTimeout(() => {
        html2canvas(document.body).then(canvas => {
            if (buttonsContainer) {
                buttonsContainer.style.visibility = 'visible';
            }
            const link = document.createElement('a');
            link.download = `cyber-millionaire-score-${playerName || 'player'}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }, 100);
  };

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
      <div className="mb-12 text-center">
        <p className="text-6xl font-bold text-[#D40511]">{score}</p>
        <p className="text-xs text-gray-600 mt-2">{timestamp.toLocaleString()}</p>
      </div>
      <div id="end-screen-buttons" className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="bg-[#D40511] text-white font-bold py-4 px-8 rounded-full text-2xl shadow-lg hover:scale-105 hover:opacity-90 transform transition-transform duration-300 ease-in-out"
        >
          Play Again
        </button>
        <button
          onClick={handleScreenshot}
          className="bg-white text-[#D40511] border-2 border-[#D40511] font-bold py-4 px-8 rounded-full text-2xl shadow-lg hover:scale-105 hover:bg-gray-100 transform transition-all duration-300 ease-in-out"
        >
          Take a screenshot of your score
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
