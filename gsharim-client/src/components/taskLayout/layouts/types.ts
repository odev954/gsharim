import { ILayout } from "@eco8200/data-models";

//	if creating any new nested layouts, place them in this type.
export type SplitPaneSizes = {
	outerSplitLeftSection: [number, number];
	innerSplitLowerSection: [number, number];
};

export type LayoutProps = {
	children: JSX.Element[];
	layout: ILayout;
};
