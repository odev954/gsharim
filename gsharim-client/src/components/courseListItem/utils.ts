import { SxProps, Theme } from "@mui/material";
import { isNil } from "lodash-es";
import { RibbonType } from "@eco8200/data-models";
import * as styles from "./styles";
import { newRibbonText, recommendedRibbonText } from "./strings";

export const RibbonTypeToValue = {
	[RibbonType.New]: { color: "error.main", text: newRibbonText },
	[RibbonType.Recommended]: {
		color: "secondary.main",
		text: recommendedRibbonText,
	},
};

export const getRibbonStyles = (
	ribbonType: RibbonType,
	ribbonText: string,
	dir: "rtl" | "ltr"
): SxProps<Theme> => {
	return !isNil(ribbonType)
		? {
				...styles.ribbon,
				"&::before": {
					content: `'${ribbonText}'`,
					backgroundColor: RibbonTypeToValue[ribbonType].color,
					...styles.ribbonBefore,
					...styles.ribbonBeforeTransform,
					...(dir === "ltr" ? styles.ribbonBeforeTransformLTR : null),
				},
		  }
		: null;
};
