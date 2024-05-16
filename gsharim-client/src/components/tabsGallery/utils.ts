import { SxProps, Theme } from "@mui/material";
import {
	buttonsStyle,
	scrollableItemsContainer,
	unScrollableItemsContainer,
} from "./styles";

export const additionalButtonsStyles = (
	canProceed: boolean
): SxProps<Theme> => {
	let additionalStyles: SxProps<Theme> = {};
	if (canProceed) {
		additionalStyles = buttonsStyle;
	}
	return additionalStyles;
};

export const itemsContainerStyles = (isScrollable: boolean): SxProps<Theme> => {
	if (isScrollable) {
		return scrollableItemsContainer;
	}
	return unScrollableItemsContainer;
};
