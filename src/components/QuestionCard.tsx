import React, { useState, useEffect } from 'react';
import { Question } from '../types/Question';

interface Props {
  question: Question;
  onAnswer: (isCorrect: boolean, points: number) => void;
  showFeedback: boolean;
}

const QuestionCard: React.FC<Props> = ({ question, onAnswer, showFeedback }) => {
  const [selected, setSelected] = useState<string>('');
  const [locked, setLocked] = useState<boolean>(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    setShuffledOptions(shuffleArray(question.options));
    setSelected('');
    setLocked(false);
  }, [question.id, question.options]);

  const handleSelect = (option: string) => {
    if (!locked && !showFeedback) {
      setSelected(option);
    }
  };

  const handleSubmit = () => {
    if (locked || showFeedback || !selected) return;
    setLocked(true);
    const isCorrect = selected === question.correct;
    onAnswer(isCorrect, isCorrect ? question.points : 0);
  };

  return (
    <div className="question-card">
      <div className="level-badge">Уровень {question.level}</div>
      <h3>{question.text}</h3>
      <div className="options">
        {shuffledOptions.map((opt: string, idx: number) => (
          <button
            key={idx}
            className={`option ${selected === opt ? 'selected' : ''} ${
              showFeedback && opt === question.correct ? 'correct-highlight' : ''
            } ${showFeedback && selected === opt && opt !== question.correct ? 'wrong-highlight' : ''}`}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={locked || showFeedback || !selected}>
        Ответить
      </button>
      {showFeedback && (
        <div className="feedback">
          {selected === question.correct ? 'Правильно!' : `Ошибка! Правильно: ${question.correct}`}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;