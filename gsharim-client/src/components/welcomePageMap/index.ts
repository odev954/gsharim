import { errorBoundaryWrapper } from "utils/errorBoundary";
import { WelcomePageMap } from "./welcomePageMap";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(WelcomePageMap, {
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
});
