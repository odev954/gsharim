export type HorizontalSplitSize = {
	lowerSection: number;
};

export type VerticalSplitSize = {
	leftSection: number;
};

export type SingleVerticalTwoHorizontalSplitSizes = {
	outerSplitLeftSection: number;
	innerSplitLowerSection: number;
};

export type ThreeHorizontalSplitSize = {
	leftSection: number;
	middleSection: number;
};

export type LayoutSize =
	| HorizontalSplitSize
	| VerticalSplitSize
	| ThreeHorizontalSplitSize;

//	if creating any new nested layouts, place them in this type.
export type NestedLayoutSize = SingleVerticalTwoHorizontalSplitSizes;
