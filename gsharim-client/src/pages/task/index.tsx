import { errorBoundaryWrapper } from "utils/errorBoundary";
import { PageFallback } from "components/errorComponents";
import Task from "./task";
import { errorText, errorTextTitle } from "./strings";

export default errorBoundaryWrapper(
	Task,
	{ errorTextKey: errorText, errorTextTitleKey: errorTextTitle },
	PageFallback
);
