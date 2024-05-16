import { MuiBackgroundColors } from "types/style/MuiBackgroundColors";
import { MuiTextColor } from "types/style/MuiTextColors";

const globalColors = {
	black: "#161b22",
	primary: "#2F80ED",
	secondary: "#9950DF",
};

const backgroundColors: MuiBackgroundColors = {
	default: "#2E156F",
	paper: "#1F174D",
};

const info = "#2F114A99";
const coursesColors = {
	title: "#2F80ED",
	createdBy: "white 60%",
	courseInfo: "#2F114A",
};

const fontColor: MuiTextColor = {
	primary: "#00E2E8",
	secondary: "#FFFFFF",
	userName: "#000000",
	disable: "#E6EEFD",
};

export const purpleThemeColors = {
	globalColors,
	fontColor,
	backgroundColors,
	info,
	coursesColors,
};
