import type { Word, DifficultyLevel } from '../types';

const API_BASE = '/api';

export async function fetchWords(level: DifficultyLevel): Promise<Word[]> {
  const response = await fetch(`${API_BASE}/words?level=${level}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '请求失败');
  }

  const data = await response.json();
  return data.words;
}
