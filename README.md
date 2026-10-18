# 双擎易学系统（shuangqing）

> 同源起卦，双轨分流 —— 融合 3D 物理交互与宋代极简水墨美学的数字易学应用

## 架构

```
浏览器(3D摇卦) ──tosses──▶ POST /api/cast ──┬─▶ NajiaEngine  (文王纳甲六爻)
                                            └─▶ ZhouyiEngine (周易义理·朱熹变占)
                      POST /api/interpret ──▶ DeepSeek LLM (两套约束Prompt)
```

## 目录

```
src/
├── engines/
│   ├── shared/          # 类型、基础数据表（干支五行八卦纳甲）、历法、起卦
│   │   ├── types.ts     #   全局类型（与 PRD 4. 接口规范一一对应）
│   │   ├── constants.ts #   浑天甲子纳甲表、八宫世应生成器、六神六亲、生克
│   │   ├── calendar.ts  #   日干支(子时换日)/节气月建/旬空/月破
│   │   └── casting.ts   #   crypto 真随机三币投掷、卦象还原
│   ├── najia/
│   │   └── NajiaEngine.ts   # 装卦→六神六亲→月破空亡扫描→用神→印章判定→三段报告
│   └── zhouyi/
│       ├── ZhouyiEngine.ts  # 朱熹变占七条路由 → 唯一焦点卦辞/爻辞
│       └── hexagrams.ts     # 64卦/384爻静态字典（程序化生成键，位序零误差）
├── lib/llm/
│   └── deepseek.ts      # DeepSeek 双系统提示词（六爻/周易各一套硬约束）
├── pages/api/
│   ├── cast.ts          # POST /api/cast  排盘（纯算法，毫秒级）
│   └── interpret.ts     # POST /api/interpret  LLM 深度文案（可降级）
└── scripts/
    ├── test-engines.ts  # 冒烟测试：字典完整性/分布检验/两引擎抽样断言
    └── e2e-demo.ts      # 端到端演示
```

## 快速开始

```bash
npm install
cp .env.example .env   # 填入 DEEPSEEK_API_KEY
npm run test:engines   # 引擎冒烟测试
npx tsx src/scripts/e2e-demo.ts
npm run dev            # 启动 Next.js
```

## 接口

### POST /api/cast
```json
{ "mode": "NAJIA", "question": "今年春末、能否顺利转职？", "timestamp": 1714521600000, "tosses": [7,8,9,7,8,6] }
```
- `NAJIA` → 印章/六爻表格/用神tooltip/三段报告（引擎内置文案）
- `ZHOUYI` → 焦点爻辞/变占路由/信笺报告骨架/金句

### POST /api/interpret
输入 `{ result, question }`（result 为 /api/cast 返回值），返回填充 DeepSeek 文案后的完整结果。未配置 key 时自动降级为引擎内置文案。

## 算法要点

- **投掷分布**：字=2/背=3，6:7:8:9 = 1:3:3:1（二项分布），crypto.getRandomValues 保证真随机
- **历法**：日干支以 2000-01-01 戊午为锚，含子时换日；月建按寿星公式节气交接；旬空由日干支旬位推得
- **纳甲装卦**：八宫世应表由京房卦变规则程序化生成（本宫/一世~五世/游魂/归魂），浑天甲子定干支，卦宫五行生克定六亲，日干起六神
- **用神推定**：问事关键词归类 → 用神六亲 → 动爻优先/持世优先
- **朱熹变占**：0~6 动爻七条路由（含乾用九/坤用六特例），唯一锁定焦点爻辞
