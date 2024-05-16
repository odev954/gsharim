import { Box } from "@mui/material";
import { LayoutType } from "@eco8200/data-models";
import { useMemo } from "react";
import { validateArrayLength } from "utils/common";
import { splitPaneContainer } from "../styles";
import { LayoutProps } from "../types";
import {
	layoutSizePercentageToSplitPaneSizes,
	validateLayoutType,
} from "../utils";
import { defaultInitialSize } from "../consts";
import SplitPane from "../components/splitPane";

export default function VerticalSplit({
	children,
	layout,
}: LayoutProps): JSX.Element {
	if (!validateArrayLength(children, 2))
		throw new Error("invalid amount of sections");

	if (!validateLayoutType(layout, LayoutType.VerticalSplit))
		throw new Error("Invalid layout type");

	const sizes = useMemo(
		() =>
			layout.sizes
				? layoutSizePercentageToSplitPaneSizes(layout.sizes)
				: defaultInitialSize,
		[layout.sizes]
	);

	return (
		<Box sx={splitPaneContainer}>
			<SplitPane initialSizes={sizes} split="vertical">
				{children}
			</SplitPane>
		</Box>
	);
}
