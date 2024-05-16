import { LayoutType } from "../consts/layoutType";
import { LayoutSize, NestedLayoutSize } from "../implementations/layoutSizes";

export default interface ILayout {
	layoutType: LayoutType;
	sizes?: LayoutSize | NestedLayoutSize;
}
