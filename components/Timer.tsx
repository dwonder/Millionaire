import React from 'react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  compact?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime, compact = false }) => {
  const isUrgent = timeLeft <= 15;
  const isWarning = timeLeft <= 30;

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
          isUrgent
            ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse ring-2 ring-red-500/40'
            : isWarning
            ? 'bg-[#394253] border-[#FFCC00]/70 text-[#FFCC00]'
            : 'bg-[#525D73] border-slate-400 text-white'
        }`}
      >
        <span className="text-sm">⏱</span>
        <span className="font-mono font-black text-sm tracking-tight">{timeLeft}s</span>
        <div className="w-2 h-2 rounded-full bg-current animate-ping"></div>
      </div>
    );
  }

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / totalTime) * circumference;

  return (
    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 ${isUrgent ? 'animate-pulse' : ''}`}>
      <svg className="w-full h-full" viewBox="0 0 70 70">
        <circle
          className="stroke-slate-400"
          strokeWidth="6"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
        <circle
          className={`transition-all duration-1000 ease-linear ${
            isUrgent ? 'stroke-[#D40511]' : isWarning ? 'stroke-[#FFCC00]' : 'stroke-white'
          }`}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
          transform="rotate(-90 35 35)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-mono font-black text-xl sm:text-2xl ${
            isUrgent ? 'text-[#D40511]' : isWarning ? 'text-[#FFCC00]' : 'text-white'
          }`}
        >
          {timeLeft}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-slate-200 font-bold -mt-1">
          SEC
        </span>
      </div>
    </div>
  );
};

export default Timer;