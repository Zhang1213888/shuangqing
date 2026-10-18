import { useLocation } from "react-router";
import Frame217 from "../../views/Frame217";
import Frame290 from "../../views/Frame290";
import Frame2178 from "../../views/Frame2178";
import Frame2309 from "../../views/Frame2309";

/** 画板 id → 组件路由表（对应 Pixso 四页面） */
const ROUTES: Record<string, React.ComponentType> = {
  "/": Frame217,        // 01 首屏意图分流页
  "/casting": Frame290, // 02 沉浸式摇卦页
  "/najia": Frame2178,  // 03 问事·六爻结果页
  "/zhouyi": Frame2309, // 04 问道·周易结果页
};

const StaticWrapper = () => {
  const { pathname } = useLocation();
  const Page = ROUTES[pathname] || Frame217;
  return <Page />;
};

export default StaticWrapper;
