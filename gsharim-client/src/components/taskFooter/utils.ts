import { NavigateType, NavigateTypeInfo } from "hooks/navigation/types";
import { MuiButtonColor } from "types/style/MuiButtonColor";
import * as strings from "./strings";

type ButtonTextMapping = {
	[key in NavigateType]: Record<"next" | "previous", string>;
};
const ButtonTextMapping: ButtonTextMapping = {
	chapter: {
		next: strings.nextChapter,
		previous: strings.previousChapter,
	},
	lesson: {
		next: strings.nextLesson,
		previous: strings.previousLesson,
	},
	task: {
		next: strings.nextTask,
		previous: strings.previousTask,
	},
};

export const getButtonText = (
	navigationType: NavigateTypeInfo,
	isPreviousButtons: boolean
): string => {
	if (!navigationType) {
		return isPreviousButtons ? strings.coursePage : strings.finishCourse;
	}

	return ButtonTextMapping[navigationType][
		isPreviousButtons ? "previous" : "next"
	];
};

export const getNextButtonColor = (
	nextType: NavigateTypeInfo
): MuiButtonColor => {
	if (nextType) return nextType === "task" ? "secondary" : "primary";

	return "gold";
};

export const getPreviousButtonColor = (
	previousType: NavigateTypeInfo
): MuiButtonColor => {
	const isFirstTaskInCourse = previousType === undefined;

	return previousType === "task" || isFirstTaskInCourse
		? "secondary"
		: "primary";
};
