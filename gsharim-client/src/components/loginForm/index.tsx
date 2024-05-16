import { errorBoundaryWrapper } from "utils/errorBoundary";
import { LoginFormContainer } from "./loginFormContainer";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(LoginFormContainer, {
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
});
