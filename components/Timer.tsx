import React from 'react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / totalTime) * circumference;

  const getTimerColor = () => {
    if (timeLeft <= 10) return 'stroke-red-500';
    if (timeLeft <= 20) return 'stroke-yellow-400';
    return 'stroke-cyan-400';
  };

  return (
    <div className={`relative w-32 h-32 ${timeLeft <= 10 ? 'animate-pulse' : ''}`}>
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          className="stroke-current text-gray-700"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        {/* Progress circle */}
        <circle
          className={`transition-stroke duration-1000 ease-linear ${getTimerColor()}`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-4xl md:text-5xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-white'}`}>
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default Timer;
