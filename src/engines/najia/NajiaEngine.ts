/**
 * 模块 A：起卦与纳甲引擎 (NajiaEngine)
 * 文王纳甲六爻：装卦（寻宫定世应、浑天甲子纳干支、配六亲、起六神）
 * → 生克状态扫描（月破/空亡/动爻/用神）→ 结构化判定。
 */
import {
  GONG_WUXING,
  LIUSHEN_QIFA,
  NAJIA_TABLE,
  ZHI_WUXING,
  buildBagongTable,
  chong,
  he,
  liuqinOf,
  shengKe,
} from '../shared/constants';
import { buildCalendar, dayGanzhiIndex, ganOfIndex } from '../shared/calendar';
import { bianGuaBinary, changedKind, guaFromBinary, guaFromTosses, isMoving, yaoKind } from '../shared/casting';
import type {
  CalendarInfo,
  CastRequest,
  DiZhi,
  LiuQin,
  LiuShen,
  NajiaLine,
  NajiaResult,
  Tosses,
  Trigram,
  WuXing,
  YaoKind,
} from '../shared/types';

/** 八宫世应表（模块级缓存） */
const BAGONG = buildBagongTable();

/** 六十四卦名表：由上下卦得出（可用经典卦名覆盖表增强） */
const GUA_NAMES: Partial<Record<string, string>> = {
  乾乾: '乾为天', 坤坤: '坤为地', 震震: '震为雷', 巽巽: '巽为风',
  坎坎: '坎为水', 离离: '离为火', 艮艮: '艮为山', 兑兑: '兑为泽',
  乾坤: '天地否', 坤乾: '地天泰', 震巽: '雷风恒', 巽震: '风雷益',
  坎离: '水火既济', 离坎: '火水未济', 艮兑: '山泽损', 兑艮: '泽山咸',
  乾坎: '天水讼', 坎乾: '水天需', 乾离: '天火同人', 离乾: '火天大有',
  乾震: '天雷无妄', 震乾: '雷天大壮', 乾巽: '天风姤', 巽乾: '风天小畜',
  乾艮: '天山遁', 艮乾: '山天大畜', 乾兑: '天泽履', 兑乾: '泽天夬',
  坤坎: '地水师', 坎坤: '水地比', 坤离: '地火明夷', 离坤: '火地晋',
  坤震: '地雷复', 震坤: '雷地豫', 坤巽: '地风升', 巽坤: '风地观',
  坤艮: '地山谦', 艮坤: '山地剥', 坤兑: '地泽临', 兑坤: '泽地萃',
  坎艮: '水山蹇', 艮坎: '山水蒙', 坎兑: '水泽节', 兑坎: '泽水困',
  坎震: '水雷屯', 震坎: '雷水解', 坎巽: '水风井', 巽坎: '风水涣',
  离艮: '火山旅', 艮离: '山火贲', 离兑: '火泽睽', 兑离: '泽火革',
  离震: '火雷噬嗑', 震离: '雷火丰', 离巽: '火风鼎', 巽离: '风火家人',
  震艮: '雷山小过', 艮震: '山雷颐', 震兑: '雷泽归妹', 兑震: '泽雷随',
  巽艮: '风山渐', 艮巽: '山风蛊', 巽兑: '风泽中孚', 兑巽: '泽风大过',
};

function guaName(wai: Trigram, nei: Trigram): string {
  const key = `${wai}${nei}`;
  return GUA_NAMES[key] || `${wai}${nei}卦`;
}

/** 问事类型 → 用神六亲推定 */
export type AskCategory = '事业' | '财运' | '感情' | '健康' | '官司' | '出行' | '考试' | '寻人寻物' | '综合' | '通用';

/** 简单关键词归类问事 */
export function categorize(question: string): AskCategory {
  const q = question || '';
  const table: Array<[AskCategory, string[]]> = [
    ['财运', ['财', '钱', '收入', '生意', '投资', '赚', '亏', '薪酬', '工资', '债']],
    ['事业', ['职', '工作', '事业', '升', '跳槽', '转职', '面试', '项目', '创业', '调岗']],
    ['感情', ['婚', '恋', '感情', '对象', '分手', '复合', '追', '桃花']],
    ['考试', ['考', '试', '学', '上岸', '录取', '公考']],
    ['健康', ['病', '健康', '手术', '痊愈', '身体']],
    ['官司', ['官司', '诉讼', '纠纷', '被告']],
    ['出行', ['行', '出差', ' travel', '旅途', '搬家', '迁']],
    ['寻人寻物', ['找', '寻', '失物', '丢']],
  ];
  for (const [cat, keys] of table) {
    if (keys.some((k) => q.includes(k.trim()))) return cat;
  }
  return '综合';
}

