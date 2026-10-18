import { useNavigate } from "react-router";
import { useCastingState } from "@/lib/store";
import "@/styles/Frame2309.css";
const Frame2309 = () => {
    const navigate = useNavigate();
    const [state] = useCastingState();
    const r: any = state.zhouyiResult;
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
                        ></div>
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
                                                <div
                                                    id="2_350"
                                                    className="Pixso-frame-2_350 pixso-relative-no-shrink"
                                                ></div>
                                                <div
                                                    id="2_351"
                                                    className="Pixso-frame-2_351 pixso-relative-no-shrink"
                                                ></div>
                                                <div
                                                    id="2_352"
                                                    className="Pixso-frame-2_352 pixso-relative-no-shrink"
                                                ></div>
                                                <div
                                                    id="2_353"
                                                    className="Pixso-frame-2_353 pixso-relative-no-shrink"
                                                ></div>
                                                <div
                                                    id="2_354"
                                                    className="Pixso-frame-2_354 pixso-relative-no-shrink"
                                                ></div>
                                                <div
                                                    id="2_355"
                                                    className="Pixso-frame-2_355 pixso-relative-no-shrink"
                                                ></div>
                                            </div>
                                        </div>
                                        <div
                                            id="2_356"
                                            className="Pixso-frame-2_356 pixso-relative-flex pixso-h-auto"
                                        >
                                            <div className="frame-content-2_356 pixso-relative-flex">
                                                <div
                                                    id="2_357"
                                                    className="Pixso-frame-2_357 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                >
                                                    <p
                                                        id="2_358"
                                                        className="Pixso-paragraph-2_358 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"自"}
                                                    </p>
                                                    <p
                                                        id="2_359"
                                                        className="Pixso-paragraph-2_359 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"強"}
                                                    </p>
                                                    <p
                                                        id="2_360"
                                                        className="Pixso-paragraph-2_360 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"不"}
                                                    </p>
                                                    <p
                                                        id="2_361"
                                                        className="Pixso-paragraph-2_361 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"息"}
                                                    </p>
                                                </div>
                                                <div
                                                    id="2_362"
                                                    className="Pixso-frame-2_362 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                >
                                                    <p
                                                        id="2_363"
                                                        className="Pixso-paragraph-2_363 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"君"}
                                                    </p>
                                                    <p
                                                        id="2_364"
                                                        className="Pixso-paragraph-2_364 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"子"}
                                                    </p>
                                                    <p
                                                        id="2_365"
                                                        className="Pixso-paragraph-2_365 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"以"}
                                                    </p>
                                                </div>
                                                <div
                                                    id="2_366"
                                                    className="Pixso-frame-2_366 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                >
                                                    <p
                                                        id="2_367"
                                                        className="Pixso-paragraph-2_367 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"天"}
                                                    </p>
                                                    <p
                                                        id="2_368"
                                                        className="Pixso-paragraph-2_368 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"行"}
                                                    </p>
                                                    <p
                                                        id="2_369"
                                                        className="Pixso-paragraph-2_369 pixso-relative-auto-size pixso-flex-shrink-0"
                                                    >
                                                        {"健"}
                                                    </p>
                                                </div>
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
                                            {"《周易 · 乾卦》象辞"}
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
                                                r?.report?.metaphor ?? ''
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
                                                r?.report?.strategy ?? ''
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
                                        {r?.quote ?? '—'}
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
                                    {
                                        "行运提示：此卦之象，宜守七日；立秋后动，事缓则圆。"
                                    }
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
                        >
                            <div className="frame-content-2_393 pixso-relative-flex">
                                <div
                                    id="2_394"
                                    className="Pixso-vector-2_394 pixso-relative-no-shrink"
                                ></div>
                                <p
                                    id="2_399"
                                    className="Pixso-paragraph-2_399 pixso-relative-auto-size pixso-flex-shrink-0"
                                >
                                    {"生成今日签文海报"}
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
