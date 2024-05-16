import { Box } from "@mui/material";
import { useMemo } from "react";
import { validateArrayLength } from "utils/common";
import { LayoutType } from "@eco8200/data-models";
import { LayoutProps } from "../types";
import { nestedLayoutSizeToSplitPaneSizes, validateLayoutType } from "../utils";
import { defaultNestedInitialSize } from "./consts";
import SplitPane from "../components/splitPane";
import { splitPaneContainer } from "../styles";

export default function SingleVerticalTwoHorizontal({
	children,
	layout,
}: LayoutProps): JSX.Element {
	if (!validateArrayLength(children, 3))
		throw new Error("invalid amount of sections");

	if (!validateLayoutType(layout, LayoutType.SingleVerticalTwoHorizontal))
		throw new Error("Invalid layout type");

	const [
		rightSideFirstSectionChild,
		rightSideSecondSection,
		leftSideSectionChild,
	] = children;

	const sizes = useMemo(
		() =>
			layout.sizes
				? nestedLayoutSizeToSplitPaneSizes(layout.sizes)
				: defaultNestedInitialSize,
		[layout.sizes]
	);

	return (
		<SplitPane initialSizes={sizes.outerSplitLeftSection} split="vertical">
			<Box sx={splitPaneContainer}>
				<SplitPane
					split="horizontal"
					initialSizes={sizes.innerSplitLowerSection}
				>
					{rightSideFirstSectionChild}
					{rightSideSecondSection}
				</SplitPane>
			</Box>
			{leftSideSectionChild}
		</SplitPane>
	);
}