const YONGSHEN_MAP: Record<AskCategory, LiuQin> = {
  财运: '妻财',
  事业: '官鬼',
  感情: '妻财',
  考试: '父母',
  健康: '官鬼',
  官司: '官鬼',
  出行: '父母',
  寻人寻物: '妻财',
  综合: '官鬼',
  通用: '官鬼',
};

/** 用神推定：优先取六亲持世/出现之爻 */
function pickYongshen(lines: NajiaLine[], want: LiuQin): number | null {
  // 1) 取动爻中的用神
  const movingHit = lines.find((l) => l.liuqin === want && l.isMoving);
  if (movingHit) return movingHit.index;
  // 2) 取任意出现的用神（两现取近世/持世者）
  const hits = lines.filter((l) => l.liuqin === want);
  if (hits.length > 0) {
    const withShi = hits.find((l) => l.tags.includes('世爻'));
    return (withShi ?? hits[0]).index;
  }
  // 3) 用神不现 → 取元神（生用神者）
  return null;
}

/** 主流程：纳甲排盘 */
export function najiaCast(req: CastRequest): NajiaResult {
  const { tosses, timestamp, question } = req;
  const calendar = buildCalendar(timestamp);
  const { wai, nei } = guaFromTosses(tosses);
  const key = `${wai}${nei}`;
  const entry = BAGONG[key];

  if (!entry) throw new Error(`八宫表缺失卦: ${key}`);

  const { gong, shi, ying } = { gong: entry.gong, shi: entry.shi, ying: entry.ying };
  const gongWuxing = GONG_WUXING[gong];
  const benGuaName = guaName(wai, nei);

  // ---- 变卦计算 ----
  const { wai: bgWai, nei: bgNei } = guaFromBinary(bianGuaBinary(tosses));
  const bianGuaName = guaName(bgWai, bgNei);

  // ---- 装干支（浑天甲子）----
  const neiNajia = NAJIA_TABLE[nei].nei;
  const waiNajia = NAJIA_TABLE[wai].wai;
  const zhiPerYao: DiZhi[] = [neiNajia.zhi[0], neiNajia.zhi[1], neiNajia.zhi[2], waiNajia.zhi[0], waiNajia.zhi[1], waiNajia.zhi[2]];
  const ganPerYao = [neiNajia.gan, neiNajia.gan, neiNajia.gan, waiNajia.gan, waiNajia.gan, waiNajia.gan];

  // ---- 起六神（按日干，自初爻起）----
  const shenSeq: LiuShen[] = LIUSHEN_QIFA[calendar.richenGan] || LIUSHEN_QIFA['甲'];

  // ---- 装六亲 + 组装爻数据 ----
  const lines: NajiaLine[] = [];
  for (let i = 1; i <= 6; i++) {
    const toss = tosses[i - 1];
    const zhi = zhiPerYao[i - 1];
    const wuxing = ZHI_WUXING[zhi];
    const liuqin = liuqinOf(gongWuxing, wuxing);
    lines.push({
      index: i,
      kind: yaoKind(toss),
      isMoving: isMoving(toss),
      changedKind: changedKind(toss),
      liushen: shenSeq[i - 1],
      liuqin,
      ganzhi: `${zhi}${wuxing}`,
      dizhi: zhi,
      wuxing,
      tags: [],
    });
  }

  // ---- 世应标记 ----
  lines[shi - 1].tags.push('世爻');
  lines[ying - 1].tags.push('应爻');

  // ---- 动爻标记 ----
  lines.forEach((l) => {
    if (l.isMoving) l.tags.push('动爻');
  });

  // ---- 状态扫描：月破 / 空亡 ----
  lines.forEach((l) => {
    if (chong(l.dizhi, calendar.yuejian)) l.tags.push('月破');
    if (calendar.xunkong.includes(l.dizhi)) l.tags.push('空亡');
  });

  // ---- 用神推定 ----
  const cat = categorize(question);
  let yongshenLiuqin: LiuQin;
  let yongshenIndex: number | null;
  let yongshenLine: NajiaLine | null = null;

  if (cat === '综合') {
    // "神兆机于动"：纯默念模式下动态取用神
    const movingLines = lines.filter((l) => l.isMoving);
    if (movingLines.length > 0) {
      const shiLine = lines[shi - 1];
      const shiMoving = movingLines.find((l) => l.index === shi);
      if (shiMoving) {
        // 世爻发动，取世爻为机枢
        yongshenLine = shiMoving;
      } else {
        // 取与世爻发生生克冲合的动爻；若无则取最上方动爻
        const related = movingLines.find((l) => {
          const rel = shengKe(shiLine.wuxing, l.wuxing);
          return rel !== '同我' || chong(shiLine.dizhi, l.dizhi) || he(shiLine.dizhi, l.dizhi);
        });
        yongshenLine = related || movingLines[movingLines.length - 1];
      }
      yongshenLiuqin = (yongshenLine.liuqin || '官鬼') as LiuQin;
      yongshenIndex = yongshenLine.index;
    } else {
      // 六爻皆静，直接取世爻
      yongshenLine = lines[shi - 1];
      yongshenLiuqin = (yongshenLine.liuqin || '官鬼') as LiuQin;
      yongshenIndex = shi;
    }
  } else {
    yongshenLiuqin = YONGSHEN_MAP[cat] || '官鬼';
    yongshenIndex = pickYongshen(lines, yongshenLiuqin);
    yongshenLine = yongshenIndex ? (lines.find((l) => l.index === yongshenIndex) ?? null) : null;
  }
  if (yongshenLine) yongshenLine.tags.push('用神');

  // ---- 生克关系分析（供 LLM 与 stamp 判定）----
  const analysis = analyzeState(lines, calendar, gongWuxing, yongshenLine, shi, bianGuaName);

  // ---- 印章判定（凶/吉/平）----
  const stamp = judgeStamp(analysis, yongshenLine);

  const result: NajiaResult = {
    mode: 'NAJIA',
    calendar,
    gong,
    gongWuxing,
    benGuaName,
    bianGuaName,
    shiIndex: shi,
    yingIndex: ying,
    yongshenIndex,
    yongshenLiuqin,
    stamp,
    lines: lines.map((l) => ({
      index: l.index,
      liushen: l.liushen,
      liuqin: l.liuqin,
      ganzhi: l.ganzhi,
      dizhi: l.dizhi,
      wuxing: l.wuxing,
      tags: l.tags,
      isYongshen: l.tags.includes('用神'),
      isMoving: l.isMoving,
      kind: l.kind,
    })),
    lineRelations: Object.fromEntries(lines.map((l) => [l.index, {
      yuejian: formatRelation(`月建${calendar.yuejian}`, calendar.yuejianWuxing, `${l.liuqin}${l.ganzhi}`, l.wuxing),
      richen: formatRelation(`日辰${calendar.richen}`, calendar.richenWuxing, `${l.liuqin}${l.ganzhi}`, l.wuxing),
    }])),
    tooltip: {
      title: yongshenLine ? `用神：${yongshenLine.liuqin}${yongshenLine.ganzhi}` : `用神不现，看${yongshenLiuqin}伏藏`,
      content: tooltipText(yongshenLine, yongshenLiuqin, analysis),
    },
    report: {
      verification: reportVerification(analysis, question),
      crux: reportCrux(analysis, yongshenLine),
      timing: reportTiming(analysis, yongshenLine, calendar),
    },
    analysis,
  };

  return result;
}

