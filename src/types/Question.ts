export interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  level: number;
  points: number;
}

export interface UserAnswer {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
  earnedPoints: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  level: number;
  date: string;
}