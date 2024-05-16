import LazyLoader from "components/lazyLoader";
import CodeLoader from "components/codeLoader";
import Ide from "./ideContainer";
import { ApiDescription, IdeProps } from "./types";
import { addApiHints } from "./utils";

export default LazyLoader(Ide, CodeLoader);
export type { ApiDescription, IdeProps };
export { addApiHints };
