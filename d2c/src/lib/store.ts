/**
 * 全局起卦状态（跨页共享）
 * 首屏选模式 → 摇卦页攒 tosses → 结果页消费排盘数据
 */
import { useEffect, useState } from 'react';

export type CastMode = 'NAJIA' | 'ZHOUYI';

export interface CastingState {
  mode: CastMode;
  question: string;
  /** 已掷出的爻值（6/7/8/9），自下而上，最多 6 个 */
  tosses: number[];
  /** 排盘结果（第 6 爻完成后由 /api/cast 填充） */
  najiaResult?: any;
  zhouyiResult?: any;
}

const KEY = 'sq_casting_state';
const empty: CastingState = { mode: 'NAJIA', question: '心中默念，凝神问卜', tosses: [] };

export function loadState(): CastingState {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : { ...empty };
  } catch {
    return { ...empty };
  }
}

export function saveState(s: CastingState) {
  try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
  window.dispatchEvent(new Event('sq-state-change'));
}

export function resetState(mode: CastMode) {
  saveState({ mode, question: '心中默念，凝神问卜', tosses: [] });
}

/** React hook：订阅状态变化 */
export function useCastingState(): [CastingState, (s: CastingState) => void] {
  const [state, setState] = useState<CastingState>(loadState);
  useEffect(() => {
    const onChange = () => setState(loadState());
    window.addEventListener('sq-state-change', onChange);
    return () => window.removeEventListener('sq-state-change', onChange);
  }, []);
  const update = (s: CastingState) => { saveState(s); setState(s); };
  return [state, update];
}

/** 单次三币投掷（字=2 背=3，求和 6-9），crypto 真随机 */
export function tossOnce(): number {
  const buf = new Uint32Array(3);
  crypto.getRandomValues(buf);
  const a = buf[0] % 2 === 0 ? 2 : 3;
  const b = buf[1] % 2 === 0 ? 2 : 3;
  const c = buf[2] % 2 === 0 ? 2 : 3;
  return a + b + c;
}