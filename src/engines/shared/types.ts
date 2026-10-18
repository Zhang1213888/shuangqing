/**
 * 双擎易学系统 —— 共享类型定义
 * 同源起卦，双轨分流：NajiaEngine（文王纳甲六爻）+ ZhouyiEngine（周易义理）
 */

/** 起卦模式 */
export type CastMode = 'NAJIA' | 'ZHOUYI';

/** 单次三枚铜钱投掷求和值：6(老阴·动) 7(少阳) 8(少阴) 9(老阳·动) */
export type TossValue = 6 | 7 | 8 | 9;

/** 一次完整起卦的六次投掷结果，index 0 = 初爻（自下而生） */
export type Tosses = [TossValue, TossValue, TossValue, TossValue, TossValue, TossValue];

/** 提交起卦请求 (POST /api/cast) */
export interface CastRequest {
  mode: CastMode;
  question: string;
  /** 起卦时间戳（毫秒） */
  timestamp: number;
  tosses: Tosses;
}

/** 阴阳爻类型 */
export type YaoKind = 'YANG' | 'YIN';
/** 是否动爻：6(老阴)/9(老阳)为动 */
export type Moving = true | false;

/** 五行 */
export type WuXing = '金' | '木' | '水' | '火' | '土';

/** 天干 */
export type TianGan = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';

/** 地支 */
export type DiZhi = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

/** 六神（按日干起） */
export type LiuShen = '青龙' | '朱雀' | '勾陈' | '螣蛇' | '白虎' | '玄武';

/** 六亲（按本宫五行生克） */
export type LiuQin = '父母' | '兄弟' | '子孙' | '妻财' | '官鬼';

/** 八卦（经卦） */
export type Trigram = '乾' | '兑' | '离' | '震' | '巽' | '坎' | '艮' | '坤';

/** 八宫（京房八宫） */
export type BaGong = Trigram;

/** 状态胶囊标签 */
export type LineTag = '月破' | '空亡' | '动爻' | '用神' | '世爻' | '应爻' | '伏神' | '反吟' | '伏吟';

/** 单爻排盘结果 */
export interface NajiaLine {
  /** 爻位：1=初爻 ... 6=上爻（自下而上） */
  index: number;
  /** 爻画阴阳（本卦爻） */
  kind: YaoKind;
  /** 是否动爻 */
  isMoving: Moving;
  /** 动爻变出后的阴阳（变卦对应位） */
  changedKind?: YaoKind;
  liushen: LiuShen;
  liuqin: LiuQin | '';
  /** 纳甲干支，如 "卯木"（地支+五行）或含天干 */
  ganzhi: string;
  dizhi: DiZhi;
  wuxing: WuXing;
  tags: LineTag[];
}

/** 历法信息 */
export interface CalendarInfo {
  /** 月建地支（节气月） */
  yuejian: DiZhi;
  yuejianWuxing: WuXing;
  /** 日辰地支 */
  richen: DiZhi;
  richenWuxing: WuXing;
  /** 日辰天干 */
  richenGan: TianGan;
  /** 当日旬空（两个地支） */
  xunkong: DiZhi[];
  /** 月破地支（与月建相冲） */
  yuepo: DiZhi;
}

/** 六爻模式完整排盘响应 */
export interface NajiaResult {
  mode: 'NAJIA';
  calendar: CalendarInfo;
  /** 本宫（卦宫五行） */
  gong: BaGong;
  gongWuxing: WuXing;
  /** 本卦名 */
  benGuaName: string;
  /** 变卦名（无动爻则同本卦） */
  bianGuaName: string;
  /** 世爻位置 1-6 */
  shiIndex: number;
  /** 应爻位置 1-6 */
  yingIndex: number;
  /** 用神爻位（自动推定，可被前端覆写） */
  yongshenIndex: number | null;
  /** 用神六亲（依据问事类型） */
  yongshenLiuqin: LiuQin;
  stamp: {
    title: string;
    subtitle: string;
  };
  lines: Array<{
    index: number;
    liushen: LiuShen;
    liuqin: LiuQin | '';
    ganzhi: string;
    tags: LineTag[];
    isYongshen: boolean;
    isMoving: boolean;
    kind: YaoKind;
  }>;
  tooltip: {
    title: string;
    content: string;
  };
  report: {
    verification: string;
    crux: string;
    timing: string;
  };
  /** 供 LLM 的原始推演数据 */
  analysis: {
    yongshenDetail: string;
    yuejianRelation: string;
    richenRelation: string;
    shiyaoRelation: string;
    movingLines: string[];
  };
}

/** 周易模式响应 */
export interface ZhouyiResult {
  mode: 'ZHOUYI';
  /** 本卦 */
  benGua: {
    name: string;
    guaci: string;
    binary: string; // 自下而上，1=阳 0=阴
  };
  /** 变卦（无动爻则为空） */
  bianGua?: {
    name: string;
    guaci: string;
    binary: string;
  };
  /** 动爻位列表 1-6 */
  movingIndexes: number[];
  /** 朱熹变占法则命中的路由 */
  route: string;
  focusLine: {
    title: string;
    original: string;
    xiang?: string;
  };
  report: {
    greeting: string;
    metaphor: string;
    strategy: string;
  };
  quote: string;
}

/** 响应联合类型 */
export type CastResponse = NajiaResult | ZhouyiResult;
