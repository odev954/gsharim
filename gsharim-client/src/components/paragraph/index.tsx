import { errorBoundaryWrapper } from "utils/errorBoundary";
import Paragraph from "./paragraph";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(Paragraph, {
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
});
