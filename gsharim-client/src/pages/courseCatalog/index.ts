import { errorBoundaryWrapper } from "utils/errorBoundary";
import { PageFallback } from "components/errorComponents";
import { CourseCatalogPage as courseCatalog } from "./courseCatalogPage";
import { errorText, errorTextTitle } from "./strings";

export default errorBoundaryWrapper(
	courseCatalog,
	{
		errorTextKey: errorText,
		errorTextTitleKey: errorTextTitle,
	},
	PageFallback
);
