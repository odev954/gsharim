import { errorBoundaryWrapper } from "utils/errorBoundary";
import Statistics from "./statistics";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(Statistics, {
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
});
