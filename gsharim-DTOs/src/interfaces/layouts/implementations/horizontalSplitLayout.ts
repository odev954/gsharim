import ILayout from "../abstract/layout";
import { LayoutType } from "../consts/layoutType";
import { HorizontalSplitSize } from "./layoutSizes";

export default interface HorizontalSplitLayout extends ILayout {
	layoutType: LayoutType.HorizontalSplit;
	sizes?: HorizontalSplitSize;
}