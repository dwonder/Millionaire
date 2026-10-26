import React, { useEffect, useState, useCallback } from 'react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../leaderboardClient';
import { TrophyIcon, RefreshIcon } from './icons';

interface LeaderboardProps {
  highlightPlayerName?: string;
  currentPlayerScore?: string;
  currentPlayerRank?: number;
  currentPlayerAttempts?: number;
  className?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  highlightPlayerName,
  currentPlayerScore,
  currentPlayerRank,
  currentPlayerAttempts,
  className = '',
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchScores = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await getLeaderboard();
      setEntries(data.entries.slice(0, 10));
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-yellow-600 text-gray-950 font-black text-sm shadow-md border-2 border-yellow-200 ring-2 ring-yellow-400/50">
            🥇 1
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 via-slate-300 to-gray-400 text-gray-950 font-black text-sm shadow-md border-2 border-white ring-2 ring-slate-300/50">
            🥈 2
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white font-black text-sm shadow-md border-2 border-amber-500 ring-2 ring-amber-600/50">
            🥉 3
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-extrabold text-sm border-2 border-gray-300">
            #{rank}
          </span>
        );
    }
  };

  const isPlayerInTop10 = currentPlayerRank && currentPlayerRank > 0 && currentPlayerRank <= 10;

  return (
    <div className={`w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border-4 border-slate-400/40 overflow-hidden text-left ${className}`}>
      {/* Header Bar */}
      <div className="bg-[#454F63] text-white p-5 sm:p-6 border-b-2 border-slate-400/60">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D40511] flex items-center justify-center shadow-lg border border-[#FFCC00]/40">
              <TrophyIcon className="w-7 h-7 text-[#FFCC00]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Top 10 Cybersecurity Hall of Fame
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
                Top 10 scores achieved across all security challenges
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchScores(true)}
              disabled={refreshing || loading}
              className="p-2.5 rounded-xl bg-[#525D73] hover:bg-[#5E6B83] text-gray-100 transition-all border border-slate-400 active:scale-95 disabled:opacity-50"
              title="Refresh Leaderboard"
              aria-label="Refresh Leaderboard"
            >
              <RefreshIcon className={`w-4 h-4 text-[#FFCC00] ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Player Standing Highlight Banner */}
        {currentPlayerRank && currentPlayerRank > 10 && (
          <div className="mt-4 p-3.5 rounded-2xl bg-[#525D73] border-2 border-[#FFCC00] text-sm text-[#FFCC00] flex items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span>
                Your Standing: <strong className="text-white font-black">Rank #{currentPlayerRank}</strong> ({currentPlayerScore || '€0'})
                {currentPlayerAttempts && currentPlayerAttempts > 0 && (
                  <span className="ml-2 text-xs text-slate-100 font-bold bg-[#394253] px-2 py-0.5 rounded-full border border-slate-400">
                    Run #{currentPlayerAttempts}
                  </span>
                )}
              </span>
            </div>
            <span className="text-xs text-slate-200 font-semibold hidden sm:inline">
              Keep training to breach the Top 10!
            </span>
          </div>
        )}

        {isPlayerInTop10 && (
          <div className="mt-4 p-3.5 rounded-2xl bg-[#1c2e24] border-2 border-emerald-400 text-sm text-emerald-200 flex items-center justify-between gap-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <span>
                Congratulations! You are officially ranked <strong className="text-white font-black">#{currentPlayerRank}</strong> in the Hall of Fame!
                {currentPlayerAttempts && currentPlayerAttempts > 0 && (
                  <span className="ml-2 text-xs text-emerald-300 font-bold bg-[#14231b] px-2 py-0.5 rounded-full border border-emerald-500/50">
                    Achieved in {currentPlayerAttempts} {currentPlayerAttempts === 1 ? 'run' : 'runs'}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Top 3 Podium Cards */}
      {entries.length >= 3 && !loading && (
        <div className="bg-[#F8FAFC] px-4 py-5 sm:px-6 border-b-2 border-gray-200">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {/* 2nd Place */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 text-center border-2 border-slate-300 shadow-sm flex flex-col justify-between order-1">
              <div>
                <span className="inline-block text-2xl mb-1">🥈</span>
                <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider">2nd Place</div>
                <div className="font-black text-gray-950 text-sm sm:text-base truncate" title={entries[1].playerName}>
                  {entries[1].playerName}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200">
                <div className="text-sm sm:text-lg font-black text-[#D40511]">{entries[1].score}</div>
                <div className="text-[10px] text-gray-600 font-bold truncate">{entries[1].title}</div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                  {entries[1].attempts ? `${entries[1].attempts} runs` : '1 run'}
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-3 sm:p-4 text-center border-2 border-amber-400 shadow-md flex flex-col justify-between -translate-y-1.5 ring-2 ring-yellow-400/40 order-2">
              <div>
                <span className="inline-block text-3xl mb-1">👑</span>
                <div className="text-[11px] font-black text-amber-700 uppercase tracking-wider">Champion</div>
                <div className="font-black text-gray-950 text-base sm:text-lg truncate" title={entries[0].playerName}>
                  {entries[0].playerName}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200">
                <div className="text-base sm:text-xl font-black text-[#D40511]">{entries[0].score}</div>
                <div className="text-[10px] font-black text-amber-800 truncate">{entries[0].title || 'Millionaire'}</div>
                <div className="text-[10px] text-amber-700 font-bold font-mono mt-0.5">
                  {entries[0].attempts ? `${entries[0].attempts} runs to top` : '1 run'}
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 text-center border-2 border-amber-300 shadow-sm flex flex-col justify-between order-3">
              <div>
                <span className="inline-block text-2xl mb-1">🥉</span>
                <div className="text-[11px] font-black text-amber-800 uppercase tracking-wider">3rd Place</div>
                <div className="font-black text-gray-950 text-sm sm:text-base truncate" title={entries[2].playerName}>
                  {entries[2].playerName}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200">
                <div className="text-sm sm:text-lg font-black text-[#D40511]">{entries[2].score}</div>
                <div className="text-[10px] text-gray-600 font-bold truncate">{entries[2].title}</div>
                <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                  {entries[2].attempts ? `${entries[2].attempts} runs` : '1 run'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-xs font-black uppercase tracking-wider border-b-2 border-gray-200">
              <th scope="col" className="py-3.5 px-4 text-center w-14">Rank</th>
              <th scope="col" className="py-3.5 px-4">Player & Security Title</th>
              <th scope="col" className="py-3.5 px-4 text-center">Attempts</th>
              <th scope="col" className="py-3.5 px-4 text-center">Tier</th>
              <th scope="col" className="py-3.5 px-4 text-right">Prize Won</th>
              <th scope="col" className="py-3.5 px-4 text-right hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-medium">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-4 text-center">
                    <div className="w-7 h-7 bg-gray-200 rounded-full mx-auto"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-32 h-4 bg-gray-200 rounded mb-1.5"></div>
                    <div className="w-20 h-3 bg-gray-100 rounded"></div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="w-12 h-4 bg-gray-200 rounded mx-auto"></div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="w-10 h-4 bg-gray-200 rounded mx-auto"></div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="w-20 h-5 bg-gray-200 rounded ml-auto"></div>
                  </td>
                  <td className="py-4 px-4 text-right hidden sm:table-cell">
                    <div className="w-14 h-3 bg-gray-100 rounded ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  <p className="font-bold text-base mb-1">No scores saved yet.</p>
                  <p className="text-xs text-gray-400">Be the first cybersecurity hero to claim the million!</p>
                </td>
              </tr>
            ) : (
              entries.map((entry, index) => {
                const rank = index + 1;
                const isHighlighted =
                  highlightPlayerName &&
                  entry.playerName.trim().toLowerCase() === highlightPlayerName.trim().toLowerCase();

                return (
                  <tr
                    key={entry.rowKey || index}
                    className={`transition-colors duration-150 ${
                      isHighlighted
                        ? 'bg-amber-100 font-bold border-l-4 border-[#D40511]'
                        : index % 2 === 0
                        ? 'bg-white hover:bg-gray-50'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {getRankBadge(rank)}
                    </td>

                    {/* Name & Security Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-950 text-sm sm:text-base">
                          {entry.playerName}
                        </span>
                        {isHighlighted && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-[#FFCC00] text-gray-950 border border-yellow-400">
                            YOU
                          </span>
                        )}
                        {entry.isWinner && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-400">
                            ★ WINNER
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">
                        {entry.title || 'Security Defender'}
                      </div>
                    </td>

                    {/* Attempts count */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-gray-200 text-gray-800 border border-gray-300">
                        ⚡ {entry.attempts || 1} {entry.attempts === 1 ? 'try' : 'tries'}
                      </span>
                    </td>

                    {/* Level */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-300">
                        {entry.questionLevel === 15 ? 'Q15 (Max)' : `Q${entry.questionLevel}`}
                      </span>
                    </td>

                    {/* Prize Won */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className="text-base sm:text-lg font-black text-[#D40511]">
                        {entry.score}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-right text-xs text-gray-600 font-semibold whitespace-nowrap hidden sm:table-cell">
                      {formatDate(entry.date)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-6 py-3.5 border-t-2 border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-700 font-semibold gap-2">
        <div className="flex items-center gap-2">
          <TrophyIcon className="w-4 h-4 text-amber-600" />
          <span>Official Cybersecurity Top 10 Hall of Fame</span>
        </div>
        <div>
          <span>Play multiple runs to improve your score and rank</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
