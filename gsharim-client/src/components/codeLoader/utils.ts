import { CSSProperties } from "react";

export const expandAnimation = (widthInPixels: number): CSSProperties => {
	return {
		[`@keyframes expand-${widthInPixels}`]: {
			"0%": {
				width: "0px",
			},
			"100%": {
				width: `${widthInPixels}px`,
			},
		},
		animation: `expand-${widthInPixels} 0.2s linear forwards`,
	};
};
