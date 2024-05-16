import { errorBoundaryWrapper } from "utils/errorBoundary";
import { PageFallback } from "components/errorComponents";
import CourseRoadmap from "./courseRoadmap";
import { errorText, errorTextTitle } from "./strings";

export default errorBoundaryWrapper(
	CourseRoadmap,
	{ errorTextKey: errorText, errorTextTitleKey: errorTextTitle },
	PageFallback
);
