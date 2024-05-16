import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { defaultItemWidth } from "./consts";

export const additionalButtonsStyles = (
	canProceed: boolean
): SystemStyleObject<Theme> => {
	let styles = {};
	if (canProceed) {
		styles = {
			":hover": {
				boxShadow: 1,
				color: "primary.main",
				background: "transparent",
			},
		};
	} else {
		styles = {
			opacity: 0.5,
		};
	}
	return styles;
};

const getCssPropertyValue = (
	itemRefElement: Element,
	cssProperty: string
): number => {
	const returnNumber =
		Number(
			window
				.getComputedStyle(itemRefElement)
				.getPropertyValue(cssProperty)
				.replace(/[^0-9.]/g, "")
		) || 0;
	return returnNumber;
};

export const calcItemFullWidth = (itemRefElement: Element): number => {
	const itemFullWidth =
		getCssPropertyValue(itemRefElement, "margin-right") +
		getCssPropertyValue(itemRefElement, "margin-left") +
		getCssPropertyValue(itemRefElement, "width");

	return itemFullWidth === 0 ? defaultItemWidth : itemFullWidth;
};
