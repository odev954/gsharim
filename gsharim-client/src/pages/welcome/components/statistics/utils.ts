import { counterMaxTime, counterValueDivider } from "./consts";

export const numberAnimationTime = (number: number): number => {
	return number / counterValueDivider < counterMaxTime
		? number / counterValueDivider + 1
		: counterMaxTime;
};
