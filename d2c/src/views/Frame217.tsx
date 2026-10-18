import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { resetState } from "@/lib/store";
import { useVoiceInput } from "@/lib/speech";
import "@/styles/Frame217.css";

const Frame217 = () => {
    const navigate = useNavigate();
    const [spokenText, setSpokenText] = useState("");
    const isListeningRef = useRef(false);
    const isTranscribingRef = useRef(false);

    const voice = useVoiceInput({
        onResult: (text: string, isFinal: boolean) => {
            setSpokenText(text);
            if (isFinal && text.trim()) {
            }
        },
        onError: (errMsg: string) => {
            console.warn("语音错误:", errMsg);
        },
    });

    useEffect(() => {
        isListeningRef.current = voice.isListening;
        isTranscribingRef.current = voice.isTranscribing;
    }, [voice.isListening, voice.isTranscribing]);

    const go = useCallback((mode: "NAJIA" | "ZHOUYI") => {
        if (voice.isListening) voice.stopListening();
        const finalQuestion = spokenText.trim() || undefined;
        resetState(mode, finalQuestion);
        navigate("/casting");
    }, [voice, spokenText, navigate]);

    const handlePaperClick = useCallback(() => {
        if (voice.isListening || voice.isTranscribing) {
            voice.stopListening();
        } else if (spokenText.trim()) {
            setSpokenText("");
        } else {
            voice.startListening();
        }
    }, [voice, spokenText]);

    const handleRetellClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSpokenText("");
    }, []);

    const mode: "idle" | "listening" | "transcribing" | "spoken" =
        voice.isListening ? "listening"
        : voice.isTranscribing ? "transcribing"
        : spokenText.trim() ? "spoken"
        : "idle";

    const hintText =
        mode === "listening" ? "正在聆听所惑，再点素笺落字..."
        : mode === "transcribing" ? "正在凝墨成字..."
        : mode === "spoken" ? "所惑已入笺 · 请择下方问事或问道"
        : "轻点素笺倾诉 · 或默念直接入局";

    return (
        <div className="scroll-container">
            <div
                id="2_17"
                className="Pixso-frame-2_17 pixso-relative-no-shrink pixso-flex"
            >
                <div
                    id="2_47"
                    className="Pixso-frame-2_47 pixso-relative-no-shrink pixso-flex-auto-height"
                >
                    <div className="frame-content-2_47 pixso-relative-flex">
                        <div
                            id="2_48"
                            className="Pixso-frame-2_48 pixso-relative-no-shrink"
                        ></div>
                        <p
                            id="2_49"
                            className="Pixso-paragraph-2_49 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {"静心 · 起问"}
                        </p>

                        {/* 素笺区域 —— 三态交互 */}
                        <div
                            id="2_50"
                            className={"stroke-wrapper-2_50 pixso-relative-no-shrink pixso-flex" + (mode === "listening" || mode === "transcribing" ? " is-listening" : "")}
                            onClick={handlePaperClick}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="Pixso-frame-2_50 pixso-relative-no-shrink pixso-flex"></div>
                            <div className="stroke-2_50"></div>
                            <div className="Pixso-frame-2_50-content-layer">
                                <div className="frame-content-2_50 pixso-relative-flex">
                                    {(mode === "idle") && (
                                        /* 默认静默态：竖排装饰文字 + 朱砂红线 */
                                        <div
                                            id="2_51"
                                            className="Pixso-frame-2_51 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                        >
                                            <div
                                                id="2_52"
                                                className="Pixso-frame-2_52 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                            >
                                                <p id="2_53" className="Pixso-paragraph-2_53 pixso-relative-auto-size pixso-flex-shrink-0">{"所"}</p>
                                                <p id="2_54" className="Pixso-paragraph-2_54 pixso-relative-auto-size pixso-flex-shrink-0">{"惑"}</p>
                                                <p id="2_55" className="Pixso-paragraph-2_55 pixso-relative-auto-size pixso-flex-shrink-0">{"何"}</p>
                                                <p id="2_56" className="Pixso-paragraph-2_56 pixso-relative-auto-size pixso-flex-shrink-0">{"解"}</p>
                                            </div>
                                            <div
                                                id="2_57"
                                                className="Pixso-frame-2_57 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                            >
                                                <p id="2_58" className="Pixso-paragraph-2_58 pixso-relative-auto-size pixso-flex-shrink-0">{"所"}</p>
                                                <p id="2_59" className="Pixso-paragraph-2_59 pixso-relative-auto-size pixso-flex-shrink-0">{"求"}</p>
                                                <p id="2_60" className="Pixso-paragraph-2_60 pixso-relative-auto-size pixso-flex-shrink-0">{"何"}</p>
                                                <p id="2_61" className="Pixso-paragraph-2_61 pixso-relative-auto-size pixso-flex-shrink-0">{"事"}</p>
                                                <div id="2_62" className="Pixso-frame-2_62 pixso-relative-no-shrink"></div>
                                            </div>
                                        </div>
                                    )}

                                    {(mode === "listening" || mode === "transcribing") && (
                                        /* 聆听态：声波律动 + 实时文字 */
                                        <div className="voice-panel">
                                            <div className="ink-waves">
                                                <span className="ink-wave-bar" style={{ animationDelay: "0s" }} />
                                                <span className="ink-wave-bar" style={{ animationDelay: "0.15s" }} />
                                                <span className="ink-wave-bar" style={{ animationDelay: "0.3s" }} />
                                                <span className="ink-wave-bar" style={{ animationDelay: "0.45s" }} />
                                                <span className="ink-wave-bar" style={{ animationDelay: "0.6s" }} />
                                            </div>
                                            {spokenText && (
                                                <p className="voice-live-text">{spokenText}</p>
                                            )}
                                        </div>
                                    )}

                                    {mode === "spoken" && (
                                        /* 落字态：展示识别文字 + 重述按钮 */
                                        <div className="spoken-panel">
                                            <p className="spoken-text">{spokenText}</p>
                                            <button className="retell-btn" onClick={handleRetellClick}>重述</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p
                            id="2_63"
                            className={"Pixso-paragraph-2_63 pixso-relative-auto-size pixso-flex-shrink-0" + (mode === "listening" || mode === "transcribing" ? " hint-active" : "")}
                        >
                            {hintText}
                        </p>

                        <div
                            id="2_64"
                            onClick={() => go("NAJIA")}
                            style={{ cursor: "pointer" }}
                            className="stroke-wrapper-2_64 pixso-relative-no-shrink"
                        >
                            <div className="Pixso-frame-2_64 pixso-relative-no-shrink">
                                <div id="2_65" className="stroke-wrapper-2_65">
                                    <div className="Pixso-frame-2_65 pixso-position-relative"></div>
                                    <div className="stroke-2_65"></div>
                                </div>
                                <div id="2_66" className="stroke-wrapper-2_66">
                                    <div className="Pixso-frame-2_66 pixso-position-relative"></div>
                                    <div className="stroke-2_66"></div>
                                </div>
                                <div id="2_67" className="stroke-wrapper-2_67">
                                    <div className="Pixso-frame-2_67 pixso-position-relative"></div>
                                    <div className="stroke-2_67"></div>
                                </div>
                                <div id="2_68" className="Pixso-frame-2_68"></div>
                                <div id="2_69" className="Pixso-frame-2_69"></div>
                                <div id="2_70" className="stroke-wrapper-2_70 pixso-flex">
                                    <div className="Pixso-frame-2_70 pixso-relative-flex"></div>
                                    <div className="stroke-2_70"></div>
                                    <div className="Pixso-frame-2_70-content-layer">
                                        <div className="frame-content-2_70 pixso-relative-flex">
                                            <p id="2_71" className="Pixso-paragraph-2_71 pixso-relative-auto-size pixso-flex-shrink-0">{"壹"}</p>
                                        </div>
                                    </div>
                                </div>
                                <p id="2_72" className="Pixso-paragraph-2_72 pixso-auto-size">{"问事 · 六爻"}</p>
                                <p id="2_73" className="Pixso-paragraph-2_73 pixso-auto-size">{"断成败 · 推应期"}</p>
                                <p id="2_74" className="Pixso-paragraph-2_74 pixso-h-auto">{"以六爻起卦，精密排盘，直指结果与应期。"}</p>
                                <div id="2_75" className="Pixso-vector-2_75"></div>
                            </div>
                            <div className="stroke-2_64"></div>
                        </div>

                        <div
                            id="2_79"
                            onClick={() => go("ZHOUYI")}
                            style={{ cursor: "pointer" }}
                            className="stroke-wrapper-2_79 pixso-relative-no-shrink"
                        >
                            <div className="Pixso-frame-2_79 pixso-relative-no-shrink">
                                <div className="taiji-symbol"></div>
                                <div id="2_80" className="Pixso-frame-2_80"></div>
                                <div id="2_81" className="stroke-wrapper-2_81 pixso-flex">
                                    <div className="Pixso-frame-2_81 pixso-relative-flex"></div>
                                    <div className="stroke-2_81"></div>
                                    <div className="Pixso-frame-2_81-content-layer">
                                        <div className="frame-content-2_81 pixso-relative-flex">
                                            <p id="2_82" className="Pixso-paragraph-2_82 pixso-relative-auto-size pixso-flex-shrink-0">{"贰"}</p>
                                        </div>
                                    </div>
                                </div>
                                <p id="2_83" className="Pixso-paragraph-2_83 pixso-auto-size">{"问道 · 周易"}</p>
                                <p id="2_84" className="Pixso-paragraph-2_84 pixso-auto-size">{"调心态 · 观周期"}</p>
                                <p id="2_85" className="Pixso-paragraph-2_85 pixso-h-auto">{"以周易问道，观象明理，缓行其势。"}</p>
                                <div id="2_86" className="Pixso-vector-2_86"></div>
                            </div>
                            <div className="stroke-2_79"></div>
                        </div>

                        <p id="2_89" className="Pixso-paragraph-2_89 pixso-relative-auto-size pixso-flex-shrink-0">
                            {"六爻问事 · 周易问道 · 皆为照见自心"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Frame217;