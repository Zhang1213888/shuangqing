import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useCastingState, tossOnce, saveState } from "@/lib/store";
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
  const [landing, setLanding] = useState(false);
  const [counterKey, setCounterKey] = useState(0);
  const prevN = useRef(0);
  const landingTimer = useRef<number | null>(null);
  const question = state.question || "惟精惟一，心中默念所求之事";
  const modeTitle = state.mode === "ZHOUYI" ? "问道 · 周易" : "问事 · 六爻";

  /** 单次投掷：旋转动画持续到落爻（1400ms），模拟水平转动后停下 */
  const doToss = useCallback(() => {
    const cur = stateRef.current;
    if (cur.tosses.length >= 6 || casting || submitting) return;
    setCasting(true);
    const v = tossOnce();
    setTimeout(async () => {
      const tosses = [...cur.tosses, v];
      setCasting(false);
      setLanding(true);
      setCounterKey(k => k + 1);
      if (landingTimer.current) clearTimeout(landingTimer.current);
      landingTimer.current = window.setTimeout(() => setLanding(false), 700);
      if (tosses.length === 6) {
        update({ ...cur, tosses });
        setSubmitting(true);
        const resultKey = cur.mode === 'NAJIA' ? 'najiaResult' : 'zhouyiResult';
        const route = cur.mode === "NAJIA" ? "/najia" : "/zhouyi";
        try {
          const baseResult = await castApi({
            mode: cur.mode,
            question: cur.question || "惟精惟一，心中默念所求之事",
            timestamp: Date.now(),
            tosses: tosses as [number, number, number, number, number, number],
          });
          update({ ...cur, tosses, [resultKey]: baseResult, interpretLoading: true });
          navigate(route);
          interpretApi(baseResult, cur.question || "心中默念，凝神问卜").then((aiResult) => {
            saveState({ ...cur, tosses, [resultKey]: aiResult, interpretLoading: false });
          }).catch((e) => {
            console.warn("interpret 后台降级为引擎文案", e);
            saveState({ ...cur, tosses, [resultKey]: baseResult, interpretLoading: false });
          });
        } catch (e) {
          console.error(e);
          update({ ...cur, tosses: cur.tosses });
          setSubmitting(false);
        }
      } else {
        update({ ...cur, tosses });
      }
    }, 1400);
  }, [casting, submitting, navigate, update]);

  // 用 ref 读取最新 state（避免闭包旧值）
  const stateRef = useRef(state);
  stateRef.current = state;

  /** 点击触发一次起卦 */
  const handleToss = () => {
    navigator.vibrate?.([40, 60, 40]);
    doToss();
  };
  useEffect(() => () => { if (landingTimer.current) clearTimeout(landingTimer.current); }, []);
  useEffect(() => {
    if (stateRef.current.tosses.length >= 6) {
      update({ ...stateRef.current, tosses: [] });
    }
  }, []);

  const n = state.tosses.length;
  const posLabel = n >= 6 ? "六爻既成 · 卦象已定" : `第 ${n + 1} 爻 · 凝神再问`;

  return (
    <div className="scroll-container">
      <div id="2_90" className="Pixso-frame-2_90 pixso-relative-no-shrink pixso-flex">
        {/* 页头：返回 + 模式标题 + 装饰 */}
        <div className="sq-header">
          <p className="sq-header-back" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>←</p>
          <p className="sq-header-title">{modeTitle}</p>
        </div>

        {/* 所问 + 分隔线 */}
        <div className="sq-ask">
          <p className="sq-ask-label">默念</p>
          <p className="sq-ask-text">{question}</p>
          <div className="sq-ask-divider" />
        </div>

        {/* 中部：外环 + 铜钱（起卦旋转）+ 提示 */}
        <div className="sq-coin-stage">
          <div className="sq-coin-ring">
            <div
              className={"sq-coin" + (casting ? " spinning" : "") + (landing ? " landing" : "") + (n >= 6 || submitting ? " disabled" : "")}
              onClick={() => { if (!(n >= 6 || submitting || casting)) handleToss(); }}
              style={{ cursor: n >= 6 || submitting || casting ? "default" : "pointer" }}
            >
              <span className="sq-coin-char top">開</span>
              <span className="sq-coin-char right">通</span>
              <span className="sq-coin-char bottom">元</span>
              <span className="sq-coin-char left">寶</span>
              <div className="sq-coin-hole" />
            </div>
          </div>
          <p className="sq-coin-hint">
            {submitting ? "铜钱落定 · 推演中…" : casting ? "…落爻" : "轻触铜钱起卦 · 共投六次"}
          </p>
        </div>

        {/* 下部：六爻自下而生 + 凝神行 + 独立按钮行 */}
        <div className="sq-bottom">
          <div className="sq-bottom-head">
            <p>六爻 · 自下而生</p>
            <p key={counterKey} className="sq-counter-ink">已成 {n} / 6</p>
          </div>

          <div className="sq-yao-list">
            {[6, 5, 4, 3, 2, 1].map((pos) => (
              <YaoRow key={pos} pos={pos} v={state.tosses[pos - 1]} />
            ))}
          </div>

          <p className="sq-pos-label">{posLabel}</p>
        </div>
      </div>
    </div>
  );
};
export default Frame290;