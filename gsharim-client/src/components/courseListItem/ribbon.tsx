import { Box } from "@mui/material";
import { RibbonType } from "@eco8200/data-models";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { RibbonTypeToValue, getRibbonStyles } from "./utils";

interface RibbonProps {
	type: RibbonType;
}

export default function Ribbon({ type }: RibbonProps): JSX.Element {
	const { t: translate, i18n } = useTranslation();
	const dir = i18n.dir(i18n.language);
	const ribbonStyle = useMemo(() => {
		const ribbonText = translate(RibbonTypeToValue[type].text);
		return getRibbonStyles(type, ribbonText, dir);
	}, [type, translate, dir]);

	return <Box sx={ribbonStyle} />;
}
