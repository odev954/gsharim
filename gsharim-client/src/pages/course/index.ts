import { errorBoundaryWrapper } from "utils/errorBoundary";
import { PageFallback } from "components/errorComponents";
import Course from "./course";
import { errorText, errorTextTitle } from "./strings";

export default errorBoundaryWrapper(
	Course,
	{ errorTextKey: errorText, errorTextTitleKey: errorTextTitle },
	PageFallback
);
