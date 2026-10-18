import { useNavigate } from "react-router";
import { useCastingState } from "@/lib/store";
import "@/styles/Frame2178.css";
const Frame2178 = () => {
    const navigate = useNavigate();
    const [state] = useCastingState();
    const r = state.najiaResult;
    const L = (i: number) => r?.lines?.[i - 1];
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
                        ></div>
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
                                                {r ? `本月定性 · ${r.benGuaName}（${r.gong}宫）` : "本月定性"}
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
                                                <div className="frame-content-2_228 pixso-relative-flex">
                                                    <div
                                                        id="2_229"
                                                        className="Pixso-frame-2_229 pixso-relative-no-shrink"
                                                    ></div>
                                                    <div
                                                        id="2_230"
                                                        className="Pixso-frame-2_230 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
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
                                                    <div
                                                        id="2_234"
                                                        className="stroke-wrapper-2_234 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_234 pixso-relative-no-shrink pixso-flex">
                                                            <p
                                                                id="2_235"
                                                                className="Pixso-paragraph-2_235 pixso-relative-auto-size pixso-flex-shrink-0"
                                                            >
                                                                {(L(6)?.tags || [])[0] ?? ''}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_234"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_236"
                                    className="stroke-wrapper-2_236 pixso-relative-no-shrink pixso-flex"
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
                                                <div className="frame-content-2_238 pixso-relative-flex">
                                                    <div
                                                        id="2_239"
                                                        className="Pixso-frame-2_239 pixso-relative-no-shrink"
                                                    ></div>
                                                    <div
                                                        id="2_240"
                                                        className="Pixso-frame-2_240 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
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
                                                    <div
                                                        id="2_244"
                                                        className="stroke-wrapper-2_244 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_244 pixso-relative-no-shrink pixso-flex">
                                                            <p
                                                                id="2_245"
                                                                className="Pixso-paragraph-2_245 pixso-relative-auto-size pixso-flex-shrink-0"
                                                            >
                                                                {stampParts[1] ?? ""}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_244"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_246"
                                    className="stroke-wrapper-2_246 pixso-relative-no-shrink pixso-flex"
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
                                                <div className="frame-content-2_248 pixso-relative-flex">
                                                    <div
                                                        id="2_249"
                                                        className="Pixso-frame-2_249 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
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
                                                    <div
                                                        id="2_253"
                                                        className="stroke-wrapper-2_253 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_253 pixso-relative-no-shrink pixso-flex">
                                                            <p
                                                                id="2_254"
                                                                className="Pixso-paragraph-2_254 pixso-relative-auto-size pixso-flex-shrink-0"
                                                            >
                                                                {(L(4)?.tags || [])[0] ?? ''}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_253"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_255"
                                    className="stroke-wrapper-2_255 pixso-relative-no-shrink pixso-flex"
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
                                                <div className="frame-content-2_257 pixso-relative-flex">
                                                    <div
                                                        id="2_258"
                                                        className="Pixso-frame-2_258 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
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
                                                    <div
                                                        id="2_262"
                                                        className="stroke-wrapper-2_262 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_262 pixso-relative-no-shrink pixso-flex">
                                                            <p
                                                                id="2_263"
                                                                className="Pixso-paragraph-2_263 pixso-relative-auto-size pixso-flex-shrink-0"
                                                            >
                                                                {(L(3)?.tags || [])[0] ?? ''}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_262"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_264"
                                    className="stroke-wrapper-2_264 pixso-relative-no-shrink pixso-flex"
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
                                                <div className="frame-content-2_266 pixso-relative-flex">
                                                    <div
                                                        id="2_267"
                                                        className="Pixso-frame-2_267 pixso-relative-no-shrink"
                                                    ></div>
                                                    <div
                                                        id="2_268"
                                                        className="Pixso-frame-2_268 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
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
                                                    <div
                                                        id="2_272"
                                                        className="stroke-wrapper-2_272 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_272 pixso-relative-no-shrink pixso-flex">
                                                            <p
                                                                id="2_273"
                                                                className="Pixso-paragraph-2_273 pixso-relative-auto-size pixso-flex-shrink-0"
                                                            >
                                                                {(L(2)?.tags || [])[0] ?? ''}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_272"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_274"
                                    className="stroke-wrapper-2_274 pixso-relative-no-shrink pixso-flex"
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
                                                <div className="frame-content-2_276 pixso-relative-flex">
                                                    <div
                                                        id="2_277"
                                                        className="Pixso-frame-2_277 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
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
                                                    <div
                                                        id="2_281"
                                                        className="stroke-wrapper-2_281 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                    >
                                                        <div className="Pixso-frame-2_281 pixso-relative-no-shrink pixso-flex">
                                                            <p
                                                                id="2_282"
                                                                className="Pixso-paragraph-2_282 pixso-relative-auto-size pixso-flex-shrink-0"
                                                            >
                                                                {(L(1)?.tags || [])[0] ?? ''}
                                                            </p>
                                                        </div>
                                                        <div className="stroke-2_281"></div>
                                                    </div>
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
                                        {r ? `用神 · ${r.yongshenLiuqin}${r.lines?.[r.yongshenIndex-1]?.ganzhi || ''}` : '用神 · —'}
                                    </p>
                                    <p
                                        id="2_285"
                                        className="Pixso-paragraph-2_285 pixso-relative-no-shrink pixso-h-auto"
                                    >
                                        {
                                            r?.tooltip?.content ?? ''
                                        }
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
                                    className="Pixso-frame-2_297 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
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
                                                <p
                                                    id="2_301"
                                                    className="Pixso-paragraph-2_301 pixso-relative-auto-size pixso-flex-shrink-0"
                                                >
                                                    {r?.report?.timing ?? ''}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
                                className="stroke-wrapper-2_303 pixso-relative-no-shrink pixso-flex"
                            >
                                <div className="Pixso-frame-2_303 pixso-relative-no-shrink pixso-flex"></div>
                                <div className="stroke-2_303"></div>
                                <div className="Pixso-frame-2_303-content-layer">
                                    <div className="frame-content-2_303 pixso-relative-flex" onClick={() => { sessionStorage.removeItem("sq_casting_state"); navigate("/"); }} style={{ cursor: "pointer" }}>
                                        <p
                                            id="2_304"
                                            className="Pixso-paragraph-2_304 pixso-relative-auto-size pixso-flex-shrink-0"
                                        >
                                            {"再占一次"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="2_305"
                                className="Pixso-frame-2_305 pixso-relative-flex"
                            >
                                <div className="frame-content-2_305 pixso-relative-flex">
                                    <div
                                        id="2_306"
                                        className="Pixso-vector-2_306 pixso-relative-no-shrink"
                                    ></div>
                                    <p
                                        id="2_308"
                                        className="Pixso-paragraph-2_308 pixso-relative-auto-size pixso-flex-shrink-0"
                                    >
                                        {"存卦入录"}
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