/** 生克状态汇总 */
function formatRelation(sourceName: string, selfWx: WuXing, targetName: string, targetWx: WuXing): string {
  const rel = shengKe(selfWx, targetWx);
  switch (rel) {
    case '同我': return `${sourceName}与${targetName}比和帮扶`;
    case '我生': return `${sourceName}生助${targetName}`;
    case '我克': return `${sourceName}克制${targetName}`;
    case '生我': return `${sourceName}受${targetName}相生（泄耗${targetName}）`;
    case '克我': return `${sourceName}被${targetName}所耗`;
  }
}

function analyzeState(
  lines: NajiaLine[],
  cal: CalendarInfo,
  gongWuxing: WuXing,
  yongshen: NajiaLine | null,
  shi: number,
  bianGuaName: string,
) {
  const shiLine = lines[shi - 1];
  const yongshenDetail = yongshen
    ? `${yongshen.liuqin}${yongshen.ganzhi}（第${yongshen.index}爻${yongshen.isMoving ? '，发动' : '，安静'}）`
    : '用神不现（伏藏），以生用之神参断';

  let yuejianRelation = '';
  let richenRelation = '';
  if (yongshen) {
    yuejianRelation = formatRelation(`月建${cal.yuejian}`, cal.yuejianWuxing, '用神', yongshen.wuxing);
    richenRelation = formatRelation(`日辰${cal.richen}`, cal.richenWuxing, '用神', yongshen.wuxing);
  }

  const relShi = yongshen ? shengKe(shiLine.wuxing, yongshen.wuxing) : '';
  const shiyaoRelation = yongshen
    ? formatRelation(`世爻${shiLine.ganzhi}`, shiLine.wuxing, '用神', yongshen.wuxing)
    : `世爻${shiLine.ganzhi}持${shiLine.liuqin}`;

  const movingLines = lines
    .filter((l) => l.isMoving)
    .map((l) => `${l.liushen}${l.liuqin}${l.ganzhi}（第${l.index}爻）动，变${l.changedKind === 'YANG' ? '阳' : '阴'}，入${bianGuaName ? `变卦${bianGuaName}` : ''}`);

  return { yongshenDetail, yuejianRelation, richenRelation, shiyaoRelation, movingLines, shiKeYongshen: relShi === '我克' };
}

