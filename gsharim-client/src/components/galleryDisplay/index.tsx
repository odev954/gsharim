import { errorBoundaryWrapper } from "utils/errorBoundary";
import { GalleryContainer } from "./galleryContainer";
import { errorTextTitle, errorText } from "./strings";

export default errorBoundaryWrapper(GalleryContainer, {
	errorTextTitleKey: errorTextTitle,
	errorTextKey: errorText,
});
