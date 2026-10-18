/**
 * POST /api/interpret —— DeepSeek 深度解卦文案生成
 * 输入：/api/cast 的返回结果 + 问题
 * 输出：填充了 LLM 文案的完整结果
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { generateNajiaReport, generateZhouyiReport } from '@/lib/llm/deepseek';
import type { CastResponse } from '@/engines/shared/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { result, question } = req.body as { result: CastResponse; question: string };
    if (!result || !result.mode) {
      return res.status(400).json({ error: '缺少 result（应为 /api/cast 的返回值）' });
    }
    if (typeof question !== 'string' || !question) {
      return res.status(400).json({ error: '缺少 question' });
    }
    if (!process.env.DEEPSEEK_API_KEY) {
      // 未配置 key：降级返回引擎内置文案
      return res.status(200).json({ ...result, _notice: '未配置 DEEPSEEK_API_KEY，返回引擎内置文案' });
    }

    if (result.mode === 'NAJIA') {
      const extra = await generateNajiaReport(result, question);
      return res.status(200).json({ ...result, ...extra });
    } else {
      const extra = await generateZhouyiReport(result, question);
      return res.status(200).json({ ...result, ...extra });
    }
  } catch (err) {
    console.error('[/api/interpret]', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : '解卦文案生成失败' });
  }
}
