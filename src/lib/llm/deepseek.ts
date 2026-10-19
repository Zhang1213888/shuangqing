/**
 * DeepSeek LLM 解卦文案生成层
 * 两套严格约束的系统提示词：六爻（实战派命理师）/ 周易（温和国学导师）
 */
import OpenAI from 'openai';
import type { NajiaResult, ZhouyiResult } from '@/engines/shared/types';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
});

const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';

/** 六爻模式系统提示词（严格三段，禁引周易古文） */
const NAJIA_SYSTEM = `你是一位实战派六爻命理师，精通文王纳甲断法，语言大白话、直给、不绕弯。

重要说明：用户可能提供了具体问题（打字或语音），也可能仅以"默念"方式揣摩所求。请在回答中直接回应用户的具体问题（若有），若无具体问题则依据 JSON 中的机枢用神、世应生克、动变月破等盘面数据笃定剖析其所思所处境。

输出约束（必须严格遵守）：
1. 只输出 JSON，格式：
{"verification":"...","crux":"...","timing":"..."}
2. verification：一、现状核验——结合用户问题（若有）与卦中世爻、用神状态核验提问者当前处境，让他觉得"卦说得准"。若用户提供了具体问题，必须围绕问题展开。
3. crux：二、核心症结——直指用神与月建/日辰/世爻的生克关系点出问题本质。若有用户具体问题，需回答问题卡在哪一环节。
4. timing：三、应期时间——依据空亡出空、月破逢合、动爻值日等给出具体可感的时窗口径。
5. 必须依据输入 JSON 的五行生克、六亲、世应、空亡月破等数据作答，不得虚构卦象信息。
6. 严禁提及《周易》古文爻辞、卦辞。严禁出现"潜龙勿用"等易经原文。
7. 每段 80-150 字，语气笃定，像老师傅当面说话。`;

/** 周易模式系统提示词（见字如面起手，禁提干支五行） */
const ZHOUYI_SYSTEM = `你是一位温和的国学导师，以书信体为人解惑，文风温润、有古意但不掉书袋。

重要说明：用户可能提供了具体问题（打字或语音），也可能仅以"默念"方式揣摩所求。请在回答中直接回应用户的具体问题（若有），若无具体问题则依据卦爻辞意象笃定剖析其所思所处境。

输出约束（必须严格遵守）：
1. 只输出 JSON，格式：
{"metaphor":"...","strategy":"...","quote":"..."}
2. metaphor：象之隐喻——结合用户问题（若有）与给定卦象/爻辞，讲清这个象对提问者处境的隐喻。开头不要重复"见字如面"。若用户提供了具体问题，必须围绕问题展开。
3. strategy：破局之道——给出可操作的心态调整与行动建议。若有用户具体问题，需回答问题卡在哪一环节。
4. quote：从卦爻辞中提取或化用一句 10 字以内古文金句（不含标点或含一处标点）。
5. 严禁提及天干、地支、五行、六亲、世应、纳甲等六爻术语。
6. metaphor 与 strategy 各 100-200 字。`;

/** 从模型输出中稳健提取 JSON（容错截断、多余内容） */
function extractJson(text: string): Record<string, string> {
  const trimmed = text.trim();

  const tryParse = (s: string) => {
    try { return JSON.parse(s); } catch { return null; }
  };

  const m = trimmed.match(/\{[\s\S]*\}/);
  if (m) {
    const parsed = tryParse(m[0]);
    if (parsed) return parsed;
  }

  const lastBrace = trimmed.lastIndexOf('}');
  if (lastBrace === -1) {
    const partial = tryParse(trimmed + '}');
    if (partial) return partial;
    const partial2 = tryParse(trimmed + '"}');
    if (partial2) return partial2;
    throw new Error('LLM 输出中未找到 JSON');
  }

  const recovered = tryParse(trimmed.substring(0, lastBrace + 1));
  if (recovered) return recovered;

  throw new Error('LLM 输出 JSON 解析失败');
}

