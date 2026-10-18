/**
 * 历法四柱换算模块
 * 依据时间戳计算：日干支（含子时换日）、月建（节气月）、旬空、月破。
 *
 * 说明：节气交接采用"寿星公式"近似（21 世纪 C 值），误差 ±1 日以内；
 * 对六爻月建判定而言，若恰逢交接日边缘，建议前端允许用户手工校正月建。
 */
import { DI_ZHI, GAN_WUXING, TIAN_GAN, ZHI_WUXING, chong } from './constants';
import type { CalendarInfo, DiZhi, TianGan, WuXing } from './types';

/** 21 世纪十二节（立春、惊蛰、清明、立夏、芒种、小暑、立秋、白露、寒露、立冬、大雪、小寒）寿星公式 C 值 */
const JIE_C_21C: Array<{ term: string; C: number; month: number; zhi: DiZhi }> = [
  { term: '立春', C: 3.87, month: 2, zhi: '寅' },
  { term: '惊蛰', C: 5.63, month: 3, zhi: '卯' },
  { term: '清明', C: 4.81, month: 4, zhi: '辰' },
  { term: '立夏', C: 5.52, month: 5, zhi: '巳' },
  { term: '芒种', C: 5.678, month: 6, zhi: '午' },
  { term: '小暑', C: 7.108, month: 7, zhi: '未' },
  { term: '立秋', C: 7.5, month: 8, zhi: '申' },
  { term: '白露', C: 7.646, month: 9, zhi: '酉' },
  { term: '寒露', C: 8.318, month: 10, zhi: '戌' },
  { term: '立冬', C: 7.438, month: 11, zhi: '亥' },
  { term: '大雪', C: 7.18, month: 12, zhi: '子' },
  { term: '小寒', C: 5.4055, month: 1, zhi: '丑' },
];

/** 计算某年某节的大约日期（几号交接） */
function jieDay(year: number, term: { C: number; month: number }): number {
  const Y = year % 100;
  // 1、2 月的节（小寒/立春）闰年公式需以 (Y-1)/4 取整
  const isJanFeb = term.month <= 2;
  const L = isJanFeb ? Math.floor((Y - 1) / 4) : Math.floor(Y / 4);
  return Math.floor(Y * 0.2422 + term.C) - L;
}

/** 纪日基准：2000-01-01 为戊午日（六十甲子序 54，甲子=0） */
const EPOCH_GANZHI_INDEX = 54;
const EPOCH_DATE_UTC = Date.UTC(2000, 0, 1);

/** 由时间戳求日干支序号（0-59）。子时换日：本地 23:00 起算次日干支 */
export function dayGanzhiIndex(ts: number): number {
  const d = new Date(ts);
  // 子时（23:00+）归次日
  const dayShift = d.getHours() >= 23 ? 1 : 0;
  const localMidnight = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + dayShift, -d.getTimezoneOffset() / 60);
  const days = Math.floor((localMidnight - EPOCH_DATE_UTC) / 86400000);
  return ((days + EPOCH_GANZHI_INDEX) % 60 + 60) % 60;
}

/** 日干支序号 → 天干 */
export function ganOfIndex(i: number): TianGan {
  return TIAN_GAN[i % 10];
}

/** 日干支序号 → 地支 */
export function zhiOfIndex(i: number): DiZhi {
  return DI_ZHI[i % 12];
}

/** 旬空推算：六十甲子中，甲X旬空亡为该旬对应的两个地支 */
export function xunkongOf(dayIndex: number): DiZhi[] {
  const xunStartZhiIdx = dayIndex % 12; // 旬首地支（甲X 之 X）
  const k1 = DI_ZHI[(xunStartZhiIdx + 10) % 12];
  const k2 = DI_ZHI[(xunStartZhiIdx + 11) % 12];
  return [k1, k2];
}

/** 月建推算（节气月）：按时间戳在年内的节交接日期表中定位 */
export function yuejianOf(ts: number): { zhi: DiZhi; jie: string } {
  const d = new Date(ts);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  // 生成年内的节交接表（含跨年小寒）
  const jieList = JIE_C_21C.map((t) => ({
    ...t,
    day: jieDay(year, t),
    year: t.month === 1 ? year : year,
  }));
  // 小寒属于当年 1 月；上年 12 月大雪 之后 → 上年小寒之后的丑月?（简化：大雪→子月跨年，用当年/上年两次尝试）
  // 构建候选：(year-1) 与 year 两年的节序列，从中找 ts 之前最近的节
  const candidates: Array<{ zhi: DiZhi; jie: string; date: Date }> = [];
  for (const y of [year - 1, year]) {
    for (const t of JIE_C_21C) {
      const day_ = jieDay(y, t);
      // 1 月小寒归属当年 1 月；12 月大雪归属当年 12 月；其余同理
      const dt = new Date(y, t.month - 1, day_, 12);
      candidates.push({ zhi: t.zhi, jie: t.term, date: dt });
    }
  }
  candidates.sort((a, b) => a.date.getTime() - b.date.getTime());
  let current = candidates[0];
  for (const c of candidates) {
    if (c.date.getTime() <= ts) current = c;
    else break;
  }
  void month; void day;
  return { zhi: current.zhi, jie: current.jie };
}

/** 完整历法信息 */
export function buildCalendar(ts: number): CalendarInfo {
  const dayIdx = dayGanzhiIndex(ts);
  const richenGan = ganOfIndex(dayIdx);
  const richen = zhiOfIndex(dayIdx);
  const { zhi: yuejian, jie } = yuejianOf(ts);
  const xunkong = xunkongOf(dayIdx);
  const yuepo = DI_ZHI[(DI_ZHI.indexOf(yuejian) + 6) % 12];
  const info: CalendarInfo = {
    yuejian,
    yuejianWuxing: ZHI_WUXING[yuejian],
    richen,
    richenWuxing: ZHI_WUXING[richen],
    richenGan,
    xunkong,
    yuepo,
  };
  void jie; // 节气名可在 UI 展示
  return info;
}

/** 地支五行速查（供引擎内使用） */
export function zhiWuxing(z: DiZhi): WuXing {
  return ZHI_WUXING[z];
}

/** 干组合出"卯木"式字符串 */
export function ganzhiLabel(gan: TianGan | '', zhi: DiZhi): string {
  const w = ZHI_WUXING[zhi];
  return gan ? `${zhi}${w}` : `${zhi}${w}`;
}

export { GAN_WUXING, chong };
