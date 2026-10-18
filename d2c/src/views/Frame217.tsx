import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { resetState } from "@/lib/store";
import "@/styles/Frame217.css";

const Frame217 = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");

    const card64Ref = useRef<HTMLDivElement>(null);
    const card79Ref = useRef<HTMLDivElement>(null);

    const handleCardTilt = (ref: React.RefObject<HTMLDivElement | null>) => (e: React.MouseEvent) => {
        const card = ref.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = (-y / (rect.height / 2)) * 6;
        const ry = (x / (rect.width / 2)) * 6;
        card.style.transition = 'none';
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleCardLeave = (ref: React.RefObject<HTMLDivElement | null>) => () => {
        const card = ref.current;
        if (!card) return;
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    const go = useCallback((mode: "NAJIA" | "ZHOUYI") => {
        const finalQuestion = question.trim() || undefined;
        resetState(mode, finalQuestion);
        navigate("/casting");
    }, [question, navigate]);

    const hintText = question.trim()
        ? "所惑已入笺 · 请择下方问事或问道"
        : "默念所惑 · 落字更灵";

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

                        <div
                            id="2_50"
                            className="stroke-wrapper-2_50 pixso-relative-no-shrink pixso-flex"
                        >
                            <div className="Pixso-frame-2_50 pixso-relative-no-shrink pixso-flex"></div>
                            <div className="stroke-2_50"></div>
                            <div className="Pixso-frame-2_50-content-layer">
                                <div className="frame-content-2_50 pixso-relative-flex">
                                    <textarea
                                        className="question-textarea"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="所惑何解 · 所求何事"
                                        rows={3}
                                        maxLength={200}
                                    />
                                    {question.trim() && (
                                        <button
                                            className="clear-btn"
                                            onClick={() => setQuestion("")}
                                            aria-label="清除"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p
                            id="2_63"
                            className="Pixso-paragraph-2_63 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {hintText}
                        </p>

                        <div
                            id="2_64"
                            ref={card64Ref}
                            onClick={() => go("NAJIA")}
                            onMouseMove={handleCardTilt(card64Ref)}
                            onMouseLeave={handleCardLeave(card64Ref)}
                            style={{ cursor: "pointer" }}
                            className="stroke-wrapper-2_64 pixso-relative-no-shrink"
                        >
                            <div className="Pixso-frame-2_64 pixso-relative-no-shrink">
                                <div id="2_65" className="stroke-wrapper-2_65" style={{ transform: "translateZ(15px)" }}>
                                    <div className="Pixso-frame-2_65 pixso-position-relative"></div>
                                    <div className="stroke-2_65"></div>
                                </div>
                                <div id="2_66" className="stroke-wrapper-2_66" style={{ transform: "translateZ(15px)" }}>
                                    <div className="Pixso-frame-2_66 pixso-position-relative"></div>
                                    <div className="stroke-2_66"></div>
                                </div>
                                <div id="2_67" className="stroke-wrapper-2_67" style={{ transform: "translateZ(15px)" }}>
                                    <div className="Pixso-frame-2_67 pixso-position-relative"></div>
                                    <div className="stroke-2_67"></div>
                                </div>
                                <div id="2_68" className="Pixso-frame-2_68" style={{ transform: "translateZ(10px)" }}></div>
                                <div id="2_69" className="Pixso-frame-2_69" style={{ transform: "translateZ(10px)" }}></div>
                                <div id="2_70" className="stroke-wrapper-2_70 pixso-flex" style={{ transform: "translateZ(20px)" }}>
                                    <div className="Pixso-frame-2_70 pixso-relative-flex"></div>
                                    <div className="stroke-2_70"></div>
                                    <div className="Pixso-frame-2_70-content-layer">
                                        <div className="frame-content-2_70 pixso-relative-flex">
                                            <p id="2_71" className="Pixso-paragraph-2_71 pixso-relative-auto-size pixso-flex-shrink-0">{"壹"}</p>
                                        </div>
                                    </div>
                                </div>
                                <p id="2_72" className="Pixso-paragraph-2_72 pixso-auto-size" style={{ transform: "translateZ(40px)" }}>{"问事 · 六爻"}</p>
                                <p id="2_73" className="Pixso-paragraph-2_73 pixso-auto-size" style={{ transform: "translateZ(30px)" }}>{"断成败 · 推应期"}</p>
                                <p id="2_74" className="Pixso-paragraph-2_74 pixso-h-auto" style={{ transform: "translateZ(25px)" }}>{"以六爻起卦，精密排盘，直指结果与应期。"}</p>
                                <div id="2_75" className="Pixso-vector-2_75" style={{ transform: "translateZ(15px)" }}></div>
                            </div>
                            <div className="stroke-2_64"></div>
                        </div>

                        <div
                            id="2_79"
                            ref={card79Ref}
                            onClick={() => go("ZHOUYI")}
                            onMouseMove={handleCardTilt(card79Ref)}
                            onMouseLeave={handleCardLeave(card79Ref)}
                            style={{ cursor: "pointer" }}
                            className="stroke-wrapper-2_79 pixso-relative-no-shrink"
                        >
                            <div className="Pixso-frame-2_79 pixso-relative-no-shrink">
                                <div className="taiji-symbol" style={{ transform: "translateZ(15px)" }}></div>
                                <div id="2_80" className="Pixso-frame-2_80" style={{ transform: "translateZ(10px)" }}></div>
                                <div id="2_81" className="stroke-wrapper-2_81 pixso-flex" style={{ transform: "translateZ(20px)" }}>
                                    <div className="Pixso-frame-2_81 pixso-relative-flex"></div>
                                    <div className="stroke-2_81"></div>
                                    <div className="Pixso-frame-2_81-content-layer">
                                        <div className="frame-content-2_81 pixso-relative-flex">
                                            <p id="2_82" className="Pixso-paragraph-2_82 pixso-relative-auto-size pixso-flex-shrink-0">{"贰"}</p>
                                        </div>
                                    </div>
                                </div>
                                <p id="2_83" className="Pixso-paragraph-2_83 pixso-auto-size" style={{ transform: "translateZ(40px)" }}>{"问道 · 周易"}</p>
                                <p id="2_84" className="Pixso-paragraph-2_84 pixso-auto-size" style={{ transform: "translateZ(30px)" }}>{"调心态 · 观周期"}</p>
                                <p id="2_85" className="Pixso-paragraph-2_85 pixso-h-auto" style={{ transform: "translateZ(25px)" }}>{"以周易问道，观象明理，缓行其势。"}</p>
                                <div id="2_86" className="Pixso-vector-2_86" style={{ transform: "translateZ(15px)" }}></div>
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