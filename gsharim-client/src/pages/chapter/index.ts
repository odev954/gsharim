import { errorBoundaryWrapper } from "utils/errorBoundary";
import { PageFallback } from "components/errorComponents";
import Chapter from "./chapter";
import { errorText, errorTextTitle } from "./strings";

export default errorBoundaryWrapper(
	Chapter,
	{ errorTextKey: errorText, errorTextTitleKey: errorTextTitle },
	PageFallback
);
