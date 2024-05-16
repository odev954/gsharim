import ILayout from "../abstract/layout";
import { LayoutType } from "../consts/layoutType";

export default interface SingleSectionLayout extends ILayout {
	layoutType: LayoutType.SingleSection;
}
