import ILayout from "../abstract/layout";
import { LayoutType } from "../consts/layoutType";
import { SingleVerticalTwoHorizontalSplitSizes } from "./layoutSizes";

export default interface SingleVerticalTwoHorizontalSplitLayout
	extends ILayout {
	layoutType: LayoutType.SingleVerticalTwoHorizontal;
	sizes?: SingleVerticalTwoHorizontalSplitSizes;
}
