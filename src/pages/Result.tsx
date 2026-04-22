import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveScore } from '../utils/leaderboard';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const score: number = parseInt(localStorage.getItem('quizScore') || '0', 10);
  const level: number = parseInt(localStorage.getItem('quizLevel') || '1', 10);
  const name: string = localStorage.getItem('playerName') || 'Аноним';

  useEffect(() => {
    saveScore({ name, score, level, date: new Date().toISOString() });
  }, [name, score, level]);

  const restart = (): void => {
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizLevel');
    navigate('/');
  };

  return (
    <div className="result">
      <h2>Результаты</h2>
      <p>{name}, вы набрали {score} баллов!</p>
      <p>Достигнут уровень: {level}</p>
      <button onClick={restart}>🔄 Начать заново</button>
      <button onClick={() => navigate('/')}>На главную</button>
    </div>
  );
};

export default Result;