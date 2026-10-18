/**
 * 易学基础数据表：干支、五行、八卦、纳甲、八宫世应
 * 数据依据《京房易传》《卜筮正宗》传统定式。
 */
import type { BaGong, DiZhi, LiuQin, LiuShen, TianGan, Trigram, WuXing } from './types';

/** 天干序列 */
export const TIAN_GAN: TianGan[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

/** 地支序列 */
export const DI_ZHI: DiZhi[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/** 天干五行 */
export const GAN_WUXING: Record<TianGan, WuXing> = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
};

/** 地支五行 */
export const ZHI_WUXING: Record<DiZhi, WuXing> = {
  寅: '木', 卯: '木', 巳: '火', 午: '火', 辰: '土', 戌: '土',
  丑: '土', 未: '土', 申: '金', 酉: '金', 亥: '水', 子: '水',
};

/** 地支阴阳（阳支/阴支，以序号奇偶论） */
export const ZHI_YINYANG: Record<DiZhi, '阳' | '阴'> = {
  子: '阳', 丑: '阴', 寅: '阳', 卯: '阴', 辰: '阳', 巳: '阴',
  午: '阳', 未: '阴', 申: '阳', 酉: '阴', 戌: '阳', 亥: '阴',
};

/** 六合：子丑、寅亥、卯戌、辰酉、巳申、午未 */
export const LIU_HE: Partial<Record<DiZhi, DiZhi>> = {
  子: '丑', 寅: '亥', 卯: '戌', 辰: '酉', 巳: '申', 午: '未', 丑: '子', 亥: '寅', 戌: '卯', 酉: '辰', 申: '巳', 未: '午',
};

/** 三合局（申子辰水、亥卯未木、寅午戌火、巳酉丑金） */
export const SAN_HE: Record<string, DiZhi[]> = {
  水: ['申', '子', '辰'],
  木: ['亥', '卯', '未'],
  火: ['寅', '午', '戌'],
  金: ['巳', '酉', '丑'],
};

/** 六冲：对冲位（相隔六位） */
export function chong(a: DiZhi, b: DiZhi): boolean {
  return (DI_ZHI.indexOf(a) - DI_ZHI.indexOf(b) + 12) % 12 === 6;
}

/** 六合判断 */
export function he(a: DiZhi, b: DiZhi): boolean {
  return LIU_HE[a] === b;
}

/** 五行生克：returns 生成/克/受生/受克/同 */
export type ShengKe = '同我' | '我生' | '我克' | '生我' | '克我';
export function shengKe(self: WuXing, other: WuXing): ShengKe {
  const order: WuXing[] = ['木', '火', '土', '金', '水'];
  if (self === other) return '同我';
  const s = order.indexOf(self);
  // 相生：木生火生土生金生水生木
  if (order[(s + 1) % 5] === other) return '我生';
  // 相克：木克土克水克火克金克木
  if (order[(s + 2) % 5] === other) return '我克';
  if (order[(s + 4) % 5] === other) return '生我';
  return '克我';
}

/** 六神起法：甲乙起青龙，丙丁朱雀，戊勾陈，己螣蛇，庚辛白虎，壬癸玄武 */
export const LIUSHEN_QIFA: Record<string, LiuShen[]> = {
  甲: ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'],
  乙: ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'],
  丙: ['朱雀', '勾陈', '螣蛇', '白虎', '玄武', '青龙'],
  丁: ['朱雀', '勾陈', '螣蛇', '白虎', '玄武', '青龙'],
  戊: ['勾陈', '螣蛇', '白虎', '玄武', '青龙', '朱雀'],
  己: ['螣蛇', '白虎', '玄武', '青龙', '朱雀', '勾陈'],
  庚: ['白虎', '玄武', '青龙', '朱雀', '勾陈', '螣蛇'],
  辛: ['白虎', '玄武', '青龙', '朱雀', '勾陈', '螣蛇'],
  壬: ['玄武', '青龙', '朱雀', '勾陈', '螣蛇', '白虎'],
  癸: ['玄武', '青龙', '朱雀', '勾陈', '螣蛇', '白虎'],
};

/**
 * 八卦二进制（自下而上每一位：1=阳 0=阴）
 * 例：乾 ☰ = [1,1,1]；震 ☳ = [1,0,0]（初阳）
 */
export const TRIGRAM_BINARY: Record<Trigram, [number, number, number]> = {
  乾: [1, 1, 1],
  兑: [1, 1, 0],
  离: [1, 0, 1],
  震: [1, 0, 0],
  巽: [0, 1, 1],
  坎: [0, 1, 0],
  艮: [0, 0, 1],
  坤: [0, 0, 0],
};

/** 由三爻二进制反查卦名 */
export function trigramFromBinary(b: [number, number, number]): Trigram {
  for (const [name, bin] of Object.entries(TRIGRAM_BINARY) as [Trigram, [number, number, number]][]) {
    if (bin[0] === b[0] && bin[1] === b[1] && bin[2] === b[2]) return name;
  }
  throw new Error(`非法卦象二进制: ${b}`);
}

/**
 * 浑天甲子纳甲表：内卦（初二三爻）与外卦（四五上爻）纳干支
 * 乾内甲子外壬午 …遵循"乾金甲子外壬午"诀
 * 值：{ gan: 天干, zhiList: [初爻支, 二爻支, 三爻支] }
 */
export const NAJIA_TABLE: Record<Trigram, { nei: { gan: TianGan; zhi: [DiZhi, DiZhi, DiZhi] }; wai: { gan: TianGan; zhi: [DiZhi, DiZhi, DiZhi] } }> = {
  乾: { nei: { gan: '甲', zhi: ['子', '寅', '辰'] }, wai: { gan: '壬', zhi: ['午', '申', '戌'] } },
  坎: { nei: { gan: '戊', zhi: ['寅', '辰', '午'] }, wai: { gan: '戊', zhi: ['申', '戌', '子'] } },
  艮: { nei: { gan: '丙', zhi: ['辰', '午', '申'] }, wai: { gan: '丙', zhi: ['戌', '子', '寅'] } },
  震: { nei: { gan: '庚', zhi: ['子', '寅', '辰'] }, wai: { gan: '庚', zhi: ['午', '申', '戌'] } },
  巽: { nei: { gan: '辛', zhi: ['丑', '亥', '酉'] }, wai: { gan: '辛', zhi: ['未', '巳', '卯'] } },
  离: { nei: { gan: '己', zhi: ['卯', '丑', '亥'] }, wai: { gan: '己', zhi: ['酉', '未', '巳'] } },
  坤: { nei: { gan: '乙', zhi: ['未', '巳', '卯'] }, wai: { gan: '癸', zhi: ['丑', '亥', '酉'] } },
  兑: { nei: { gan: '丁', zhi: ['巳', '卯', '丑'] }, wai: { gan: '丁', zhi: ['亥', '酉', '未'] } },
};

/** 八宫五行 */
export const GONG_WUXING: Record<BaGong, WuXing> = {
  乾: '金', 兑: '金', 离: '火', 震: '木', 巽: '木', 坎: '水', 艮: '土', 坤: '土',
};

/**
 * 京房八宫六十四卦世应表
 * 每宫八卦次序：本宫卦(世6应3)、一世(世1)、二世(世2)、三世(世3)、四世(世4)、五世(世5)、游魂(世4)、归魂(世3应6)
 * 值为 [上卦, 下卦, 世位, 应位]，爻位 1-6 自下而上
 */
export type BagongEntry = [Trigram, Trigram, number, number];

/** 生成八宫卦序：每宫从纯卦起，按爻变规则推一世~五世、游魂、归魂 */
export function buildBagongTable(): Record<string, { gong: BaGong; wai: Trigram; nei: Trigram; shi: number; ying: number }> {
  const table: ReturnType<typeof buildBagongTable> = {};
  const gongs: BaGong[] = ['乾', '坎', '艮', '震', '巽', '离', '坤', '兑'];
  for (const gong of gongs) {
    // 本宫纯卦
    let bits = [...TRIGRAM_BINARY[gong], ...TRIGRAM_BINARY[gong]] as number[]; // 自下而上 6 爻 [nei0,nei1,nei2,wai0,wai1,wai2]
    // 世应：本宫卦世在上爻
    const setEntry = (shi: number, ying: number, kind: string) => {
      const wai = trigramFromBinary([bits[3], bits[4], bits[5]]);
      const nei = trigramFromBinary([bits[0], bits[1], bits[2]]);
      table[`${wai}${nei}`] = { gong, wai, nei, shi, ying, kind };
    };
    // 本宫卦：世6应3
    setEntry(6, 3, '本宫');
    // 一世~五世：逐爻自下而上变（只变本宫原爻位）
    let current = [...bits];
    for (let i = 1; i <= 5; i++) {
      current = [...current];
      current[i - 1] = current[i - 1] ^ 1; // 变第 i 爻
      bits = current;
      const shi = i;
      const ying = ((shi + 2) % 6) + 1; // 世应相隔三位
      const wai = trigramFromBinary([bits[3], bits[4], bits[5]]);
      const nei = trigramFromBinary([bits[0], bits[1], bits[2]]);
      table[`${wai}${nei}`] = { gong, wai, nei, shi, ying, kind: `${i}世` };
    }
    // 游魂：四世卦再变第四爻
    current = [...current];
    current[3] = current[3] ^ 1;
    bits = current;
    setEntry(4, 1, '游魂');
    // 归魂：游魂卦内卦复本宫（内三爻变回本宫下卦）
    const gongNei = TRIGRAM_BINARY[gong];
    bits = [gongNei[0], gongNei[1], gongNei[2], bits[3], bits[4], bits[5]];
    setEntry(3, 6, '归魂');
  }
  return table;
}

/** 六亲定名：以卦宫五行为"我"，按爻支五行生克取名 */
export function liuqinOf(gongWuxing: WuXing, yaoWuxing: WuXing): LiuQin {
  const rel = shengKe(gongWuxing, yaoWuxing);
  switch (rel) {
    case '同我': return '兄弟';
    case '我生': return '子孙';
    case '我克': return '妻财';
    case '克我': return '官鬼';
    case '生我': return '父母';
  }
}

/** 六十四卦 Guaci（卦辞）映射 —— 由周义义理引擎与 UI 复用 */
export const GUA_ORDER: Trigram[] = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];

/** 由外卦内卦得六位二进制字符串（自下而上） */
export function hexBinary(wai: Trigram, nei: Trigram): string {
  const n = TRIGRAM_BINARY[nei];
  const w = TRIGRAM_BINARY[wai];
  return [...n, ...w].join('');
}
