import ILayout from "../abstract/layout";
import { LayoutType } from "../consts/layoutType";
import { VerticalSplitSize } from "./layoutSizes";

export default interface VerticalSplitLayout extends ILayout {
	layoutType: LayoutType.VerticalSplit;
	sizes?: VerticalSplitSize;
}
