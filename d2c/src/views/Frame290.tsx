import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useCastingState, tossOnce } from "@/lib/store";
import { castApi, interpretApi } from "@/lib/api";
import "@/styles/Frame290.css";

/** 爻位名：自下而上 初/二/三/四/五/上 + 九(阳)六(阴) */
function yaoLabel(pos: number, v?: number): string {
  const num = ["初", "二", "三", "四", "五", "上"][pos - 1];
  if (v === undefined) return `${num}爻`;
  const yy = v === 7 || v === 9 ? "九" : "六";
  if (pos === 1) return `初${yy}`;
  if (pos === 6) return `上${yy}`;
  return `${yy}${num}`;
}

/** 爻画：空=虚线槽 / 阳爻=实线 / 阴爻=双段 / 动爻=朱砂红 + 印章 */
const YaoRow = ({ pos, v }: { pos: number; v?: number }) => (
  <div className="sq-yao-row">
    <span className={"sq-yao-label" + (v === 6 || v === 9 ? " moving" : "")}>{yaoLabel(pos, v)}</span>
    <div className="sq-yao-figure-zone">
      {!v ? (
        <i className="sq-yao-line empty" />
      ) : (
        <i className={"sq-yao-line" + (v === 6 || v === 9 ? " moving" : v === 7 ? " yang" : " yin-wrap")}>
          {v === 8 || v === 6 ? <span /> : null}
          {v === 8 || v === 6 ? <span /> : null}
        </i>
      )}
      {(v === 6 || v === 9) && <em className="sq-yao-dong">動</em>}
    </div>
  </div>
);

const Frame290 = () => {
  const navigate = useNavigate();
  const [state, update] = useCastingState();
  const [casting, setCasting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const question = state.question || "所求何事？";
  const modeTitle = state.mode === "ZHOUYI" ? "问道 · 周易" : "问事 · 六爻";

  /** 单次投掷：旋转动画持续到落爻（1400ms），模拟水平转动后停下 */
  const doToss = useCallback(async () => {
    const cur = stateRef.current;
    if (cur.tosses.length >= 6 || casting || submitting) return;
    setCasting(true);
    const v = tossOnce();
    setTimeout(async () => {
      const tosses = [...cur.tosses, v];
      setCasting(false);
      if (tosses.length === 6) {
        setSubmitting(true);
        try {
          let result = await castApi({
            mode: cur.mode,
            question: cur.question || "心之所惑",
            timestamp: Date.now(),
            tosses: tosses as [number, number, number, number, number, number],
          });
          try {
            result = await interpretApi(result, cur.question || "心之所惑");
          } catch (e) {
            console.warn("interpret 降级为引擎文案", e);
          }
          update({ ...cur, tosses, [cur.mode === 'NAJIA' ? 'najiaResult' : 'zhouyiResult']: result });
          navigate(cur.mode === "NAJIA" ? "/najia" : "/zhouyi");
        } catch (e) {
          console.error(e);
          update({ ...cur, tosses });
        }
        setSubmitting(false);
      } else {
        update({ ...cur, tosses });
      }
    }, 1400);
  }, [casting, submitting, navigate, update]);

  // 用 ref 读取最新 state（避免闭包旧值）
  const stateRef = useRef(state);
  stateRef.current = state;

  /** 长按：连投直到 6 爻满或松手 */
  const startHold = () => {
    if (holdTimer.current) return;
    doToss();
    holdTimer.current = window.setInterval(() => {
      if (stateRef.current.tosses.length >= 6) {
        stopHold();
        return;
      }
      doToss();
    }, 1600);
  };
  const stopHold = () => {
    if (holdTimer.current) {
      clearInterval(holdTimer.current);
      holdTimer.current = null;
    }
  };
  useEffect(() => () => stopHold(), []);

  const n = state.tosses.length;
  const posLabel = n >= 6 ? "六爻既成 · 卦象已定" : `第 ${n + 1} 爻 · 凝神再问`;

  return (
    <div className="scroll-container">
      <div id="2_90" className="Pixso-frame-2_90 pixso-relative-no-shrink pixso-flex">
        {/* 页头：返回 + 模式标题 + 装饰 */}
        <div className="sq-header">
          <p className="sq-header-back" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>←</p>
          <p className="sq-header-title">{modeTitle}</p>
          <p className="sq-header-more">···</p>
        </div>

        {/* 所问 + 分隔线 */}
        <div className="sq-ask">
          <p className="sq-ask-label">所问</p>
          <p className="sq-ask-text">{question}</p>
          <div className="sq-ask-divider" />
        </div>

        {/* 中部：外环 + 铜钱（起卦旋转）+ 提示 */}
        <div className="sq-coin-stage">
          <div className="sq-coin-ring">
            <div className={"sq-coin" + (casting ? " spinning" : "")}>
              <span className="sq-coin-char top">開</span>
              <span className="sq-coin-char right">通</span>
              <span className="sq-coin-char bottom">元</span>
              <span className="sq-coin-char left">寶</span>
              <div className="sq-coin-hole" />
            </div>
          </div>
          <p className="sq-coin-hint">
            {submitting ? "铜钱落定 · 推演中…" : casting ? "…落爻" : "长按下方起卦 · 松手成爻"}
          </p>
        </div>

        {/* 下部：六爻自下而生 + 凝神行 + 独立按钮行 */}
        <div className="sq-bottom">
          <div className="sq-bottom-head">
            <p>六爻 · 自下而生</p>
            <p>已成 {n} / 6</p>
          </div>

          <div className="sq-yao-list">
            {[6, 5, 4, 3, 2, 1].map((pos) => (
              <YaoRow key={pos} pos={pos} v={state.tosses[pos - 1]} />
            ))}
          </div>

          <p className="sq-pos-label">{posLabel}</p>

          <div className="sq-cast-btn-wrap">
            <button
              id="2_175"
              className="sq-cast-btn"
              onPointerDown={startHold}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              disabled={n >= 6 || submitting}
            >
              <i className="sq-cast-dot" />
              {submitting ? "推演中…" : n >= 6 ? "卦象已成" : "长按起卦"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Frame290;
