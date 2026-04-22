import { LeaderboardEntry } from '../types/Question';

const STORAGE_KEY: string = 'math_quiz_leaderboard';

export const saveScore = (entry: LeaderboardEntry): void => {
  const board: LeaderboardEntry[] = getLeaderboard();
  board.push(entry);
  board.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(board.slice(0, 10)));
};

export const getLeaderboard = (): LeaderboardEntry[] => {
  const data: string | null = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};