import { MuiBackgroundColors } from "types/style/MuiBackgroundColors";
import { MuiPaletteColor } from "types/style/MuiPaletteColor";
import { MuiTextColor } from "types/style/MuiTextColors";

const secondary: MuiPaletteColor = {
	"700": "#32084A",
	"600": "#550D7D",
	main: "#7813B0",
	"400": "#8537B0",
	"300": "#915AB0",
	"200": "#9E7DB0",
	light: "#8537B0",
	dark: "#550D7D",
};

const positive: MuiPaletteColor = {
	"700": "#072103",
	"600": "#0D3B06",
	main: "#27AE60",
	"400": "#49AE74",
	"300": "#6CAE88",
	"200": "#A3C7B2",
	light: "#49AE74",
	dark: "#0D3B06",
};

const negative: MuiPaletteColor = {
	"700": "#991143",
	"600": "#CC1759",
	main: "#FF1D6F",
	"400": "#FF4F8F",
	"300": "#FF82AF",
	"200": "#FFB5D0",
	light: "#FF4F8F",
	dark: "#CC1759",
};

const warning: MuiPaletteColor = {
	"700": "#997901",
	"600": "#CCA101",
	main: "#FEC901",
	"400": "#FED333",
	"300": "#FEDE66",
	"200": "#FEE998",
	dark: "#CCA101",
};

const primary: MuiPaletteColor = {
	"700": "#1E6D96",
	"600": "#2892C9",
	dark: "#2892C9",
	main: "#33B7FC",
	"400": "#65C8FC",
	"300": "#97D9FC",
	"200": "#CAEBFC",
};

const grey: MuiPaletteColor = {
	"700": "#303237",
	"600": "#212329",
	main: "#7E8494",
	"400": "#BDC0CE",
	"300": "#E5E7EF",
	"200": "#F8F9FB",
	dark: "#212329",
};

const goldGradient: MuiPaletteColor = {
	main: "linear-gradient(265.22deg, #FEC901 0%, #FBCA13 100%)",
	600: "linear-gradient(265.22deg, #FBCA12 0%, #FED333 100%)",
	dark: "linear-gradient(265.22deg, #FACD25 0%, #E7B600 100%)",
};

const monochromatic: MuiPaletteColor = {
	"700": "#A1AEC9",
	"600": "#C1CCE3",
	main: "#DEE8FD",
	"400": "#E6EEFD",
	"300": "#EEF3FD",
	"200": "#F5F8FD",
	dark: "#C1CCE3",
	light: "#E6EEFD",
};

const white: MuiPaletteColor = {
	main: "#FFFFFF",
	dark: "#F5F8FD",
};

const black: MuiPaletteColor = {
	main: "#2A374A",
	dark: "#2A374A",
};

const yellow: MuiPaletteColor = {
	main: "#F2C94C",
	dark: "#CCA101",
};

const blue: MuiPaletteColor = {
	main: "#2F80ED",
	dark: "#3272C5",
};

const azure: MuiPaletteColor = {
	main: "#33D8FC",
	dark: "#2EADE3",
	light: "#33B7FC",
};

const azureGradient: MuiPaletteColor = {
	"600": "linear-gradient(265.22deg, #5CDFFD 0%, #5CC6FD 100%)",
	dark: "linear-gradient(265.22deg, #5CDFFD 0%, #5CC6FD 100%)",
	main: "linear-gradient(265.22deg, #33D8FC 0%, #33B7FC 100%)",
	"400": "linear-gradient(265.22deg, #2EC2E3 0%, #2EA6E3 100%)",
};

const secondaryGradient: MuiPaletteColor = {
	main: "linear-gradient(270deg, #AC1BDF 0%, #8713B0 106.35%)",
	dark: "linear-gradient(270deg, #AC1BDF 0%, #550D7D 106.35%)",
};

export const paletteColors = {
	positive,
	primary,
	secondary,
	warning,
	grey,
	goldGradient,
	monochromatic,
	negative,
	black,
	white,
	azure,
	blue,
	azureGradient,
	secondaryGradient,
	yellow,
};

export const backgroundColors: MuiBackgroundColors = {
	default: "#FBF7FF",
	paper: white.main,
	darkBackground: "#DEE8FD",
};

export const fontColor: MuiTextColor = {
	primary: "#2F114A",
	secondary: "#2F114A",
	white: white.main,
	light: white.main,
	lightBlue: "#33B7FC",
	disable: "#E6EEFD",
};
