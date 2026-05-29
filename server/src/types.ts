export interface Word {
  word: string;
  phonetic: string;
  meaning: string;
}

export type DifficultyLevel = 'cet4' | 'cet6' | 'graduate';

export const difficultyLabels: Record<DifficultyLevel, string> = {
  cet4: '四级',
  cet6: '六级',
  graduate: '考研/雅思/托福',
};
