/**
 * 模块 B：周易义理引擎 (ZhouyiEngine)
 * 朱熹变占法则：按动爻数量（0~6）走 7 条路由，锁定唯一解读焦点。
 * 依赖静态字典：64 卦 + 384 爻。
 */
import { guaFromBinary, guaFromTosses, bianGuaBinary } from '../shared/casting';
import { HEXAGRAMS } from './hexagrams';
import type { CastRequest, TossValue, Tosses, ZhouyiResult } from '../shared/types';

/** 朱熹《易学启蒙》变占七则 */
export type ZhuXiRoute =
  | '无动爻·占本卦卦辞'
  | '一爻动·占本卦动爻爻辞'
  | '二爻动·占本卦二动爻辞（以上爻为主）'
  | '三爻动·占本卦及变卦卦辞（以本卦为贞、变卦为悔）'
  | '四爻动·占变卦二静爻辞（以下爻为主）'
  | '五爻动·占变卦静爻爻辞'
  | '六爻全动·乾占用九'
  | '六爻全动·坤占用六'
  | '六爻全动·占变卦卦辞';

interface FocusResolution {
  route: ZhuXiRoute;
  focusTitle: string;
  focusOriginal: string;
  focusXiang?: string;
  benName: string;
  bianName?: string;
}

/** 二进制（自下而上）→ 卦名查表 */
function nameOfBinary(bin: string): string {
  return HEXAGRAMS[bin]?.name ?? `卦${bin}`;
}

function guaciOfBinary(bin: string): string {
  return HEXAGRAMS[bin]?.guaci ?? '';
}

/** 爻位名称：初/二/三/四/五/上 + 阳九阴六 */
export function yaoTitle(binary: string, position: number): string {
  const isYang = binary[position - 1] === '1';
  const num = ['初', '二', '三', '四', '五', '上'][position - 1];
  const yy = isYang ? '九' : '六';
  // 初九/初六、九二/六二、九三…上九/上六
  if (position === 1) return `初${yy}`;
  if (position === 6) return `上${yy}`;
  return `${yy}${num}`;
}

