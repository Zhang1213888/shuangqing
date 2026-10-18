import { useNavigate } from "react-router";
import { resetState } from "@/lib/store";
import "@/styles/Frame217.css";
const Frame217 = () => {
    const navigate = useNavigate();
    const go = (mode: "NAJIA" | "ZHOUYI") => { resetState(mode); navigate("/casting"); };
    return (
        <div className="scroll-container">
            <div
                id="2_17"
                className="Pixso-frame-2_17 pixso-relative-no-shrink pixso-flex"
            >
                                <div
                    id="2_38"
                    className="Pixso-frame-2_38 pixso-relative-no-shrink pixso-flex"
                >
                    <div
                        id="2_39"
                        className="Pixso-frame-2_39 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                    >
                        <div
                            id="2_40"
                            className="stroke-wrapper-2_40 pixso-relative-no-shrink pixso-flex"
                        >
                            <div className="Pixso-frame-2_40 pixso-relative-no-shrink pixso-flex"></div>
                            <div className="stroke-2_40"></div>
                            <div className="Pixso-frame-2_40-content-layer">
                                <div className="frame-content-2_40 pixso-relative-flex">
                                    <p
                                        id="2_41"
                                        className="Pixso-paragraph-2_41 pixso-relative-auto-size pixso-flex-shrink-0"
                                    >
                                        {"易"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p
                            id="2_42"
                            className="Pixso-paragraph-2_42 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {"双擎易学"}
                        </p>
                    </div>
                    <div
                        id="2_43"
                        className="Pixso-frame-2_43 pixso-relative-no-shrink"
                    >
                        <div id="2_44" className="stroke-wrapper-2_44">
                            <div className="Pixso-rectangle-2_44 pixso-position-relative"></div>
                            <div className="stroke-2_44"></div>
                        </div>
                        <div id="2_45" className="Pixso-vector-2_45"></div>
                        <div id="2_46" className="Pixso-vector-2_46"></div>
                    </div>
                </div>
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
                                    <div
                                        id="2_51"
                                        className="Pixso-frame-2_51 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                    >
                                        <div
                                            id="2_52"
                                            className="Pixso-frame-2_52 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                        >
                                            <p
                                                id="2_53"
                                                className="Pixso-paragraph-2_53 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"所"}
                                            </p>
                                            <p
                                                id="2_54"
                                                className="Pixso-paragraph-2_54 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"惑"}
                                            </p>
                                            <p
                                                id="2_55"
                                                className="Pixso-paragraph-2_55 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"何"}
                                            </p>
                                            <p
                                                id="2_56"
                                                className="Pixso-paragraph-2_56 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"解"}
                                            </p>
                                        </div>
                                        <div
                                            id="2_57"
                                            className="Pixso-frame-2_57 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                        >
                                            <p
                                                id="2_58"
                                                className="Pixso-paragraph-2_58 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"所"}
                                            </p>
                                            <p
                                                id="2_59"
                                                className="Pixso-paragraph-2_59 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"求"}
                                            </p>
                                            <p
                                                id="2_60"
                                                className="Pixso-paragraph-2_60 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"何"}
                                            </p>
                                            <p
                                                id="2_61"
                                                className="Pixso-paragraph-2_61 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"事"}
                                            </p>
                                            <div
                                                id="2_62"
                                                className="Pixso-frame-2_62 pixso-relative-no-shrink"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p
                            id="2_63"
                            className="Pixso-paragraph-2_63 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {"此刻所惑，皆可落笔"}
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
                                <div
                                    id="2_68"
                                    className="Pixso-frame-2_68"
                                ></div>
                                <div
                                    id="2_69"
                                    className="Pixso-frame-2_69"
                                ></div>
                                <div
                                    id="2_70"
                                    className="stroke-wrapper-2_70 pixso-flex"
                                >
                                    <div className="Pixso-frame-2_70 pixso-relative-flex"></div>
                                    <div className="stroke-2_70"></div>
                                    <div className="Pixso-frame-2_70-content-layer">
                                        <div className="frame-content-2_70 pixso-relative-flex">
                                            <p
                                                id="2_71"
                                                className="Pixso-paragraph-2_71 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"壹"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p
                                    id="2_72"
                                    className="Pixso-paragraph-2_72 pixso-auto-size"
                                >
                                    {"问事 · 六爻"}
                                </p>
                                <p
                                    id="2_73"
                                    className="Pixso-paragraph-2_73 pixso-auto-size"
                                >
                                    {"断成败 · 推应期"}
                                </p>
                                <p
                                    id="2_74"
                                    className="Pixso-paragraph-2_74 pixso-h-auto"
                                >
                                    {"以六爻起卦，精密排盘，直指结果与应期。"}
                                </p>
                                <div
                                    id="2_75"
                                    className="Pixso-vector-2_75"
                                ></div>
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
                                <div
                                    id="2_80"
                                    className="Pixso-frame-2_80"
                                ></div>
                                <div
                                    id="2_81"
                                    className="stroke-wrapper-2_81 pixso-flex"
                                >
                                    <div className="Pixso-frame-2_81 pixso-relative-flex"></div>
                                    <div className="stroke-2_81"></div>
                                    <div className="Pixso-frame-2_81-content-layer">
                                        <div className="frame-content-2_81 pixso-relative-flex">
                                            <p
                                                id="2_82"
                                                className="Pixso-paragraph-2_82 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"贰"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p
                                    id="2_83"
                                    className="Pixso-paragraph-2_83 pixso-auto-size"
                                >
                                    {"问道 · 周易"}
                                </p>
                                <p
                                    id="2_84"
                                    className="Pixso-paragraph-2_84 pixso-auto-size"
                                >
                                    {"调心态 · 观周期"}
                                </p>
                                <p
                                    id="2_85"
                                    className="Pixso-paragraph-2_85 pixso-h-auto"
                                >
                                    {"以周易问道，观象明理，缓行其势。"}
                                </p>
                                <div
                                    id="2_86"
                                    className="Pixso-vector-2_86"
                                ></div>
                            </div>
                            <div className="stroke-2_79"></div>
                        </div>
                        <p
                            id="2_89"
                            className="Pixso-paragraph-2_89 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {"六爻问事 · 周易问道 · 皆为照见自心"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Frame217;
