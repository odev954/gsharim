import { errorBoundaryWrapper } from "utils/errorBoundary";
import { TabsGalleryContainer } from "./tabsGalleryContainer";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(TabsGalleryContainer, {
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
});
