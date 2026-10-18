/**
 * 起卦基础模块：真随机投掷 + 卦象还原
 * 三枚铜钱：字=2，背=3，单次和 ∈ {6,7,8,9}
 * 6=老阴(动) 7=少阳 8=少阴 9=老阳(动)
 */
import { TRIGRAM_BINARY, trigramFromBinary } from './constants';
import type { TossValue, Tosses, Trigram, YaoKind } from './types';

/** 单枚铜钱：字 2 / 背 3 */
function oneCoin(): 2 | 3 {
  // crypto 级随机，避免 Math.random 的伪随机偏差
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % 2 === 0 ? 2 : 3;
}

/** 单次投掷三枚铜钱求和 */
export function tossOnce(): TossValue {
  return (oneCoin() + oneCoin() + oneCoin()) as TossValue;
}

/** 完整六掷（服务端模式；客户端物理引擎掷出后直接传 tosses） */
export function tossSix(): Tosses {
  return Array.from({ length: 6 }, tossOnce) as unknown as Tosses;
}

/** 校验客户端传入的 tosses 合法性 */
export function validateTosses(t: number[]): t is Tosses {
  return Array.isArray(t) && t.length === 6 && t.every((v) => [6, 7, 8, 9].includes(v));
}

/** 爻值 → 阴阳（本卦爻画） */
export function yaoKind(v: TossValue): YaoKind {
  return v === 7 || v === 9 ? 'YANG' : 'YIN';
}

/** 爻值 → 是否动爻（6 老阴 / 9 老阳） */
export function isMoving(v: TossValue): boolean {
  return v === 6 || v === 9;
}

/** 动爻变出后的爻画：老阳(9)→阴，老阴(6)→阳 */
export function changedKind(v: TossValue): YaoKind | undefined {
  if (!isMoving(v)) return undefined;
  return v === 9 ? 'YIN' : 'YANG';
}

/**
 * 六爻值 → { 外卦, 内卦, 动爻位列表 }
 * bits[0..2] = 内卦（初、二、三爻），bits[3..5] = 外卦（四、五、上爻）
 */
export function guaFromTosses(tosses: Tosses): { wai: Trigram; nei: Trigram; moving: number[] } {
  const bits = tosses.map((v) => (yaoKind(v) === 'YANG' ? 1 : 0));
  const moving = tosses.map((v, i) => (isMoving(v) ? i + 1 : 0)).filter(Boolean);
  const wai = trigramFromBinary([bits[3], bits[4], bits[5]]);
  const nei = trigramFromBinary([bits[0], bits[1], bits[2]]);
  return { wai, nei, moving };
}

/** 变卦：动爻翻转后的卦 */
export function bianGuaBinary(tosses: Tosses): string {
  return tosses
    .map((v) => {
      const base = yaoKind(v) === 'YANG' ? 1 : 0;
      return isMoving(v) ? base ^ 1 : base;
    })
    .join('');
}

/** 六位二进制（自下而上）→ 上下卦名 */
export function guaFromBinary(bin: string): { wai: Trigram; nei: Trigram } {
  const b = bin.split('').map(Number) as [number, number, number, number, number, number];
  return {
    nei: trigramFromBinary([b[0], b[1], b[2]]),
    wai: trigramFromBinary([b[3], b[4], b[5]]),
  };
}

export { TRIGRAM_BINARY };
