import { errorBoundaryWrapper } from "utils/errorBoundary";
import { PageFallback } from "components/errorComponents";
import WelcomePage from "./welcome";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(
	WelcomePage,
	{
		errorTextTitleKey: errorTextTitle,
		errorTextKey: errorText,
	},
	PageFallback
);
