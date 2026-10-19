import { useNavigate } from "react-router";
import { useCastingState } from "@/lib/store";
import "@/styles/Frame2309.css";
const Frame2309 = () => {
    const navigate = useNavigate();
    const [state] = useCastingState();
    const r: any = state.zhouyiResult;
    const loading = state.interpretLoading;
    return (
        <div className="scroll-container">
            <div
                id="2_309"
                className="Pixso-frame-2_309 pixso-relative-no-shrink pixso-flex"
            >
                                <div
                    id="2_330"
                    className="Pixso-frame-2_330 pixso-relative-no-shrink pixso-flex"
                >
                    <div className="frame-content-2_330 pixso-relative-flex">
                        <div
                            id="2_331"
                            className="Pixso-vector-2_331 pixso-relative-no-shrink"
                            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--c-ink)" }}
                            onClick={() => navigate("/")}
                        >←</div>
                        <p
                            id="2_334"
                            className="Pixso-paragraph-2_334 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {"问道 · 周易"}
                        </p>
                        <div
                            id="2_335"
                            className="Pixso-vector-2_335 pixso-relative-no-shrink"
                        ></div>
                    </div>
                </div>
                <div
                    id="2_341"
                    className="Pixso-frame-2_341 pixso-relative-no-shrink pixso-flex-auto-height"
                >
                    <div className="frame-content-2_341 pixso-relative-flex">
                        <div
                            id="2_342"
                            className="Pixso-frame-2_342 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_342 pixso-relative-flex">
                                <div
                                    id="2_343"
                                    className="Pixso-frame-2_343 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="frame-content-2_343 pixso-relative-flex">
                                        <p
                                            id="2_344"
                                            className="Pixso-paragraph-2_344 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {r?.benGua ? `${r.benGua.name}` : '— · —'}
                                        </p>
                                        <div
                                            id="2_345"
                                            className="Pixso-frame-2_345 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                        >
                                            <div
                                                id="2_346"
                                                className="Pixso-frame-2_346 pixso-relative-no-shrink"
                                            ></div>
                                            <p
                                                id="2_347"
                                                className="Pixso-paragraph-2_347 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {r?.focusLine?.title ?? '— · —'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_348"
                                    className="Pixso-frame-2_348 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="frame-content-2_348 pixso-relative-flex">
                                        <div
                                            id="2_349"
                                            className="Pixso-frame-2_349 pixso-relative-no-shrink pixso-flex-auto-height"
                                        >
                                            <div className="frame-content-2_349 pixso-relative-flex">
                                                {(() => {
                                                  const bin = r?.benGua?.binary ?? '111111';
                                                  const moving = r?.movingIndexes ?? [];
                                                  return [5,4,3,2,1,0].map((idx, i) => {
                                                    const yang = bin[idx] === '1';
                                                    const isMov = moving.includes(idx + 1);
                                                    const c = isMov ? 'var(--c-cinnabar)' : 'var(--c-ink)';
                                                    return yang ? (
                                                      <div key={i} style={{ width: '100%', height: 4, background: c, borderRadius: 2, margin: '3px 0' }} />
                                                    ) : (
                                                      <div key={i} style={{ display: 'flex', gap: 6, width: '100%', justifyContent: 'center', margin: '3px 0' }}>
                                                        <div style={{ height: 4, background: c, borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                        <div style={{ height: 4, background: c, borderRadius: 2, flex: 1, maxWidth: '40%' }} />
                                                      </div>
                                                    );
                                                  });
                                                })()}
                                            </div>
                                        </div>
                                        <div
                                            id="2_356"
                                            className="Pixso-frame-2_356 pixso-relative-flex pixso-h-auto"
                                        >
                                            <div className="frame-content-2_356 pixso-relative-flex">
                                                <p style={{ writingMode: 'horizontal-tb', fontSize: 14, lineHeight: 1.8, letterSpacing: 2, textAlign: 'center', width: '100%' }}>
                                                  {r?.focusLine?.original ?? '自強不息'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_370"
                                    className="Pixso-frame-2_370 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="frame-content-2_370 pixso-relative-flex">
                                        <p
                                            id="2_371"
                                            className="Pixso-paragraph-2_371 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {r?.benGua ? `《周易·${r.benGua.name}》${r.focusLine?.title || '象辞'}` : '《周易·乾卦》象辞'}
                                        </p>
                                        <div
                                            id="2_372"
                                            className="stroke-wrapper-2_372 pixso-relative-no-shrink pixso-flex"
                                        >
                                            <div className="Pixso-frame-2_372 pixso-relative-no-shrink pixso-flex"></div>
                                            <div className="stroke-2_372"></div>
                                            <div className="Pixso-frame-2_372-content-layer">
                                                <div className="frame-content-2_372 pixso-relative-flex">
                                                    <p
                                                        id="2_373"
                                                        className="Pixso-paragraph-2_373 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {r?.benGua?.name?.slice(0, 1) ?? '—'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="2_374"
                            className="Pixso-frame-2_374 pixso-relative-no-shrink"
                        ></div>
                        <div
                            id="2_375"
                            className="Pixso-frame-2_375 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_375 pixso-relative-flex">
                                <p
                                    id="2_376"
                                    className="Pixso-paragraph-2_376 pixso-relative-auto-size pixso-flex-shrink-0"
                                >
                                    {r?.report?.greeting ?? '见字如面。'}
                                </p>
                                <div
                                    id="2_377"
                                    className="Pixso-frame-2_377 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="frame-content-2_377 pixso-relative-flex">
                                        <p
                                            id="2_378"
                                            className="Pixso-paragraph-2_378 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"象之隐喻"}
                                        </p>
                                        <p
                                            id="2_379"
                                            className="Pixso-paragraph-2_379 pixso-relative-no-shrink pixso-h-auto"
                                        >
                                            {
                          loading ? (
                            <div style={{ width: '100%' }}>
                              <div className="sq-loader-ring" style={{ marginBottom: 12 }}>卦象推演中</div>
                              <div className="sq-skeleton sq-skeleton-line" />
                              <div className="sq-skeleton sq-skeleton-line" />
                              <div className="sq-skeleton sq-skeleton-line" />
                            </div>
                          ) : (r?.report?.metaphor ?? '')
                        }
                                        </p>
                                    </div>
                                </div>
                                <div
                                    id="2_380"
                                    className="Pixso-frame-2_380 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="frame-content-2_380 pixso-relative-flex">
                                        <p
                                            id="2_381"
                                            className="Pixso-paragraph-2_381 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"破局之道"}
                                        </p>
                                        <p
                                            id="2_382"
                                            className="Pixso-paragraph-2_382 pixso-relative-no-shrink pixso-h-auto"
                                        >
                                            {
                          loading ? (
                            <div style={{ width: '100%' }}>
                              <div className="sq-loader-ring" style={{ marginBottom: 12 }}>解卦中</div>
                              <div className="sq-skeleton sq-skeleton-line" />
                              <div className="sq-skeleton sq-skeleton-line" />
                            </div>
                          ) : (r?.report?.strategy ?? '')
                        }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="2_383"
                            className="stroke-wrapper-2_383 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="Pixso-frame-2_383 pixso-relative-no-shrink pixso-flex">
                                <div className="frame-content-2_383 pixso-relative-flex">
                                    <p
                                        id="2_384"
                                        className="Pixso-paragraph-2_384 pixso-relative-auto-size pixso-flex-shrink-0"
                                    >
                                        {loading ? (
                            <div className="sq-loader-ring" style={{ justifyContent: 'center' }}>…</div>
                          ) : (r?.quote ?? '—')}
                                    </p>
                                </div>
                            </div>
                            <div className="stroke-2_383"></div>
                        </div>
                        <div
                            id="2_385"
                            className="Pixso-frame-2_385 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_385 pixso-relative-flex">
                                <p
                                    id="2_386"
                                    className="Pixso-paragraph-2_386 pixso-relative-auto-size pixso-flex-shrink-0"
                                >
                                    {"—— 双擎易学"}
                                </p>
                            </div>
                        </div>
                        <div
                            id="2_387"
                            className="Pixso-frame-2_387 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_387 pixso-relative-flex">
                                <div
                                    id="2_388"
                                    className="Pixso-vector-2_388 pixso-relative-no-shrink"
                                ></div>
                                <p
                                    id="2_391"
                                    className="Pixso-paragraph-2_391 pixso-relative-no-shrink pixso-h-auto"
                                >
                                    {r ? `行运提示：本卦逢「${r.route}」，${r.bianGua ? `由${r.benGua.name}化${r.bianGua.name}，顺时应势则圆。` : '六爻安静，守中道而行，静待天时。'}` : "行运提示：此卦之象，宜守中道，顺势而为。"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="2_392"
                    className="Pixso-frame-2_392 pixso-relative-no-shrink pixso-flex"
                >
                    <div className="frame-content-2_392 pixso-relative-flex">
                        <div
                            id="2_393"
                            className="Pixso-frame-2_393 pixso-relative-no-shrink pixso-flex"
                            onClick={() => { sessionStorage.removeItem("sq_casting_state"); navigate("/"); }}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="frame-content-2_393 pixso-relative-flex">
                                <p
                                    id="2_399"
                                    className="Pixso-paragraph-2_399 pixso-relative-auto-size pixso-flex-shrink-0"
                                >
                                    {"返回首页 · 重新策卦"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Frame2309;