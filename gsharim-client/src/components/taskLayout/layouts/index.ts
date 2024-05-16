import { LayoutType } from "@eco8200/data-models";
import SingleSection from "./singleSection";
import TwoHorizontalSplitLayout from "./HorizontalSplit";
import ThreeVerticalSplitLayout from "./ThreeVerticalSplit";
import SingleVerticalTwoHorizontal from "./singleVerticalTwoHorizontal";
import { LayoutProps } from "./types";
import VerticalSplit from "./VerticalSplit";

type LayoutMapType = {
	[key in LayoutType]: React.FC<LayoutProps>;
};

const layoutComponentMap: LayoutMapType = {
	[LayoutType.SingleSection]: SingleSection,
	[LayoutType.VerticalSplit]: VerticalSplit,
	[LayoutType.HorizontalSplit]: TwoHorizontalSplitLayout,
	[LayoutType.ThreeVerticalSplit]: ThreeVerticalSplitLayout,
	[LayoutType.SingleVerticalTwoHorizontal]: SingleVerticalTwoHorizontal,
};

export { layoutComponentMap };
