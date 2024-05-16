import { MuiPaletteColor } from "types/style/MuiPaletteColor";

declare module "@mui/material/styles" {
	interface ZIndex {
		container: number;
		subContainer: number;
		modal: number;
		tooltip: number;
		gamePart: number;
		appBar: number;
		stepper: number;
	}

	interface TypeText {
		userName: string;
		white: string;
		lightBlue: string;
		light: string;
	}

	interface PaletteOptions {
		monochromatic: PaletteOptions["primary"];
		grey: PaletteOptions["primary"];
		black: PaletteOptions["primary"];
		white: PaletteOptions["primary"];
		yellow: PaletteOptions["primary"];
		blue: PaletteOptions["primary"];
		azure: PaletteOptions["primary"];
		azureGradient: PaletteOptions["primary"];
		secondaryGradient: PaletteOptions["primary"];
		goldGradient: PaletteOptions["primary"];
	}

	interface Palette {
		monochromatic: MuiPaletteColor;
		black: MuiPaletteColor;
		white: MuiPaletteColor;
		blue: MuiPaletteColor;
		yellow: MuiPaletteColor;
		azureGradient: MuiPaletteColor;
		secondaryGradient: MuiPaletteColor;
		azure: MuiPaletteColor;
		goldGradient: MuiPaletteColor;
	}

	interface PaletteColor {
		"100": string;
		"200": string;
		"300": string;
		main: string;
		"400": string;
		"600": string;
		"700": string;
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		blue: true;
		white: true;
		yellow: true;
		azureGradient: true;
		secondaryGradient: true;
		azure: true;
		gold: true;
	}

	interface ButtonPropsVariantOverrides {
		shiny: true;
		largeOutlined: true;
	}
}
