import { errorBoundaryWrapper } from "utils/errorBoundary";
import { PageFallback } from "components/errorComponents";
import Lesson from "./lesson";
import { errorText, errorTextTitle } from "./strings";

export default errorBoundaryWrapper(
	Lesson,
	{ errorTextKey: errorText, errorTextTitleKey: errorTextTitle },
	PageFallback
);
