import { errorBoundaryWrapper } from "utils/errorBoundary";
import CourseListItemContainer from "./courseListItemContainer";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(CourseListItemContainer, {
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
});
