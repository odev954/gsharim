import { paletteColors } from "styles/colors/defaultThemeColors";
import { shadows } from "styles/shadows/shadows";

export const buttonText = {
	fontWeight: "600",
	fontSize: "14px",
	fontFamily: "rubik",
};

export const outlinedButtonBase = {
	border: `1px solid`,
	boxShadow: shadows[3],
	"&:hover, &:active": {
		color: paletteColors.white.main,
		stroke: paletteColors.white.main,
	},
	"&:disabled": {
		color: paletteColors.monochromatic.dark,
		backgroundColor: paletteColors.monochromatic.light,
		stroke: paletteColors.monochromatic.dark,
	},
};

export const containedButtonBase = {
	color: paletteColors.white.main,
	stroke: paletteColors.white.main,
	boxShadow: shadows[3],
	"&:hover, &:active, &:disabled": {
		backgroundImage: "none",
	},
	"&:disabled": {
		color: paletteColors.monochromatic.dark,
		backgroundColor: paletteColors.monochromatic.light,
		stroke: paletteColors.monochromatic.dark,
	},
};

export const shinyEffect = {
	overflow: "hidden",
	"&::before": {
		content: '""',
		position: "absolute",
		height: "100px",
		width: "35px",
		backgroundImage: `linear-gradient(
		120deg,
		rgba(255,255,255, 0) 30%,
		rgba(255,255,255, .8),
		rgba(255,255,255, 0) 70%
	);`,
		top: "0",
		left: "-100px",
		animation: "shine 3s infinite linear",
	},
	"@keyframes shine": {
		"0%": { left: "-100px" },
		"20%": { left: "100%" },
		"100%": { left: "100%" },
	},
};

export const largeOutlinedButton = {
	fontWeight: "600",
	fontSize: "28px",
	height: "90px",
	width: "340px",
	borderRadius: "20px",
	margin: "0px 16px 8px 16px",
	color: paletteColors.black.main,
	borderColor: paletteColors.secondary.main,
	boxShadow: shadows[1],
	"&:disabled": {
		color: paletteColors.black.main,
	},
	"& .MuiTouchRipple-child": {
		color: paletteColors.secondary.main,
		opacity: "30%",
	},
};
