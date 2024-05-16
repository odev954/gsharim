import ILayout from "../abstract/layout";
import { LayoutType } from "../consts/layoutType";
import { ThreeHorizontalSplitSize } from "./layoutSizes";

export default interface ThreeHorizontalSplitLayout extends ILayout {
	layoutType: LayoutType.ThreeHorizontalSplit;
	sizes?: ThreeHorizontalSplitSize;
}
