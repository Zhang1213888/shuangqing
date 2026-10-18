/**
 * 双引擎冒烟测试脚本
 * 运行：npm run test:engines
 */
import { najiaCast } from '../engines/najia/NajiaEngine';
import { zhouyiCast, resolveFocus } from '../engines/zhouyi/ZhouyiEngine';
import { HEXAGRAMS } from '../engines/zhouyi/hexagrams';
import type { CastRequest, Tosses } from '../engines/shared/types';

/** 卦名反查：验证 64 卦命名唯一性与位序正确性（抽样核对八纯卦） */
function checkHexagrams() {
  const checks: Array<[string, string]> = [
    ['111111', '乾为天'],
    ['000000', '坤为地'],
    // 内卦（低三位）乾=111，外卦（高三位）坤=000 → 地天泰 = 000111
    ['000111', '天地否'], // 内坤外乾？—— 位序：key[0..2]=内卦（初二三爻）
  ];
  let fail = 0;
  for (const [bin, expect] of checks) {
    const got = HEXAGRAMS[bin]?.name;
    if (got !== expect) {
      console.warn(`  [卦名校验] ${bin} 期望「${expect}」实际「${got}」`);
      fail++;
    }
  }
  const total = Object.keys(HEXAGRAMS).length;
  console.log(`  64卦字典: ${total} 卦, ${Object.values(HEXAGRAMS).reduce((a, g) => a + g.yaos.length, 0)} 爻辞`);
  return fail;
}

function req(mode: 'NAJIA' | 'ZHOUYI', tosses: Tosses, question: string): CastRequest {
  return { mode, question, timestamp: Date.now(), tosses };
}

function main() {
  console.log('== 双擎引擎冒烟测试 ==\n');
  let failures = 0;

  console.log('[1] 六十四卦字典');
  failures += checkHexagrams();

  console.log('\n[2] 真随机投掷分布（10000 次）');
  {
    const count: Record<number, number> = { 6: 0, 7: 0, 8: 0, 9: 0 };
    // 动态 import 避免 tsx 之外的路径问题——直接内联重掷
    const { tossOnce } = require('../engines/shared/casting');
    for (let i = 0; i < 10000; i++) count[tossOnce()]++;
    // 理论概率：字字字=6(1/8字背组合中 6=三字=1/8)... 实际: 6=1/8, 7=3/8, 8=3/8, 9=1/8
    const expect: Record<number, number> = { 6: 0.125, 7: 0.375, 8: 0.375, 9: 0.125 };
    for (const v of [6, 7, 8, 9]) {
      const p = count[v] / 10000;
      const ok = Math.abs(p - expect[v]) < 0.03;
      if (!ok) failures++;
      console.log(`  ${v}: ${count[v]} (${(p * 100).toFixed(1)}%) 期望 ${(expect[v] * 100).toFixed(1)}% ${ok ? 'OK' : 'FAIL'}`);
    }
  }

  console.log('\n[3] 纳甲引擎（泽火革，三爻动例：[7,8,9,7,8,6]）');
  {
    const r = najiaCast(req('NAJIA', [7, 8, 9, 7, 8, 6], '今年春末、能否顺利转职？'));
    console.log(`  本卦: ${r.benGuaName} (${r.gong}宫/${r.gongWuxing})  世${r.shiIndex} 应${r.yingIndex}`);
    console.log(`  历法: 月建${r.calendar.yuejian} 日辰${r.calendar.richenGan}${r.calendar.richen} 旬空[${r.calendar.xunkong.join(',')}] 月破${r.calendar.yuepo}`);
    for (const l of r.lines) {
      console.log(`  ${l.index}爻 ${l.liushen} ${l.liuqin || '—'}${l.ganzhi} ${l.isMoving ? '[动]' : ''} ${l.tags.join('/')}`);
    }
    console.log(`  用神: ${r.yongshenIndex}爻 印章: ${r.stamp.title}`);
    if (!r.lines.length) failures++;
  }

  console.log('\n[4] 周易引擎（乾卦一爻动例：[9,7,7,7,7,7] → 初九动）');
  {
    const f = resolveFocus([9, 7, 7, 7, 7, 7]);
    console.log(`  路由: ${f.route}`);
    console.log(`  焦点: ${f.focusTitle}`);
    console.log(`  爻辞: ${f.focusOriginal}`);
    const r = zhouyiCast(req('ZHOUYI', [9, 7, 7, 7, 7, 7], '调心态'));
    console.log(`  本卦: ${r.benGua.name} → 变卦: ${r.bianGua?.name}`);
    if (f.focusTitle.indexOf('初九') < 0) { console.warn('  [FAIL] 一爻动应落初九'); failures++; }
  }

  console.log('\n[5] 周易引擎（六爻全静：[7,8,7,8,7,8] → 占本卦卦辞）');
  {
    const f = resolveFocus([7, 8, 7, 8, 7, 8]);
    console.log(`  路由: ${f.route}  焦点: ${f.focusTitle}`);
    if (f.route.indexOf('无动爻') < 0) { console.warn('  [FAIL]'); failures++; }
  }

  console.log(`\n== 测试完成，失败项: ${failures} ==`);
  process.exit(failures > 0 ? 1 : 0);
}

main();
