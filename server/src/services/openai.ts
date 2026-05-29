import OpenAI from 'openai';
import dotenv from 'dotenv';
import { Word, DifficultyLevel, difficultyLabels } from '../types';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

export async function generateWords(level: DifficultyLevel): Promise<Word[]> {
  const label = difficultyLabels[level];

  const prompt = `请生成10个${label}级别的英语单词，返回JSON格式：
[{"word": "example", "phonetic": "/ɪɡˈzæmpl/", "meaning": "例子"}]
要求：
1. 只返回JSON数组，不要其他内容
2. phonetic 使用国际音标
3. meaning 用中文解释
4. 单词要有一定难度，不要太简单`;

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '你是一个英语教学助手，专门生成英语学习单词。只返回JSON格式数据。',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.8,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI 返回内容为空');
  }

  // 提取 JSON 部分（处理可能的 markdown 代码块）
  const jsonStr = content.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
  const words: Word[] = JSON.parse(jsonStr);

  return words;
}
