import { Question } from '../types/Question';

interface QuestionsResponse {
  questions: Question[];
}

export async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await fetch('/questions.json?nocache=' + Date.now());
    if (!response.ok) throw new Error('не удалось загрузить вопросы');
    const data: QuestionsResponse = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return [];
  }
}