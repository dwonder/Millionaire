import { LeaderboardEntry, AzureStorageStatus } from './types';
import { PRIZE_LADDER } from './constants';

export const parsePrizeValue = (prizeStr: string): number => {
  if (!prizeStr) return 0;
  const numeric = prizeStr.replace(/[^0-9]/g, '');
  return parseInt(numeric, 10) || 0;
};

export const getTitleForLevel = (level: number, isWinner: boolean): string => {
  if (isWinner || level >= 15) return 'Cyber Savvy Champion';
  const prizeItem = PRIZE_LADDER.find((p) => p.level === level);
  if (prizeItem && prizeItem.title) return prizeItem.title;

  if (level >= 13) return 'Digital Guardian';
  if (level >= 10) return 'Cyber Safety Hero';
  if (level >= 8) return 'Passcode Pro';
  if (level >= 5) return 'Safety Scout';
  if (level >= 3) return 'Privacy Junior';
  if (level >= 1) return 'Newbie Navigator';
  return 'Security Cadet';
};

const LOCAL_STORAGE_KEY = 'cyber_millionaire_leaderboard_cache';
const PLAYER_STATS_PREFIX = 'cyber_millionaire_player_stats_';

export interface PlayerCareerStats {
  attempts: number;
  bestScore: string;
  bestScoreValue: number;
  bestLevel: number;
}

export function getPlayerCareerStats(name: string): PlayerCareerStats {
  if (!name || !name.trim()) {
    return { attempts: 0, bestScore: '€0', bestScoreValue: 0, bestLevel: 0 };
  }
  const cleanName = name.trim().toLowerCase();
  try {
    const raw = localStorage.getItem(`${PLAYER_STATS_PREFIX}${cleanName}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return { attempts: 0, bestScore: '€0', bestScoreValue: 0, bestLevel: 0 };
}

export function recordPlayerAttempt(
  name: string,
  score: string,
  level: number
): PlayerCareerStats {
  const current = getPlayerCareerStats(name);
  const scoreVal = parsePrizeValue(score);
  const newAttempts = current.attempts + 1;

  const isNewBest = scoreVal >= current.bestScoreValue;
  const updated: PlayerCareerStats = {
    attempts: newAttempts,
    bestScore: isNewBest ? score : current.bestScore,
    bestScoreValue: isNewBest ? scoreVal : current.bestScoreValue,
    bestLevel: Math.max(current.bestLevel, level),
  };

  try {
    const cleanName = name.trim().toLowerCase();
    localStorage.setItem(`${PLAYER_STATS_PREFIX}${cleanName}`, JSON.stringify(updated));
  } catch {}

  return updated;
}

export async function getLeaderboard(): Promise<{
  entries: LeaderboardEntry[];
  status: AzureStorageStatus | null;
}> {
  try {
    const res = await fetch('/api/leaderboard');
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    if (data.success && Array.isArray(data.leaderboard)) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.leaderboard));
      } catch {}
      return {
        entries: data.leaderboard,
        status: data.status || null,
      };
    }
  } catch (err) {
    console.warn('[Leaderboard] API fetch failed, falling back to cache:', err);
  }

  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      return {
        entries: JSON.parse(cached),
        status: null,
      };
    }
  } catch {}

  return {
    entries: [],
    status: null,
  };
}

export async function submitScore(params: {
  playerName: string;
  score: string;
  scoreValue?: number;
  questionLevel: number;
  isWinner: boolean;
  title?: string;
  attempts?: number;
}): Promise<{
  success: boolean;
  rank: number;
  isTop10: boolean;
  top10: LeaderboardEntry[];
  attempts: number;
}> {
  const numericValue =
    typeof params.scoreValue === 'number' ? params.scoreValue : parsePrizeValue(params.score);
  const title = params.title || getTitleForLevel(params.questionLevel, params.isWinner);

  // Update local stats and get total attempt count
  const stats = recordPlayerAttempt(params.playerName, params.score, params.questionLevel);
  const totalAttempts = params.attempts || stats.attempts;

  try {
    const res = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerName: params.playerName,
        score: params.score,
        scoreValue: numericValue,
        questionLevel: params.questionLevel,
        isWinner: params.isWinner,
        date: new Date().toISOString(),
        title,
        attempts: totalAttempts,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.top10));
        } catch {}
        return {
          success: true,
          rank: data.rank,
          isTop10: data.isTop10,
          top10: data.top10,
          attempts: data.attempts || totalAttempts,
        };
      }
    }
  } catch (err) {
    console.error('[Leaderboard] Failed to submit score:', err);
  }

  return {
    success: false,
    rank: -1,
    isTop10: false,
    top10: [],
    attempts: totalAttempts,
  };
}
