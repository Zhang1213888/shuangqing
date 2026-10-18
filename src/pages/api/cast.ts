/**
 * POST /api/cast —— 提交起卦请求
 * 同源起卦，双轨分流：根据 mode 路由至 NajiaEngine / ZhouyiEngine
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { najiaCast } from '@/engines/najia/NajiaEngine';
import { zhouyiCast } from '@/engines/zhouyi/ZhouyiEngine';
import { validateTosses } from '@/engines/shared/casting';
import type { CastRequest, CastResponse } from '@/engines/shared/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { mode, question, timestamp, tosses } = req.body as Partial<CastRequest>;

    // ---- 参数校验 ----
    if (mode !== 'NAJIA' && mode !== 'ZHOUYI') {
      return res.status(400).json({ error: 'mode 必须为 NAJIA 或 ZHOUYI' });
    }
    if (typeof question !== 'string' || question.length > 200) {
      return res.status(400).json({ error: 'question 必须为 200 字以内字符串' });
    }
    if (typeof timestamp !== 'number' || timestamp <= 0) {
      return res.status(400).json({ error: 'timestamp 必须为毫秒时间戳' });
    }
    if (!validateTosses(tosses as number[])) {
      return res.status(400).json({ error: 'tosses 必须为 6 个值域 [6,7,8,9] 的数组' });
    }

    const castReq: CastRequest = { mode, question, timestamp, tosses: tosses! };

    // ---- 双轨分流 ----
    let result: CastResponse;
    if (mode === 'NAJIA') {
      // 纯算法排盘；文案可先返回引擎内置版，前端再调 /api/interpret 换 LLM 深度文案
      result = najiaCast(castReq);
    } else {
      // 周易：先结构化定焦点，文案字段留待 /api/interpret
      result = zhouyiCast(castReq);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('[/api/cast]', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : '起卦失败' });
  }
}
