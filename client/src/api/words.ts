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

export async function translateWord(query: string): Promise<Word[]> {
  const response = await fetch(`api/translate?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '翻译失败');
  }

  const data = await response.json();
  return data.words;
}