/** 印章定性 */
function judgeStamp(
  a: ReturnType<typeof analyzeState>,
  yongshen: NajiaLine | null,
): { title: string; subtitle: string } {
  if (!yongshen) {
    return { title: '用神不现·待时', subtitle: '所问之事机缘未显，宜静观其变，不宜强求。' };
  }
  const yuePo = yongshen.tags.includes('月破');
  const kongWang = yongshen.tags.includes('空亡');
  const moving = yongshen.isMoving;

  let title: string;
  let subtitle: string;
  if (yuePo) {
    title = `${yongshen.liuqin}逢月破·凶`;
    subtitle = '用神被月建冲破，根基动摇，本月之事难成，强为则有损。';
  } else if (kongWang && !moving) {
    title = `${yongshen.liuqin}落空亡·暂阻`;
    subtitle = '用神旬空，事有虚实之象，出空之日方能见真章。';
  } else if (kongWang && moving) {
    title = `${yongshen.liuqin}空而动·先虚后实`;
    subtitle = '空亡发动，冲空实空之日应吉凶，事非定局。';
  } else if (moving) {
    title = `${yongshen.liuqin}发动·有变`;
    subtitle = '用神发动，事在变动之中，成败系于动之生克走向。';
  } else {
    title = `${yongshen.liuqin}安静·守成`;
    subtitle = '用神安静旺相，事体平稳，宜守常待时。';
  }
  return { title, subtitle };
}

function tooltipText(
  yongshen: NajiaLine | null,
  want: LiuQin,
  a: ReturnType<typeof analyzeState>,
): string {
  if (!yongshen) {
    return `卦中${want}不上卦，用神伏藏。伏者，事藏于表象之下，需借飞神引拔，待值日应期。`;
  }
  const tagDesc = yongshen.tags.filter((t) => t !== '用神').join('、');
  return `用神即你真正惦记的那件事。此卦用神为${yongshen.liuqin}${yongshen.ganzhi}，居第${yongshen.index}爻，${yongshen.isMoving ? '发动主事有变' : '安静主事未起'}${tagDesc ? `，带【${tagDesc}】之象` : ''}。${a.yuejianRelation}，${a.richenRelation}。`;
}

function reportVerification(a: ReturnType<typeof analyzeState>, question: string): string {
  return `所问「${question || '此事'}」。卦示：${a.yongshenDetail}；${a.shiyaoRelation}。${a.movingLines.length ? `卦中动象：${a.movingLines.join('；')}。` : '六爻安静，事局平稳。'}据此核验，你当下所处之境与卦象所指相符。`;
}

function reportCrux(a: ReturnType<typeof analyzeState>, yongshen: NajiaLine | null): string {
  if (!yongshen) return '核心症结在于用神伏藏——事情的关键要素尚未浮出水面，你所掌握的信息不完整，贸然推进容易踩空。';
  const parts: string[] = [];
  if (yongshen.tags.includes('月破')) parts.push(`用神${yongshen.ganzhi}受月建冲破，根本受损`);
  if (yongshen.tags.includes('空亡')) parts.push(`用神落旬空，事体虚而不实`);
  if (a.movingLines.length === 0) parts.push('全局无动爻，局面缺乏转机之力');
  if (a.shiKeYongshen) parts.push('世爻克制用神，自身立场与所求之事存在内在冲突');
  if (parts.length === 0) parts.push('用神无大碍，症结在于时机未至、火候未到');
  return `核心症结：${parts.join('；')}。`;
}

function reportTiming(
  a: ReturnType<typeof analyzeState>,
  yongshen: NajiaLine | null,
  cal: CalendarInfo,
): string {
  if (yongshen && yongshen.tags.includes('月破')) {
    const zhi = yongshen.dizhi;
    return `月破之爻逢合逢生可解。应期看${zhi}值日（合破之日）或下一个节气月转后，即${zhi}日/亥合${zhi}之类值日应事。`;
  }
  if (yongshen && yongshen.tags.includes('空亡')) {
    return `用神旬空，应期在出空逢冲之日。出空则实，宜候${yongshen.dizhi}值日或冲空之日再断进退。`;
  }
  if (a.movingLines.length > 0) {
    return `卦有发动，动而逢合逢值应事。留意${(yongshen?.dizhi || cal.richen)}值日前后，事见分晓。`;
  }
  return `六爻安静，以用神值日为应期。可重点关注${yongshen ? yongshen.dizhi : cal.richen}日前后之事机。`;
}

/** 校验用（导出内部工具） */
export { dayGanzhiIndex, ganOfIndex, isMoving, type Tosses };