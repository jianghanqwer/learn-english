export interface Word {
  word: string;
  phonetic: string;
  meaning: string;
}

export type DifficultyLevel = 'cet4' | 'cet6' | 'graduate';

export interface DifficultyOption {
  value: DifficultyLevel;
  label: string;
  description: string;
}

export const difficultyOptions: DifficultyOption[] = [
  { value: 'cet4', label: '四级', description: 'CET-4 基础词汇' },
  { value: 'cet6', label: '六级', description: 'CET-6 进阶词汇' },
  { value: 'graduate', label: '考研', description: '考研/雅思/托福词汇' },
];
