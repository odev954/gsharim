import { createTheme } from "@mui/material";
import {
	paletteColors,
	backgroundColors,
	fontColor,
} from "../colors/defaultThemeColors";
import { shadows } from "../shadows/shadows";
import {
	buttonText,
	containedButtonBase,
	outlinedButtonBase,
	shinyEffect,
	largeOutlinedButton,
} from "./buttons";

const defaultTheme = createTheme({
	direction: "rtl",
	zIndex: {
		container: 1,
		subContainer: 2,
		tooltip: 3,
		gamePart: 4,
		appBar: 5,
		stepper: 6,
		modal: 7,
	},
	palette: {
		mode: "light",
		grey: paletteColors.grey,
		background: backgroundColors,
		text: fontColor,
		primary: paletteColors.primary,
		secondary: paletteColors.secondary,
		error: paletteColors.negative,
		warning: paletteColors.warning,
		info: paletteColors.primary,
		success: paletteColors.positive,
		monochromatic: paletteColors.monochromatic,
		black: paletteColors.black,
		white: paletteColors.white,
		goldGradient: paletteColors.goldGradient,
		yellow: paletteColors.yellow,
		azureGradient: paletteColors.azureGradient,
		secondaryGradient: paletteColors.secondaryGradient,
		azure: paletteColors.azure,
		blue: paletteColors.blue,
	},
	shadows,
	typography: {
		fontFamily: "rubik-medium",
	},
	components: {
		MuiButton: {
			variants: [
				{
					props: {},
					style: {
						minHeight: "40px",
						borderRadius: "8px",
						overflowWrap: "break-word",
						textTransform: "none",
						minWidth: "unset",
					},
				},
				{
					props: {
						color: "primary",
					},
					style: {
						"& .MuiTouchRipple-child": {
							color: paletteColors.azure.main,
							opacity: "30%",
						},
					},
				},
				{
					props: {
						color: "secondary",
					},
					style: {
						"& .MuiTouchRipple-child": {
							color: paletteColors.secondary.main,
							opacity: "30%",
						},
					},
				},
				{
					props: {
						size: "large",
					},
					style: {
						width: "116px",
						height: "48px",
					},
				},
				{
					props: {
						size: "small",
					},
					style: {
						width: "80px",
						height: "40px",
					},
				},
				{
					props: { variant: "shiny", color: "secondary" },
					style: {
						...shinyEffect,
						backgroundImage: paletteColors.secondaryGradient.main,
					},
				},
				{
					props: { variant: "shiny", color: "primary" },
					style: {
						...shinyEffect,
						backgroundImage: paletteColors.azureGradient.main,
					},
				},
				{
					props: { variant: "shiny", color: "gold" },
					style: {
						...shinyEffect,
						backgroundImage: paletteColors.goldGradient.main,
					},
				},
				{
					props: {
						variant: "largeOutlined",
					},
					style: largeOutlinedButton,
				},
				{
					props: {
						variant: "outlined",
					},
					style: {
						padding: "7px 11px",
					},
				},
				{
					props: {
						variant: "contained",
					},
					style: {
						padding: "8px 12px",
					},
				},
			],
			styleOverrides: {
				contained: containedButtonBase,
				outlined: outlinedButtonBase,
				text: buttonText,
				outlinedPrimary: {
					stroke: paletteColors.azure.light,
					"&:hover": {
						backgroundColor: paletteColors.azure.light,
					},
					"&:active": {
						backgroundColor: paletteColors.azure.dark,
						borderColor: paletteColors.azure.dark,
					},
				},
				outlinedSecondary: {
					stroke: paletteColors.secondary.main,
					"&:hover": {
						backgroundColor: paletteColors.secondary.light,
						borderColor: paletteColors.secondary.light,
					},
					"&:active": {
						backgroundColor: paletteColors.secondary.dark,
						borderColor: paletteColors.secondary.dark,
					},
				},
				containedPrimary: {
					backgroundImage: paletteColors.azureGradient.main,
					"&:hover": {
						backgroundColor: paletteColors.azure.light,
					},
					"&:active": {
						backgroundColor: paletteColors.azure.dark,
					},
				},
				containedSecondary: {
					backgroundImage: paletteColors.secondaryGradient.main,
					"&:hover": {
						backgroundColor: paletteColors.secondary.light,
					},
					"&:active": {
						backgroundColor: paletteColors.secondary.dark,
					},
				},
				textSecondary: {
					"&:hover": {
						color: paletteColors.secondary.light,
						backgroundColor: "transparent",
					},
					"&:active": {
						color: paletteColors.secondary.dark,
					},
				},
			},
		},

		MuiCssBaseline: {
			styleOverrides: `
            @font-face {
                font-family:'rubik-medium';
				font-display: auto;
				src:local('rubik-medium'),
       				url('/fonts/Rubik-Medium.woff2') format('woff2'), /* will be preloaded */
       				url('/fonts/Rubik-Medium.woff') format('woff'),
       				url('/fonts/Rubik-Medium.ttf') format('truetype'),
       				url('/fonts/Rubik-Medium.eot') format('embedded-opentype');
            }

            @font-face {
                font-family:'rubik';
				font-display: auto;
  				src:local('rubik'),
       				url('/fonts/Rubik-Regular.woff2') format('woff2'), /* will be preloaded */
       				url('/fonts/Rubik-Regular.woff') format('woff'),
       				url('/fonts/Rubik-Regular.ttf') format('truetype'),
       				url('/fonts/Rubik-Regular.eot') format('embedded-opentype');
            }
            `,
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});

export { defaultTheme as theme };