/** 六爻报告生成 */
export async function generateNajiaReport(r: NajiaResult, question: string): Promise<Pick<NajiaResult, 'report' | 'tooltip'>> {
  const isExplicit = question && question !== '心中默念，凝神问卜' && question !== '惟精惟一，心中默念所求之事';
  const userPayload = {
    提问方式: isExplicit ? `用户明确提问：${question}` : '用户心中默念揣摩（未提供具体文字问题）',
    question: isExplicit ? question : undefined,
    本卦: r.benGuaName,
    卦宫: `${r.gong}宫(${r.gongWuxing})`,
    历法: {
      月建: `${r.calendar.yuejian}(${r.calendar.yuejianWuxing})`,
      日辰: `${r.calendar.richenGan}${r.calendar.richen}(${r.calendar.richenWuxing})`,
      旬空: r.calendar.xunkong,
      月破: r.calendar.yuepo,
    },
    世应: `世在第${r.shiIndex}爻, 应在第${r.yingIndex}爻`,
    用神: r.analysis.yongshenDetail,
    六爻: r.lines.map((l) => ({
      爻位: l.index,
      六神: l.liushen,
      六亲: l.liuqin,
      干支: l.ganzhi,
      标签: l.tags,
    })),
    生克关系: {
      月建与用神: r.analysis.yuejianRelation,
      日辰与用神: r.analysis.richenRelation,
      世爻: r.analysis.shiyaoRelation,
      动爻: r.analysis.movingLines,
    },
  };

  const resp = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: NAJIA_SYSTEM },
      { role: 'user', content: JSON.stringify(userPayload, null, 2) },
    ],
    temperature: 0.8,
    max_tokens: 2000,
  });

  const rawContent = resp.choices[0]?.message?.content || '';
  console.log('[LLM 六爻] === 发送给 DeepSeek 的 Prompt ===');
  console.log('[LLM 六爻] System:', NAJIA_SYSTEM.substring(0, 200) + '...');
  console.log('[LLM 六爻] User payload keys:', Object.keys(userPayload));
  console.log('[LLM 六爻] 六爻数量:', userPayload.六爻?.length);
  console.log('[LLM 六爻] === 完整 User Payload ===');
  console.log(JSON.stringify(userPayload, null, 2));
  console.log('[LLM 六爻] DeepSeek 返回 choices 数量:', resp.choices?.length);
  console.log('[LLM 六爻] DeepSeek finish_reason:', resp.choices[0]?.finish_reason);
  console.log('[LLM 六爻] DeepSeek 原始返回:', rawContent);
  const out = extractJson(rawContent);
  return {
    report: {
      verification: out.verification || '',
      crux: out.crux || '',
      timing: out.timing || '',
    },
    tooltip: r.tooltip,
  };
}

/** 周易报告生成 */
export async function generateZhouyiReport(r: ZhouyiResult, question: string): Promise<Pick<ZhouyiResult, 'report' | 'quote'>> {
  const isExplicit = question && question !== '心中默念，凝神问卜' && question !== '惟精惟一，心中默念所求之事';
  const userPayload = {
    提问方式: isExplicit ? `用户明确提问：${question}` : '用户心中默念揣摩（未提供具体文字问题）',
    question: isExplicit ? question : undefined,
    本卦: r.benGua.name,
    本卦卦辞: r.benGua.guaci,
    变卦: r.bianGua?.name,
    动爻位: r.movingIndexes,
    变占路由: r.route,
    焦点: r.focusLine.title,
    焦点原文: r.focusLine.original,
    小象: r.focusLine.xiang,
  };

  const resp = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: ZHOUYI_SYSTEM },
      { role: 'user', content: JSON.stringify(userPayload, null, 2) },
    ],
    temperature: 0.9,
    max_tokens: 2000,
  });

  const rawContent2 = resp.choices[0]?.message?.content || '';
  console.log('[LLM 周易] === 发送给 DeepSeek 的 Prompt ===');
  console.log('[LLM 周易] System:', ZHOUYI_SYSTEM.substring(0, 200) + '...');
  console.log('[LLM 周易] User payload keys:', Object.keys(userPayload));
  console.log('[LLM 周易] DeepSeek finish_reason:', resp.choices[0]?.finish_reason);
  console.log('[LLM 周易] DeepSeek 原始返回:', rawContent2);
  const out = extractJson(rawContent2);
  return {
    report: {
      greeting: '见字如面。',
      metaphor: out.metaphor || '',
      strategy: out.strategy || '',
    },
    quote: out.quote || '',
  };
}