import { mapValues, sum } from "lodash-es";
import {
	ILayout,
	LayoutSize,
	NestedLayoutSize,
	LayoutType,
} from "@eco8200/data-models";
import { KeyedBy } from "utils/common/keyBy";
import { SplitPaneSizes } from "./types";
import { oneHundredPercent } from "./consts";

const nestedLayoutSizeToSplitPaneSize = (
	nestedLayoutSizeValue: number
): [number, number] => {
	const percentageInFlexBasis: [number, number] = [
		oneHundredPercent - nestedLayoutSizeValue,
		nestedLayoutSizeValue,
	];

	return percentageInFlexBasis;
};

export const nestedLayoutSizeToSplitPaneSizes = (
	inputPercentages: NestedLayoutSize
): SplitPaneSizes => {
	const splitPaneSizes = mapValues(
		inputPercentages,
		nestedLayoutSizeToSplitPaneSize
	);

	return splitPaneSizes;
};

const addRemainingPercentage = (percentageToSplitPaneSizes: number[]): void => {
	const remainingPercentageInFlexBasis =
		oneHundredPercent - sum(percentageToSplitPaneSizes);
	percentageToSplitPaneSizes.push(remainingPercentageInFlexBasis);
};

export const layoutSizePercentageToSplitPaneSizes = (
	inputPercentages: LayoutSize
): number[] => {
	const percentageToSplitPaneSizes = Object.values(inputPercentages);
	addRemainingPercentage(percentageToSplitPaneSizes);

	return percentageToSplitPaneSizes.reverse();
};

export function validateLayoutType<L extends LayoutType>(
	layout: ILayout,
	layoutType: L
): layout is KeyedBy<ILayout, "layoutType">[L] {
	return layout.layoutType === layoutType;
}
