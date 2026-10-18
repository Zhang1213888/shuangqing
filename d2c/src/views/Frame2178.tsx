import { useState } from "react";
import { useNavigate } from "react-router";
import { useCastingState } from "@/lib/store";
import "@/styles/Frame2178.css";
const Frame2178 = () => {
    const navigate = useNavigate();
    const [state] = useCastingState();
    const r = state.najiaResult;
    const L = (i: number) => r?.lines?.[i - 1];
    const [selectedLine, setSelectedLine] = useState<number>(() => r?.yongshenIndex || r?.shiIndex || 6);
    const getPrimaryTag = (line: any): string => {
      if (!line) return '—';
      const t = line.tags || [];
      if (t.includes('用神')) return '用神';
      if (t.includes('月破')) return '月破';
      if (t.includes('空亡')) return '空亡';
      if (t.includes('动爻')) return '动爻';
      if (t.includes('世爻')) return '世爻';
      if (t.includes('应爻')) return '应爻';
      return '静爻';
    };
    const getTagStyle = (tag: string): { color: string; borderColor: string; backgroundColor: string } => {
      switch (tag) {
        case '用神': return { color: 'var(--c-gold)', borderColor: 'var(--c-gold)', backgroundColor: 'rgba(176, 141, 79, 0.08)' };
        case '月破': case '动爻': return { color: 'var(--c-cinnabar)', borderColor: 'rgba(200, 60, 35, 0.4)', backgroundColor: 'rgba(200, 60, 35, 0.06)' };
        case '世爻': case '应爻': return { color: 'var(--c-bamboo)', borderColor: 'var(--c-bamboo)', backgroundColor: 'transparent' };
        case '空亡': case '静爻': default: return { color: 'var(--c-ink-light)', borderColor: 'var(--c-hairline)', backgroundColor: 'transparent' };
      }
    };
    const stampParts = (r?.stamp?.title || '— · —').split('·');
    return (
        <div className="scroll-container">
            <div
                id="2_178"
                className="Pixso-frame-2_178 pixso-relative-no-shrink pixso-flex"
            >
                                <div
                    id="2_199"
                    className="Pixso-frame-2_199 pixso-relative-no-shrink pixso-flex"
                >
                    <div className="frame-content-2_199 pixso-relative-flex">
                        <div
                            id="2_200"
                            className="Pixso-vector-2_200 pixso-relative-no-shrink"
                            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--c-ink)" }}
                            onClick={() => navigate("/")}
                        >←</div>
                        <p
                            id="2_203"
                            className="Pixso-paragraph-2_203 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {"问事 · 六爻"}
                        </p>
                        <div
                            id="2_204"
                            className="Pixso-vector-2_204 pixso-relative-no-shrink"
                        ></div>
                    </div>
                </div>
                <div
                    id="2_210"
                    className="Pixso-frame-2_210 pixso-relative-no-shrink pixso-flex-auto-height"
                >
                    <div className="frame-content-2_210 pixso-relative-flex">
                        <div
                            id="2_211"
                            className="stroke-wrapper-2_211 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="Pixso-frame-2_211 pixso-relative-no-shrink pixso-flex">
                                <div className="frame-content-2_211 pixso-relative-flex">
                                    <div
                                        id="2_212"
                                        className="Pixso-frame-2_212 pixso-relative-no-shrink pixso-flex"
                                    >
                                        <div className="frame-content-2_212 pixso-relative-flex">
                                            <p
                                                id="2_213"
                                                className="Pixso-paragraph-2_213 pixso-relative-auto-size pixso-flex-shrink-0"
                                                style={(() => { const t = stampParts[0] || ''; if (t.length >= 5) return { fontSize: '12px', letterSpacing: '0px' }; return undefined; })()}
                                            >
                                                {stampParts[0] ?? "卦成"}
                                            </p>
                                            <p
                                                id="2_214"
                                                className="Pixso-paragraph-2_214 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {stampParts[1] ?? ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        id="2_215"
                                        className="Pixso-frame-2_215 pixso-relative-flex pixso-h-auto"
                                    >
                                        <div className="frame-content-2_215 pixso-relative-flex">
                                            <p
                                                id="2_216"
                                                className="Pixso-paragraph-2_216 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {r ? `本月定性 · ${r.benGuaName}${r.bianGuaName && r.bianGuaName !== r.benGuaName ? `之${r.bianGuaName}` : ''}（${r.gong}宫）` : "本月定性"}
                                            </p>
                                            <p
                                                id="2_217"
                                                className="Pixso-paragraph-2_217 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {r?.stamp?.title ?? "—"}
                                            </p>
                                            <p
                                                id="2_218"
                                                className="Pixso-paragraph-2_218 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {r?.stamp?.subtitle ?? ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="stroke-2_211"></div>
                        </div>
                        <div
                            id="2_219"
                            className="Pixso-frame-2_219 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_219 pixso-relative-flex">
                                <div
                                    id="2_220"
                                    className="Pixso-frame-2_220 pixso-relative-no-shrink pixso-flex"
                                >
                                    <div className="frame-content-2_220 pixso-relative-flex">
                                        <p
                                            id="2_221"
                                            className="Pixso-paragraph-2_221 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"六神"}
                                        </p>
                                        <p
                                            id="2_222"
                                            className="Pixso-paragraph-2_222 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"爻象"}
                                        </p>
                                        <p
                                            id="2_223"
                                            className="Pixso-paragraph-2_223 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"六亲"}
                                        </p>
                                        <p
                                            id="2_224"
                                            className="Pixso-paragraph-2_224 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"地支"}
                                        </p>
                                        <p
                                            id="2_225"
                                            className="Pixso-paragraph-2_225 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"标记"}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    id="2_226"
                                    className="stroke-wrapper-2_226 pixso-relative-no-shrink pixso-flex"
                                    onClick={() => setSelectedLine(6)}
                                    style={{ cursor: "pointer", backgroundColor: selectedLine === 6 ? 'rgba(176, 141, 79, 0.08)' : undefined, borderLeft: selectedLine === 6 ? '2px solid var(--c-gold)' : '2px solid transparent' }}
                                >
                                    <div className="Pixso-frame-2_226 pixso-relative-no-shrink pixso-flex"></div>
                                    <div className="stroke-2_226"></div>
                                    <div className="Pixso-frame-2_226-content-layer">
                                        <div className="frame-content-2_226 pixso-relative-flex">
                                            <p
                                                id="2_227"
                                                className="Pixso-paragraph-2_227 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(6)?.liushen ?? '—'}
                                            </p>
                                            <div
                                                id="2_228"
                                                className="Pixso-frame-2_228 pixso-relative-no-shrink pixso-flex"
                                            >
                                              {L(6)?.kind === 'YANG' ? (
                                                <div style={{ width: '100%', height: 4, background: L(6)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, alignSelf: "center" }} />
                                              ) : (
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', width: '100%' }}>
                                                  <div style={{ height: 4, background: L(6)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                  <div style={{ height: 4, background: L(6)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                </div>
                                              )}
                                            </div>
                                            <p
                                                id="2_231"
                                                className="Pixso-paragraph-2_231 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(6)?.liuqin ?? '—'}
                                            </p>
                                            <p
                                                id="2_232"
                                                className="Pixso-paragraph-2_232 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(6)?.ganzhi ?? '—'}
                                            </p>
                                            <div
                                                id="2_233"
                                                className="Pixso-frame-2_233 pixso-relative-flex"
                                            >
                                                <div className="frame-content-2_233 pixso-relative-flex">
                                                    {(() => { const tag6 = getPrimaryTag(L(6)); const s6 = getTagStyle(tag6); return (<>
                                                    <div
                                                        id="2_234"
                                                        className="stroke-wrapper-2_234 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_234 pixso-relative-no-shrink pixso-flex" style={{ backgroundColor: s6.backgroundColor }}>
                                                            <p
                                                                id="2_235"
                                                                className="Pixso-paragraph-2_235 pixso-relative-auto-size pixso-flex-shrink-0"
                                                                style={{ color: s6.color }}
                                                            >
                                                                {tag6}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_234" style={{ borderColor: s6.borderColor }}></div>
                                                    </div>
</>); })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_236"
                                    className="stroke-wrapper-2_236 pixso-relative-no-shrink pixso-flex"
                                    onClick={() => setSelectedLine(5)}
                                    style={{ cursor: "pointer", backgroundColor: selectedLine === 5 ? 'rgba(176, 141, 79, 0.08)' : undefined, borderLeft: selectedLine === 5 ? '2px solid var(--c-gold)' : '2px solid transparent' }}
                                >
                                    <div className="Pixso-frame-2_236 pixso-relative-no-shrink pixso-flex"></div>
                                    <div className="stroke-2_236"></div>
                                    <div className="Pixso-frame-2_236-content-layer">
                                        <div className="frame-content-2_236 pixso-relative-flex">
                                            <p
                                                id="2_237"
                                                className="Pixso-paragraph-2_237 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(5)?.liushen ?? '—'}
                                            </p>
                                            <div
                                                id="2_238"
                                                className="Pixso-frame-2_238 pixso-relative-no-shrink pixso-flex"
                                            >
                                              {L(5)?.kind === 'YANG' ? (
                                                <div style={{ width: '100%', height: 4, background: L(5)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, alignSelf: "center" }} />
                                              ) : (
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', width: '100%' }}>
                                                  <div style={{ height: 4, background: L(5)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                  <div style={{ height: 4, background: L(5)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                </div>
                                              )}
                                            </div>
                                            <p
                                                id="2_241"
                                                className="Pixso-paragraph-2_241 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(5)?.liuqin ?? '—'}
                                            </p>
                                            <p
                                                id="2_242"
                                                className="Pixso-paragraph-2_242 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(5)?.ganzhi ?? '—'}
                                            </p>
                                            <div
                                                id="2_243"
                                                className="Pixso-frame-2_243 pixso-relative-flex"
                                            >
                                                <div className="frame-content-2_243 pixso-relative-flex">
                                                    {(() => { const tag5 = getPrimaryTag(L(5)); const s5 = getTagStyle(tag5); return (<>
                                                    <div
                                                        id="2_244"
                                                        className="stroke-wrapper-2_244 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_244 pixso-relative-no-shrink pixso-flex" style={{ backgroundColor: s5.backgroundColor }}>
                                                            <p
                                                                id="2_245"
                                                                className="Pixso-paragraph-2_245 pixso-relative-auto-size pixso-flex-shrink-0"
                                                                style={{ color: s5.color }}
                                                            >
                                                                {tag5}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_244" style={{ borderColor: s5.borderColor }}></div>
                                                    </div>
</>); })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_246"
                                    className="stroke-wrapper-2_246 pixso-relative-no-shrink pixso-flex"
                                    onClick={() => setSelectedLine(4)}
                                    style={{ cursor: "pointer", backgroundColor: selectedLine === 4 ? 'rgba(176, 141, 79, 0.08)' : undefined, borderLeft: selectedLine === 4 ? '2px solid var(--c-gold)' : '2px solid transparent' }}
                                >
                                    <div className="Pixso-frame-2_246 pixso-relative-no-shrink pixso-flex"></div>
                                    <div className="stroke-2_246"></div>
                                    <div className="Pixso-frame-2_246-content-layer">
                                        <div className="frame-content-2_246 pixso-relative-flex">
                                            <p
                                                id="2_247"
                                                className="Pixso-paragraph-2_247 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(4)?.liushen ?? '—'}
                                            </p>
                                            <div
                                                id="2_248"
                                                className="Pixso-frame-2_248 pixso-relative-no-shrink pixso-flex"
                                            >
                                              {L(4)?.kind === 'YANG' ? (
                                                <div style={{ width: '100%', height: 4, background: L(4)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, alignSelf: "center" }} />
                                              ) : (
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', width: '100%' }}>
                                                  <div style={{ height: 4, background: L(4)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                  <div style={{ height: 4, background: L(4)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                </div>
                                              )}
                                            </div>
                                            <p
                                                id="2_250"
                                                className="Pixso-paragraph-2_250 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(4)?.liuqin ?? '—'}
                                            </p>
                                            <p
                                                id="2_251"
                                                className="Pixso-paragraph-2_251 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(4)?.ganzhi ?? '—'}
                                            </p>
                                            <div
                                                id="2_252"
                                                className="Pixso-frame-2_252 pixso-relative-flex"
                                            >
                                                <div className="frame-content-2_252 pixso-relative-flex">
                                                    {(() => { const tag4 = getPrimaryTag(L(4)); const s4 = getTagStyle(tag4); return (<>
                                                    <div
                                                        id="2_253"
                                                        className="stroke-wrapper-2_253 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_253 pixso-relative-no-shrink pixso-flex" style={{ backgroundColor: s4.backgroundColor }}>
                                                            <p
                                                                id="2_254"
                                                                className="Pixso-paragraph-2_254 pixso-relative-auto-size pixso-flex-shrink-0"
                                                                style={{ color: s4.color }}
                                                            >
                                                                {tag4}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_253" style={{ borderColor: s4.borderColor }}></div>
                                                    </div>
</>); })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_255"
                                    className="stroke-wrapper-2_255 pixso-relative-no-shrink pixso-flex"
                                    onClick={() => setSelectedLine(3)}
                                    style={{ cursor: "pointer", backgroundColor: selectedLine === 3 ? 'rgba(176, 141, 79, 0.08)' : undefined, borderLeft: selectedLine === 3 ? '2px solid var(--c-gold)' : '2px solid transparent' }}
                                >
                                    <div className="Pixso-frame-2_255 pixso-relative-no-shrink pixso-flex"></div>
                                    <div className="stroke-2_255"></div>
                                    <div className="Pixso-frame-2_255-content-layer">
                                        <div className="frame-content-2_255 pixso-relative-flex">
                                            <p
                                                id="2_256"
                                                className="Pixso-paragraph-2_256 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(3)?.liushen ?? '—'}
                                            </p>
                                            <div
                                                id="2_257"
                                                className="Pixso-frame-2_257 pixso-relative-no-shrink pixso-flex"
                                            >
                                              {L(3)?.kind === 'YANG' ? (
                                                <div style={{ width: '100%', height: 4, background: L(3)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, alignSelf: "center" }} />
                                              ) : (
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', width: '100%' }}>
                                                  <div style={{ height: 4, background: L(3)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                  <div style={{ height: 4, background: L(3)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                </div>
                                              )}
                                            </div>
                                            <p
                                                id="2_259"
                                                className="Pixso-paragraph-2_259 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(3)?.liuqin ?? '—'}
                                            </p>
                                            <p
                                                id="2_260"
                                                className="Pixso-paragraph-2_260 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(3)?.ganzhi ?? '—'}
                                            </p>
                                            <div
                                                id="2_261"
                                                className="Pixso-frame-2_261 pixso-relative-flex"
                                            >
                                                <div className="frame-content-2_261 pixso-relative-flex">
                                                    {(() => { const tag3 = getPrimaryTag(L(3)); const s3 = getTagStyle(tag3); return (<>
                                                    <div
                                                        id="2_262"
                                                        className="stroke-wrapper-2_262 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_262 pixso-relative-no-shrink pixso-flex" style={{ backgroundColor: s3.backgroundColor }}>
                                                            <p
                                                                id="2_263"
                                                                className="Pixso-paragraph-2_263 pixso-relative-auto-size pixso-flex-shrink-0"
                                                                style={{ color: s3.color }}
                                                            >
                                                                {tag3}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_262" style={{ borderColor: s3.borderColor }}></div>
                                                    </div>
</>); })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_264"
                                    className="stroke-wrapper-2_264 pixso-relative-no-shrink pixso-flex"
                                    onClick={() => setSelectedLine(2)}
                                    style={{ cursor: "pointer", backgroundColor: selectedLine === 2 ? 'rgba(176, 141, 79, 0.08)' : undefined, borderLeft: selectedLine === 2 ? '2px solid var(--c-gold)' : '2px solid transparent' }}
                                >
                                    <div className="Pixso-frame-2_264 pixso-relative-no-shrink pixso-flex"></div>
                                    <div className="stroke-2_264"></div>
                                    <div className="Pixso-frame-2_264-content-layer">
                                        <div className="frame-content-2_264 pixso-relative-flex">
                                            <p
                                                id="2_265"
                                                className="Pixso-paragraph-2_265 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(2)?.liushen ?? '—'}
                                            </p>
                                            <div
                                                id="2_266"
                                                className="Pixso-frame-2_266 pixso-relative-no-shrink pixso-flex"
                                            >
                                              {L(2)?.kind === 'YANG' ? (
                                                <div style={{ width: '100%', height: 4, background: L(2)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, alignSelf: "center" }} />
                                              ) : (
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', width: '100%' }}>
                                                  <div style={{ height: 4, background: L(2)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                  <div style={{ height: 4, background: L(2)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                </div>
                                              )}
                                            </div>
                                            <p
                                                id="2_269"
                                                className="Pixso-paragraph-2_269 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(2)?.liuqin ?? '—'}
                                            </p>
                                            <p
                                                id="2_270"
                                                className="Pixso-paragraph-2_270 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(2)?.ganzhi ?? '—'}
                                            </p>
                                            <div
                                                id="2_271"
                                                className="Pixso-frame-2_271 pixso-relative-flex"
                                            >
                                                <div className="frame-content-2_271 pixso-relative-flex">
                                                    {(() => { const tag2 = getPrimaryTag(L(2)); const s2 = getTagStyle(tag2); return (<>
                                                    <div
                                                        id="2_272"
                                                        className="stroke-wrapper-2_272 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_272 pixso-relative-no-shrink pixso-flex" style={{ backgroundColor: s2.backgroundColor }}>
                                                            <p
                                                                id="2_273"
                                                                className="Pixso-paragraph-2_273 pixso-relative-auto-size pixso-flex-shrink-0"
                                                                style={{ color: s2.color }}
                                                            >
                                                                {tag2}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_272" style={{ borderColor: s2.borderColor }}></div>
                                                    </div>
</>); })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_274"
                                    className="stroke-wrapper-2_274 pixso-relative-no-shrink pixso-flex"
                                    onClick={() => setSelectedLine(1)}
                                    style={{ cursor: "pointer", backgroundColor: selectedLine === 1 ? 'rgba(176, 141, 79, 0.08)' : undefined, borderLeft: selectedLine === 1 ? '2px solid var(--c-gold)' : '2px solid transparent' }}
                                >
                                    <div className="Pixso-frame-2_274 pixso-relative-no-shrink pixso-flex"></div>
                                    <div className="stroke-2_274"></div>
                                    <div className="Pixso-frame-2_274-content-layer">
                                        <div className="frame-content-2_274 pixso-relative-flex">
                                            <p
                                                id="2_275"
                                                className="Pixso-paragraph-2_275 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(1)?.liushen ?? '—'}
                                            </p>
                                            <div
                                                id="2_276"
                                                className="Pixso-frame-2_276 pixso-relative-no-shrink pixso-flex"
                                            >
                                              {L(1)?.kind === 'YANG' ? (
                                                <div style={{ width: '100%', height: 4, background: L(1)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, alignSelf: "center" }} />
                                              ) : (
                                                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', width: '100%' }}>
                                                  <div style={{ height: 4, background: L(1)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                  <div style={{ height: 4, background: L(1)?.isMoving ? 'var(--c-cinnabar)' : 'var(--c-ink)', borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                </div>
                                              )}
                                            </div>
                                            <p
                                                id="2_278"
                                                className="Pixso-paragraph-2_278 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(1)?.liuqin ?? '—'}
                                            </p>
                                            <p
                                                id="2_279"
                                                className="Pixso-paragraph-2_279 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {L(1)?.ganzhi ?? '—'}
                                            </p>
                                            <div
                                                id="2_280"
                                                className="Pixso-frame-2_280 pixso-relative-flex"
                                            >
                                                <div className="frame-content-2_280 pixso-relative-flex">
                                                    {(() => { const tag1 = getPrimaryTag(L(1)); const s1 = getTagStyle(tag1); return (<>
                                                    <div
                                                        id="2_281"
                                                        className="stroke-wrapper-2_281 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_281 pixso-relative-no-shrink pixso-flex" style={{ backgroundColor: s1.backgroundColor }}>
                                                            <p
                                                                id="2_282"
                                                                className="Pixso-paragraph-2_282 pixso-relative-auto-size pixso-flex-shrink-0"
                                                                style={{ color: s1.color }}
                                                            >
                                                                {tag1}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_281" style={{ borderColor: s1.borderColor }}></div>
                                                    </div>
</>); })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="2_283"
                            className="stroke-wrapper-2_283 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="Pixso-frame-2_283 pixso-relative-no-shrink pixso-flex">
                                <div className="frame-content-2_283 pixso-relative-flex">
                                    <p
                                        id="2_284"
                                        className="Pixso-paragraph-2_284 pixso-relative-auto-size pixso-flex-shrink-0"
                                    >
                                        {(() => {
                                            const lx = L(selectedLine);
                                            if (!lx) return '择爻 · —';
                                            return `${lx.liushen} · ${lx.liuqin}${lx.ganzhi}${lx.isYongshen ? '（用神）' : ''}`;
                                          })()}
                                    </p>
                                    <p
                                        id="2_285"
                                        className="Pixso-paragraph-2_285 pixso-relative-no-shrink pixso-h-auto"
                                    >
                                        {(() => {
                                            const lx = L(selectedLine);
                                            if (!lx) return r?.tooltip?.content ?? '';
                                            const rel = r?.lineRelations?.[selectedLine];
                                            const tags = (lx.tags || []).filter((t: string) => t !== '用神').join('、');
                                            const lines: string[] = [];
                                            if (rel) {
                                              lines.push(rel.yuejian);
                                              lines.push(rel.richen);
                                            }
                                            if (lx.isMoving) lines.push('此爻发动，为事之转机所在。');
                                            else lines.push('此爻安静，事尚未起。');
                                            if (tags) lines.push(`标签：${tags}`);
                                            return lines.join('。') + '。';
                                          })()}
                                    </p>
                                </div>
                            </div>
                            <div className="stroke-2_283"></div>
                        </div>
                        <div
                            id="2_286"
                            className="Pixso-frame-2_286 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_286 pixso-relative-flex">
                                <div
                                    id="2_287"
                                    className="stroke-wrapper-2_287 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="Pixso-frame-2_287 pixso-relative-no-shrink pixso-flex">
                                        <div className="frame-content-2_287 pixso-relative-flex">
                                            <div
                                                id="2_288"
                                                className="Pixso-frame-2_288 pixso-relative-no-shrink pixso-flex-auto-height"
                                            >
                                                <div className="frame-content-2_288 pixso-relative-flex">
                                                    <p
                                                        id="2_289"
                                                        className="Pixso-paragraph-2_289 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"一"}
                                                    </p>
                                                    <p
                                                        id="2_290"
                                                        className="Pixso-paragraph-2_290 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"现状核验"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                id="2_291"
                                                className="Pixso-paragraph-2_291 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {
                                                    r?.report?.verification ?? ''
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="stroke-2_287"></div>
                                </div>
                                <div
                                    id="2_292"
                                    className="stroke-wrapper-2_292 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="Pixso-frame-2_292 pixso-relative-no-shrink pixso-flex">
                                        <div className="frame-content-2_292 pixso-relative-flex">
                                            <div
                                                id="2_293"
                                                className="Pixso-frame-2_293 pixso-relative-no-shrink pixso-flex-auto-height"
                                            >
                                                <div className="frame-content-2_293 pixso-relative-flex">
                                                    <p
                                                        id="2_294"
                                                        className="Pixso-paragraph-2_294 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"二"}
                                                    </p>
                                                    <p
                                                        id="2_295"
                                                        className="Pixso-paragraph-2_295 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"核心症结"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                id="2_296"
                                                className="Pixso-paragraph-2_296 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {
                                                    r?.report?.crux ?? ''
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="stroke-2_292"></div>
                                </div>
                                <div
                                    id="2_297"
                                    className="stroke-wrapper-2_297 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="Pixso-frame-2_297 pixso-relative-no-shrink pixso-flex">
                                        <div className="frame-content-2_297 pixso-relative-flex">
                                            <div
                                                id="2_298"
                                                className="Pixso-frame-2_298 pixso-relative-no-shrink pixso-flex-auto-height"
                                            >
                                                <div className="frame-content-2_298 pixso-relative-flex">
                                                    <p
                                                        id="2_299"
                                                        className="Pixso-paragraph-2_299 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"三"}
                                                    </p>
                                                    <p
                                                        id="2_300"
                                                        className="Pixso-paragraph-2_300 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"应期时间"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                id="2_301"
                                                className="Pixso-paragraph-2_301 pixso-relative-no-shrink pixso-h-auto"
                                            >
                                                {
                                                    r?.report?.timing ?? ''
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="stroke-2_297"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="2_302"
                    className="stroke-wrapper-2_302 pixso-relative-no-shrink pixso-flex"
                >
                    <div className="Pixso-frame-2_302 pixso-relative-no-shrink pixso-flex"></div>
                    <div className="stroke-2_302"></div>
                    <div className="Pixso-frame-2_302-content-layer">
                        <div className="frame-content-2_302 pixso-relative-flex">
                            <div
                                id="2_303"
                                className="Pixso-frame-2_303 pixso-relative-no-shrink pixso-flex"
                                onClick={() => { sessionStorage.removeItem("sq_casting_state"); navigate("/"); }}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="frame-content-2_303 pixso-relative-flex">
                                    <p
                                        id="2_304"
                                        className="Pixso-paragraph-2_304 pixso-relative-auto-size pixso-flex-shrink-0"
                                    >
                                        {"返回首页 · 重新策卦"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Frame2178;