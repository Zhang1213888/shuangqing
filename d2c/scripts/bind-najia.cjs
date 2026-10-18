/**
 * Frame2178 六爻结果页 —— 数据绑定脚本
 * 把设计稿静态样例文本替换为 /api/cast 返回的动态数据
 */
const fs = require('fs');
const f = 'src/views/Frame2178.tsx';
let s = fs.readFileSync(f, 'utf8');

// ---- 每行（视觉自上而下 = 爻6 → 爻1）的示例文本 → 字段映射 ----
const rows = [
  { yao: 6, shen: '玄武', liuqin: '父母', gz: '戌土' },
  { yao: 5, shen: '白虎', liuqin: '兄弟', gz: '亥水' },
  { yao: 4, shen: '青龙', liuqin: '官鬼', gz: '午火' },
  { yao: 3, shen: '朱雀', liuqin: '妻财', gz: '酉金' },
  { yao: 2, shen: '勾陈', liuqin: '子孙', gz: '申金' },
  { yao: 1, shen: '螣蛇', liuqin: '父母', gz: '辰土' },
];

// 先注入组件头（若未注入）
if (!s.includes('useCastingState')) {
  s = s.replace(
    'import "@/styles/Frame2178.css";',
    'import { useNavigate } from "react-router";\n' +
    'import { useCastingState } from "@/lib/store";\n' +
    'import "@/styles/Frame2178.css";'
  );
  s = s.replace(
    /const Frame2178 = \(\) => \{\s*\n\s*return \(/,
    `const Frame2178 = () => {
    const navigate = useNavigate();
    const [state] = useCastingState();
    const r: any = state.najiaResult;
    const L = (i: number) => r?.lines?.[i - 1];
    const stampParts = (r?.stamp?.title || '— · —').split('·');
    return (`
  );
}

// 文本节点替换函数：定位 id="X" ... {"文本"} 结构
function bindNode(idPattern, replacement) {
  const re = new RegExp('(id="' + idPattern + '"[\\s\\S]{0,200}?\\{\\s*)"[^"]*"(\\s*\\})');
  if (re.test(s)) {
    s = s.replace(re, '$1' + replacement + '$2');
    return true;
  }
  return false;
}

// ---- 按文本内容找 id 并绑定（六神/六亲/地支 3 列 × 6 行）----
for (const row of rows) {
  for (const [text, field] of [[row.shen, 'liushen'], [row.liuqin, 'liuqin'], [row.gz, 'ganzhi']]) {
    const m = s.match(new RegExp('id="(2_\\d+)"[^>]*>\\s*\\{"' + text + '"\\}'));
    if (!m) { console.log('  跳过(未找到):', text); continue; }
    const id = m[1];
    // 只替换第一次出现（每行文本唯一）
    const re = new RegExp('(id="' + id + '"[\\s\\S]{0,200}?\\{\\s*)"' + text + '"(\\s*\\})');
    s = s.replace(re, '$1{L(' + row.yao + ')?.' + field + " ?? '—'}$2");
  }
}

// ---- 标签胶囊行：把每行的静态标签组替换为动态标签渲染 ----
// 找到六个标签容器行（每行一个 stroke-wrapper 里含标签文本），统一替换文本内容
const tagTexts = ['空亡', '月破', '动爻', '静爻', '世爻', '静爻'];
// 依次处理出现的标签文本节点（2_235 空亡 / 2_245 月破 / 2_254 动爻 / 2_263 静爻 / 2_272 世爻 / 2_281 静爻）
const tagBindings = [
  { text: '空亡', yao: 6 }, { text: '月破', yao: 5 }, { text: '动爻', yao: 4 },
  { text: '静爻', yao: 3 }, { text: '世爻', yao: 2 }, { text: '静爻', yao: 1 },
];
for (const tb of tagBindings) {
  const m = s.match(new RegExp('id="(2_\\d+)"[^>]*>\\s*\\{"' + tb.text + '"\\}'));
  if (!m) continue;
  const id = m[1];
  const re = new RegExp('(id="' + id + '"[\\s\\S]{0,200}?\\{\\s*)"' + tb.text + '"(\\s*\\})');
  s = s.replace(re, '$1{(L(' + tb.yao + ')?.tags || [])[0] ?? \'\'}$2');
}

// ---- 用神气泡 + 报告三段 ----
function bindByText(text, replacement) {
  const re = new RegExp('(\\{\\s*)"' + text + '"(\\s*\\})');
  if (re.test(s)) { s = s.replace(re, '$1' + replacement + '$2'); return true; }
  // 多行字符串形式 { \n "..." \n }
  const re2 = new RegExp('(\\{\\s*\\n\\s*)"' + text + '"(\\s*\\n\\s*\\})');
  if (re2.test(s)) { s = s.replace(re2, '$1' + replacement + '$2'); return true; }
  return false;
}

bindByText('用神 · 妻财卯木', "r ? `用神 · ${r.yongshenLiuqin}${r.lines?.[r.yongshenIndex-1]?.ganzhi || ''}` : '用神 · —'");
bindByText('用神即你真正惦记的那件事。此处妻财落于月破，眼下筹码被削，宜守不宜攻。', "r?.tooltip?.content ?? ''");
bindByText('你已在此位置停滞近两年，近来又添新的考核之累，心气被磨。', "r?.report?.verification ?? ''");
bindByText('财爻受月建冲破，你的筹码暂被削弱；急于此刻定局，反损其势。', "r?.report?.crux ?? ''");
bindByText('白露后 · 八月初三至初十', "r?.report?.timing ?? ''");

// ---- 印章区 ----
s = s.replace(/\{"財逢"\}/, '{stampParts[0] ?? ""}');
s = s.replace(/\{"月破"\}/, '{stampParts[1] ?? ""}');
bindByText('本月定性 · 乾为天之九三', "r ? `本月定性 · ${r.benGuaName}（${r.gong}宫）` : '本月定性'");
bindByText('财逢月破 · 凶', "r?.stamp?.title ?? '—'");
bindByText('所求之职，眼下为月建所制，短期难成；白露之后另有一线转机。', "r?.stamp?.subtitle ?? ''");

// ---- 底部按钮：再占一次 → 回首屏重置 ----
if (!s.includes('navigate(')) {
  s = s.replace(/\{"再占一次"\}/, '{"再占一次"}');
  s = s.replace(
    /className="frame-content-2_303 pixso-relative-flex">/,
    'className="frame-content-2_303 pixso-relative-flex" onClick={() => { sessionStorage.removeItem("sq_casting_state"); navigate("/"); }} style={{ cursor: "pointer" }}>'
  );
}

fs.writeFileSync(f, s);
console.log('Frame2178 数据绑定全部完成');
