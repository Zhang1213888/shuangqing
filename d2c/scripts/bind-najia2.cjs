/**
 * Frame2178 六爻结果页 —— 完整重写绑定（一次性、幂等）
 * 设计稿行序（视觉自上而下 = 爻6 → 爻1）：
 *   玄武 父母 戌土 空亡 | 白虎 兄弟 申金 ? | 青龙 官鬼 午火 动爻
 *   朱雀 妻财 卯木 用神 | 勾陈 妻财 寅木 世爻 | 螣蛇 子孙 子水 静爻
 */
const fs = require('fs');
const f = 'src/views/Frame2178.tsx';
let s = fs.readFileSync(f, 'utf8');

// 真实行序映射：按地支文本唯一定位 → 爻位
const ganzhiMap = { 戌土: 6, 申金: 5, 午火: 4, 卯木: 3, 寅木: 2, 子水: 1 };
// 六神设计稿行序：玄武(6) 白虎(5) 青龙(4) 朱雀(3) 勾陈(2) 螣蛇(1)
const shenMap = { 玄武: 6, 白虎: 5, 青龙: 4, 朱雀: 3, 勾陈: 2, 螣蛇: 1 };
// 六亲：父母(6) 兄弟(5) 官鬼(4) 妻财(3) 妻财(2) 子孙(1) —— 注意妻财出现两次，需按上下文行序处理
const liuqinSeq = ['父母', '兄弟', '官鬼', '妻财', '妻财', '子孙']; // yao 6..1

function replaceFirst(textNodeText, replacement) {
  const re = new RegExp('(\\{\\s*)"' + textNodeText + '"(\\s*\\})');
  if (re.test(s)) { s = s.replace(re, '$1' + replacement + '$2'); return true; }
  return false;
}

// ---- 1) 六神列：六神文本在设计稿中唯一出现一次（每神一次）----
for (const [shen, yao] of Object.entries(shenMap)) {
  if (!replaceFirst(shen, `{L(${yao})?.liushen ?? '—'}`)) console.log('六神未找到:', shen);
}

// ---- 2) 六亲列：妻财出现两次，按出现顺序分别绑 L(3)、L(2) ----
let qiancaiCount = 0;
{
  let idx;
  const re = /(\{\s*)"妻财"(\s*\})/g;
  s = s.replace(re, (m0, p1, p2) => {
    qiancaiCount++;
    const yao = qiancaiCount === 1 ? 3 : 2; // 第一个妻财是爻3（设计稿第4行），第二个是爻2
    return `${p1}{L(${yao})?.liuqin ?? '—'}${p2}`;
  });
}
for (const [t, yao] of [['父母', 6], ['兄弟', 5], ['官鬼', 4], ['子孙', 1]]) {
  if (!replaceFirst(t, `{L(${yao})?.liuqin ?? '—'}`)) console.log('六亲未找到:', t);
}

// ---- 3) 地支列 ----
for (const [gz, yao] of Object.entries(ganzhiMap)) {
  if (!replaceFirst(gz, `{L(${yao})?.ganzhi ?? '—'}`)) console.log('地支未找到:', gz);
}

// ---- 4) 标签胶囊：空亡(6) 月破(5) 动爻(4) 用神(3) 世爻(2) 静爻(1) ----
// 设计稿顺序：空亡 月破 动爻 [用神] 世爻 静爻 —— 注意"用神"在 2_375 附近也出现在 tooltip 标题，只处理胶囊位
// 胶囊文本依序替换第一组未绑定匹配
replaceFirst('空亡', "{(L(6)?.tags || [])[0] ?? ''}");
replaceFirst('月破', "{(L(5)?.tags || [])[0] ?? ''}");
replaceFirst('动爻', "{(L(4)?.tags || [])[0] ?? ''}");
// "用神" 胶囊在六爻表格第4行（L(3) tags[0]）
{
  const re = /(\{\s*)"用神"(\s*\})/;
  s = s.replace(re, "$1{(L(3)?.tags || [])[0] ?? ''}$2");
}
replaceFirst('世爻', "{(L(2)?.tags || [])[0] ?? ''}");
replaceFirst('静爻', "{(L(1)?.tags || [])[0] ?? ''}");

// ---- 5) 双标签行（动爻/静爻等第二标签）暂不处理：tags[0] 已覆盖主要信息 ----

fs.writeFileSync(f, s);

// 校验
const remaining = [...s.matchAll(/\{"([一-龥]{1,4})"\}\)/g)].length;
console.log('绑定完成。剩余静态中文节点（应为表头与固定文案）:');
const statics = [...s.matchAll(/\{\"([一-龥]{1,4})\"\}/g)].map(m => m[1]);
console.log(statics.join(','));
