/**
 * 双擎易学系统端到端联测
 * 直接调用排盘 + （可选）DeepSeek 文案生成
 */
import { najiaCast } from '../engines/najia/NajiaEngine';
import { zhouyiCast } from '../engines/zhouyi/ZhouyiEngine';
import { generateNajiaReport, generateZhouyiReport } from '../lib/llm/deepseek';
import type { CastRequest, Tosses } from '../engines/shared/types';

async function main() {
  const tosses: Tosses = [7, 8, 9, 7, 8, 6];
  const question = '今年春末、能否顺利转职？';
  const req: CastRequest = { mode: 'NAJIA', question, timestamp: Date.now(), tosses };

  console.log('== 六爻排盘 ==');
  const najia = najiaCast(req);
  console.log(JSON.stringify({
    stamp: najia.stamp,
    lines: najia.lines,
    tooltip: najia.tooltip,
    report: najia.report,
  }, null, 2));

  if (process.env.DEEPSEEK_API_KEY) {
    console.log('\n== DeepSeek 六爻文案 ==');
    const extra = await generateNajiaReport(najia, question);
    console.log(JSON.stringify(extra.report, null, 2));
  } else {
    console.log('\n(未配置 DEEPSEEK_API_KEY，跳过 LLM 文案测试)');
  }

  console.log('\n== 周易排盘（同一 tosses 复用）==');
  const zy = zhouyiCast({ ...req, mode: 'ZHOUYI' });
  console.log(JSON.stringify({
    benGua: zy.benGua,
    bianGua: zy.bianGua,
    route: zy.route,
    focusLine: zy.focusLine,
  }, null, 2));

  if (process.env.DEEPSEEK_API_KEY) {
    console.log('\n== DeepSeek 周易文案 ==');
    const extra2 = await generateZhouyiReport(zy, question);
    console.log(JSON.stringify({ report: extra2.report, quote: extra2.quote }, null, 2));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
