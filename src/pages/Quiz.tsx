import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { fetchQuestions } from '../services/api';
import { Question } from '../types/Question';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAnswer = (isCorrect: boolean, points: number) => {
    const newPoints = totalPoints + points;
    setTotalPoints(newPoints);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setShowFeedback(false);
      } else {
        localStorage.setItem('quizScore', newPoints.toString());
        localStorage.setItem('quizLevel', questions[currentIndex]?.level.toString() || '1');
        navigate('/result');
      }
    }, 1500);
  };

  if (!questions.length) return <div style={{ color: 'white', textAlign: 'center' }}>Загрузка вопросов...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz">
      <div className="stats">
        <div>Уровень: {currentQuestion.level}</div>
        <div>Баллы: {totalPoints}</div>
        <div>Вопрос: {currentIndex+1}/{questions.length}</div>
      </div>
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        showFeedback={showFeedback}
      />
    </div>
  );
};

export default Quiz;