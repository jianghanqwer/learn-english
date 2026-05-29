import type { Word, DifficultyLevel } from '../types';

export async function fetchWords(level: DifficultyLevel): Promise<Word[]> {
  const response = await fetch(`api/words?level=${level}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '请求失败');
  }

  const data = await response.json();
  return data.words;
}
