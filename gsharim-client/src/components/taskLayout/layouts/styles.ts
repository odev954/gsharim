import { SystemStyleObject } from "@mui/system";
import { CSSProperties } from "react";
import {
	horizontalLine,
	activeHorizontalResizer,
	hoverHorizontalResizer,
	hoverVerticalResizer,
	activeVerticalResizer,
	verticalLine,
} from "assets/layouts";

export const splitPaneContainer: SystemStyleObject = {
	">:first-of-type": {
		rowGap: "10px",
	},
};

export const verticalStyles = (isActive: boolean): CSSProperties => {
	return {
		backgroundImage: `url(${
			isActive ? activeVerticalResizer : hoverVerticalResizer
		}), url(${verticalLine})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		width: "20px",
		marginBottom: "16px",
		marginTop: "16px",
		insetInlineStart: "-8px",
	};
};

export const horizontalStyles = (isActive: boolean): CSSProperties => {
	return {
		backgroundImage: `url(${
			isActive ? activeHorizontalResizer : hoverHorizontalResizer
		}), url(${horizontalLine})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		height: "20px",
		marginTop: "-10px",
		marginLeft: "16px",
		marginRight: "16px",
	};
};
