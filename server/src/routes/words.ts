import { Router, Request, Response } from 'express';
import { generateWords, translateWord } from '../services/openai';
import { DifficultyLevel } from '../types';

const router = Router();

router.get('/words', async (req: Request, res: Response) => {
  try {
    const level = (req.query.level as DifficultyLevel) || 'cet4';

    if (!['cet4', 'cet6', 'graduate'].includes(level)) {
      res.status(400).json({ error: '无效的难度级别，可选值: cet4, cet6, graduate' });
      return;
    }

    const words = await generateWords(level);
    res.json({ words });
  } catch (error: any) {
    console.error('生成单词失败:', error);
    res.status(500).json({ error: '生成单词失败: ' + error.message });
  }
});

router.get('/translate', async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string)?.trim();

    if (!q) {
      res.status(400).json({ error: '请输入要查询的中文' });
      return;
    }

    const words = await translateWord(q);
    res.json({ words });
  } catch (error: any) {
    console.error('翻译失败:', error);
    res.status(500).json({ error: '翻译失败: ' + error.message });
  }
});

export default router;
