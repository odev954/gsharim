import { SxProps, Theme } from "@mui/material";
import { backgroundSvg } from "utils/images";
import { ReactComponent as HeaderBackground } from "assets/header/headerBackground.svg";
import { SystemStyleObject } from "@mui/system";
import { isNil } from "lodash-es";
import * as styles from "./styles";
import { BackgroundTypes, ScrollDirection } from "./types";

const showScrollDirectionStyles = (
	scrollDirection: ScrollDirection | undefined,
	backgroundWaveImage: string
): SystemStyleObject<Theme> => {
	return !isNil(scrollDirection) && scrollDirection === "Down"
		? {
				...styles.headerContainerDown,
				backgroundImage: backgroundWaveImage,
				...styles.headerDownAnimation,
		  }
		: styles.headerUpAnimation;
};

const baseHeaderContainerStyle = (
	backgroundType: BackgroundTypes,
	scrollDirection: ScrollDirection | undefined,
	backgroundWaveImage: string
): SystemStyleObject<Theme> => {
	return {
		...showScrollDirectionStyles(scrollDirection, backgroundWaveImage),
		...(backgroundType === "solid" && styles.headerSolidContainerDown),
		...(backgroundType === "wave" && {
			...styles.headerContainerDown,
			backgroundImage: backgroundWaveImage,
		}),
	};
};

export const headerContainerStyle = (
	backgroundType: BackgroundTypes,
	scrollDirection: ScrollDirection | undefined,
	backgroundWaveImage: string
): SxProps<Theme> => {
	return [
		styles.headerContainer,
		baseHeaderContainerStyle(
			backgroundType,
			scrollDirection,
			backgroundWaveImage
		),
	];
};

export const mobileHeaderContainerStyle = (
	backgroundType: BackgroundTypes,
	scrollDirection: ScrollDirection | undefined,
	backgroundWaveImage: string
): SxProps<Theme> => {
	return [
		styles.mobileHeaderContainer,
		baseHeaderContainerStyle(
			backgroundType,
			scrollDirection,
			backgroundWaveImage
		),
	];
};

export const headerStyle = (
	scrollDirection: ScrollDirection | undefined
): SxProps<Theme> => {
	return [
		styles.header,
		!isNil(scrollDirection) && scrollDirection === "Down"
			? styles.headerDownAnimation
			: styles.headerUpAnimation,
	];
};

export const generateHeaderBackground = (fill: string): string => {
	return backgroundSvg(<HeaderBackground fill={fill} />);
};
