import React, { useState, useEffect } from 'react';
import { SavedGameState } from '../types';
import { getPlayerCareerStats, PlayerCareerStats } from '../leaderboardClient';

interface StartScreenProps {
  onStart: (name: string) => void;
  onResume: (savedGame: SavedGameState) => void;
  savedGame: SavedGameState | null;
  recentPlayerName?: string;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  onResume,
  savedGame,
  recentPlayerName = '',
}) => {
  const [name, setName] = useState(savedGame?.playerName || recentPlayerName || '');
  const [playerStats, setPlayerStats] = useState<PlayerCareerStats>({
    attempts: 0,
    bestScore: '€0',
    bestScoreValue: 0,
    bestLevel: 0,
  });

  useEffect(() => {
    if (name.trim()) {
      const stats = getPlayerCareerStats(name);
      setPlayerStats(stats);
    } else {
      setPlayerStats({ attempts: 0, bestScore: '€0', bestScoreValue: 0, bestLevel: 0 });
    }
  }, [name]);

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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen py-8 px-4 animate-fadeIn">
      {/* Main Hero Card with lighter slate grey background */}
      <div className="text-center w-full bg-[#454F63] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-slate-400/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#D40511]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#FFCC00]/20 blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D40511] text-white font-black text-xs uppercase tracking-wider mb-4 shadow-md border border-[#FFCC00]/40">
          <span>🔒</span> Enterprise Cyber Threat Challenge
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FFCC00] mb-2 drop-shadow">
          Who Wants to Be a
        </h1>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Cybersecurity Millionaire?
        </h2>
        <p className="text-sm sm:text-base text-slate-100 mb-6 max-w-lg mx-auto font-medium leading-relaxed">
          15 high-stakes questions. 4 lifelines. One wrong click could compromise the company. Can you reach the €1,000,000 grand prize?
        </p>

        {/* Player Career Stats Banner if player has previous attempts */}
        {name.trim() && playerStats.attempts > 0 && (
          <div className="bg-[#525D73] border-2 border-[#FFCC00] rounded-2xl p-3.5 mb-6 text-left shadow-lg">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#FFCC00] font-black uppercase tracking-wider flex items-center gap-1.5">
                <span>🎮</span> Career Player Profile: {name}
              </span>
              <span className="bg-[#D40511] text-white px-2 py-0.5 rounded text-[10px] font-black">
                Run #{playerStats.attempts + 1}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="bg-[#394253] p-2 rounded-xl border border-slate-400/60">
                <div className="text-[10px] text-slate-200 font-bold uppercase">Total Runs</div>
                <div className="text-base sm:text-lg font-black text-white font-mono">
                  {playerStats.attempts} {playerStats.attempts === 1 ? 'play' : 'plays'}
                </div>
              </div>
              <div className="bg-[#394253] p-2 rounded-xl border border-slate-400/60">
                <div className="text-[10px] text-slate-200 font-bold uppercase">Personal Best</div>
                <div className="text-base sm:text-lg font-black text-[#FFCC00] font-mono">
                  {playerStats.bestScore}
                </div>
              </div>
              <div className="bg-[#394253] p-2 rounded-xl border border-slate-400/60">
                <div className="text-[10px] text-slate-200 font-bold uppercase">Highest Tier</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                  Q{playerStats.bestLevel} / 15
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input & Start Area */}
        <div className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Your Name / Handle"
            maxLength={30}
            className="w-full bg-[#525D73] text-white placeholder-slate-300 text-center text-xl sm:text-2xl py-4 px-6 rounded-full border-2 border-slate-400 focus:border-[#FFCC00] focus:outline-none transition-all duration-200 shadow-inner font-bold"
            aria-label="Player Name"
          />

          <button
            onClick={handleStart}
            disabled={!name.trim()}
            className={`w-full bg-[#D40511] hover:bg-[#b0040e] text-white font-black py-4 px-8 rounded-full text-xl sm:text-2xl shadow-xl transform transition-all duration-200 flex items-center justify-center gap-2 border-2 border-[#FFCC00]/50 ${
              !name.trim() ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <span>
              {savedGame
                ? 'Start New Run'
                : playerStats.attempts > 0
                ? `Launch Run #${playerStats.attempts + 1}`
                : 'Play & Climb Ladder'}
            </span>
            <span className="text-[#FFCC00]">→</span>
          </button>

          {savedGame && (
            <div className="pt-2">
              <button
                onClick={() => onResume(savedGame)}
                className="w-full bg-[#525D73] hover:bg-[#5E6B83] text-white font-bold py-3.5 px-6 rounded-full text-base sm:text-lg shadow-md border-2 border-slate-400 flex items-center justify-center gap-2"
              >
                <span>Resume: {savedGame.playerName} (Q{savedGame.currentQuestionIndex + 1})</span>
              </button>
            </div>
          )}

          <p className="pt-3 text-xs text-slate-200 font-semibold">
            {playerStats.attempts > 0
              ? `You have played ${playerStats.attempts} times. Play again to climb the Top 10 Hall of Fame!`
              : 'Complete the challenge to view your rank in the Top 10 Hall of Fame!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
