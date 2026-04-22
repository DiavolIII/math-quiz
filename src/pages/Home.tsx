import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../utils/leaderboard';
import { LeaderboardEntry } from '../types/Question';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const startQuiz = () => {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName);
      navigate('/quiz');
    }
  };

  return (
    <div className="home">
      <h1>Математический квиз</h1>
      <input
        type="text"
        placeholder="Введите ваше имя"
        value={playerName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)}
      />
      <button onClick={startQuiz}>Начать игру</button>
      
      <div className="leaderboard">
        <h2>Топ игроков</h2>
        {leaderboard.map((entry: LeaderboardEntry, idx: number) => (
          <div key={idx}>{idx+1}. {entry.name} — {entry.score} очков (ур. {entry.level})</div>
        ))}
      </div>
    </div>
  );
};

export default Home;