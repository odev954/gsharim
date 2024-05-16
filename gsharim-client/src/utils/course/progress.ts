import { meanBy } from "lodash";

export const calcProgress = (
	progressArray: { progress?: number }[]
): number => {
	const progress = meanBy(
		progressArray,
		(progressObject) => progressObject.progress || 0
	);
	return Math.round(progress);
};
