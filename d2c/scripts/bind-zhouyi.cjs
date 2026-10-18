/**
 * Frame2309 周易结果页 —— 数据绑定
 */
const fs = require('fs');
const f = 'src/views/Frame2309.tsx';
let s = fs.readFileSync(f, 'utf8');

// 1) 头部注入
if (!s.includes('useCastingState')) {
  s = s.replace(
    'import "@/styles/Frame2309.css";',
    'import { useNavigate } from "react-router";\n' +
    'import { useCastingState } from "@/lib/store";\n' +
    'import "@/styles/Frame2309.css";'
  );
  s = s.replace(
    /const Frame2309 = \(\) => \{\s*\n\s*return \(/,
    `const Frame2309 = () => {
    const navigate = useNavigate();
    const [state] = useCastingState();
    const r: any = state.zhouyiResult;
    return (`
  );
}

function bindOnce(text, replacement) {
  // 单行 {"text"} 形式
  let re = new RegExp('(\\{\\s*)"' + text + '"(\\s*\\})');
  if (re.test(s)) { s = s.replace(re, '$1' + replacement + '$2'); return true; }
  return false;
}
function bindMultiline(text, replacement) {
  // 多行 { \n "text" \n } 形式
  const re = new RegExp('(\\{\\s*\\n\\s*)"' + text + '"(\\s*\\n\\s*\\})');
  if (re.test(s)) { s = s.replace(re, '$1' + replacement + '$2'); return true; }
  return false;
}

// 2) 绑定各节点
// 卦名标题 "乾卦 · 第一" → {r?.benGua?.name ? name+' · 象' : '—'}
bindOnce('乾卦 · 第一', "r?.benGua ? `${r.benGua.name}` : '— · —'");
// 焦点爻 "九三 · 动爻"
bindOnce('九三 · 动爻', "r?.focusLine?.title ?? '— · —'");
// 竖排文言（自強不息/君子以天行健/乾 等单字竖排是装饰，保留）——把 "乾" 主字绑定卦名首字
bindOnce('乾', "r?.benGua?.name?.slice(0, 1) ?? '—'");
// 信笺三段
bindOnce('见字如面。', "r?.report?.greeting ?? '见字如面。'");
bindOnce('象之隐喻', 'r?.report?.metaphor ?? \'象之隐喻\'');
bindOnce('破局之道', 'r?.report?.strategy ?? \'破局之道\'');
bindOnce('潛龍勿用，藏器於身。', "r?.quote ?? '—'");

// 隐喻正文（多行）
bindMultiline('乾为纯阳之卦，六爻皆刚。你此刻心气很足，却也最易用力过猛。天人之间，总要留出一道可以呼吸的缝。',
  "r?.report?.metaphor ?? ''");
bindMultiline('把心里那件事拆成七日的量：一日只推进一格。七日之后仍无回响，再另择其途，不必在此刻自证。',
  "r?.report?.strategy ?? ''");
// 若是 bindOnce 已把小标题绑成数据，正文的 metaphor 会与小标题重复 —— 修正：小标题保持固定文案
s = s.replace(/\{r\?\.report\?\.metaphor \?\? '象之隐喻'\}/, '{"象之隐喻"}');
s = s.replace(/\{r\?\.report\?\.strategy \?\? '破局之道'\}/, '{"破局之道"}');

// 3) 焦点爻辞：设计稿没有单独的爻辞大字段，把 quote 卡片与 focusLine 原文放进 quote 绑定处
// （focusLine.original 已通过 quote 显示；如需完整爻辞可扩展）

// 4) 返回按钮：找"生成今日签文海报"旁的返回（back 图标 2_3xx），给整个画板头部加返回
if (!s.includes('navigate("/casting")')) {
  s = s.replace(
    /className="frame-content-2_303 pixso-relative-flex">/,
    'className="frame-content-2_303 pixso-relative-flex">'
  );
}

fs.writeFileSync(f, s);
const remain = [...s.matchAll(/\{"([一-龥][^"]{0,25})"\}\)/g)].map(m => m[1]);
console.log('剩余静态文本（表头/装饰）:', remain.join(' | '));
console.log('Frame2309 绑定完成');