/** 朱熹变占路由 */
export function resolveFocus(tosses: Tosses): FocusResolution {
  const { wai, nei, moving } = guaFromTosses(tosses);
  const benBin = tosses.map((v) => ((v === 7 || v === 9) ? '1' : '0')).join('');
  const bianBin = bianGuaBinary(tosses);
  const benName = HEXAGRAMS[benBin]?.name || `${wai}${nei}`;
  const m = moving;
  const n = m.length;

  // ---- 七条路由 ----
  if (n === 0) {
    // 1. 无动爻：占本卦卦辞
    return {
      route: '无动爻·占本卦卦辞',
      focusTitle: `${benName}·卦辞`,
      focusOriginal: guaciOfBinary(benBin),
      benName,
    };
  }
  if (n === 1) {
    // 2. 一爻动：占本卦动爻爻辞
    const pos = m[0];
    const yao = HEXAGRAMS[benBin]?.yaos?.[pos - 1];
    return {
      route: '一爻动·占本卦动爻爻辞',
      focusTitle: `${yaoTitle(benBin, pos)}·动爻`,
      focusOriginal: yao?.text || '',
      focusXiang: yao?.xiang,
      benName,
      bianName: nameOfBinary(bianBin),
    };
  }
  if (n === 2) {
    // 3. 二爻动：占本卦两动爻爻辞，以上爻为主
    const [p1, p2] = m;
    const yaoMain = HEXAGRAMS[benBin]?.yaos?.[p2 - 1];
    const yaoSub = HEXAGRAMS[benBin]?.yaos?.[p1 - 1];
    return {
      route: '二爻动·占本卦二动爻辞（以上爻为主）',
      focusTitle: `${yaoTitle(benBin, p2)}·动爻（主）`,
      focusOriginal: [yaoMain?.text, yaoSub ? `参看：${yaoSub.text}` : ''].filter(Boolean).join(' '),
      focusXiang: yaoMain?.xiang,
      benName,
      bianName: nameOfBinary(bianBin),
    };
  }
  if (n === 3) {
    // 4. 三爻动：占本卦及变卦卦辞，本卦为贞（现在）、变卦为悔（将来）
    return {
      route: '三爻动·占本卦及变卦卦辞（以本卦为贞、变卦为悔）',
      focusTitle: `${benName} → ${nameOfBinary(bianBin)}·贞悔并占`,
      focusOriginal: `本卦（贞·现在）：${guaciOfBinary(benBin)}　变卦（悔·将来）：${guaciOfBinary(bianBin)}`,
      benName,
      bianName: nameOfBinary(bianBin),
    };
  }
  if (n === 4) {
    // 5. 四爻动：占变卦二静爻爻辞，以下爻为主
    const still = [1, 2, 3, 4, 5, 6].filter((p) => !m.includes(p));
    const pLow = still[0];
    const yaoMain = HEXAGRAMS[bianBin]?.yaos?.[pLow - 1];
    const yaoSub = HEXAGRAMS[bianBin]?.yaos?.[still[1] - 1];
    return {
      route: '四爻动·占变卦二静爻辞（以下爻为主）',
      focusTitle: `${nameOfBinary(bianBin)}·${yaoTitle(bianBin, pLow)}（静爻为主）`,
      focusOriginal: [yaoMain?.text, yaoSub ? `参看：${yaoSub.text}` : ''].filter(Boolean).join(' '),
      focusXiang: yaoMain?.xiang,
      benName,
      bianName: nameOfBinary(bianBin),
    };
  }
  if (n === 5) {
    // 6. 五爻动：占变卦静爻爻辞
    const still = [1, 2, 3, 4, 5, 6].find((p) => !m.includes(p))!;
    const yao = HEXAGRAMS[bianBin]?.yaos?.[still - 1];
    return {
      route: '五爻动·占变卦静爻爻辞',
      focusTitle: `${nameOfBinary(bianBin)}·${yaoTitle(bianBin, still)}（不变之爻）`,
      focusOriginal: yao?.text || '',
      focusXiang: yao?.xiang,
      benName,
      bianName: nameOfBinary(bianBin),
    };
  }
  // 7. 六爻全动
  if (benBin === '111111') {
    return {
      route: '六爻全动·乾占用九',
      focusTitle: '乾·用九',
      focusOriginal: '见群龙无首，吉。',
      benName,
      bianName: nameOfBinary(bianBin),
    };
  }
  if (benBin === '000000') {
    return {
      route: '六爻全动·坤占用六',
      focusTitle: '坤·用六',
      focusOriginal: '利永贞。',
      benName,
      bianName: nameOfBinary(bianBin),
    };
  }
  return {
    route: '六爻全动·占变卦卦辞',
    focusTitle: `${nameOfBinary(bianBin)}·卦辞`,
    focusOriginal: guaciOfBinary(bianBin),
    benName,
    bianName: nameOfBinary(bianBin),
  };
}

/** 主流程：周易义理排盘（结构化数据先行，文案由 LLM 生成后填充 report/quote） */
export function zhouyiCast(req: CastRequest, llmReport?: { metaphor: string; strategy: string; quote: string }): ZhouyiResult {
  const { tosses } = req;
  const benBin = tosses.map((v) => ((v as TossValue) === 7 || v === 9 ? '1' : '0')).join('');
  const bianBin = bianGuaBinary(tosses);
  const res = resolveFocus(tosses);
  const moving = guaFromTosses(tosses).moving;

  return {
    mode: 'ZHOUYI',
    benGua: {
      name: res.benName,
      guaci: guaciOfBinary(benBin),
      binary: benBin,
    },
    bianGua: moving.length > 0
      ? { name: res.bianName || nameOfBinary(bianBin), guaci: guaciOfBinary(bianBin), binary: bianBin }
      : undefined,
    movingIndexes: moving,
    route: res.route,
    focusLine: {
      title: res.focusTitle,
      original: res.focusOriginal,
      xiang: res.focusXiang,
    },
    report: {
      greeting: '见字如面。',
      metaphor: llmReport?.metaphor || '（LLM 待生成：象之隐喻）',
      strategy: llmReport?.strategy || '（LLM 待生成：破局之道）',
    },
    quote: llmReport?.quote || '藏器于身，待时而动。',
  };
}