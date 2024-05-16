import { SxProps, Theme } from "@mui/system";
import {
	envStatusTextStyle,
	envStatusTextStyleDown,
	envStatusTextStyleUp,
} from "./styles";
import { ScrollDirection } from "../types";

const env = import.meta.env.VITE_ENV;

export const getEnvStatusText = (): string => {
	return `components.header.envStatus.${env}.envText`;
};

export const generateEnvStatusTextStyle = (
	scrollDirection: ScrollDirection | undefined
): SxProps<Theme> => {
	return [
		envStatusTextStyle,
		scrollDirection === undefined || scrollDirection === "Down"
			? envStatusTextStyleDown
			: envStatusTextStyleUp,
	];
};

export const getEnvTooltipText = (): string => {
	return `components.header.envStatus.${env}.tooltipText`;
};
