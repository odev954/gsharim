import { AnswerTypes } from "@eco8200/data-models";
import { isArray, isEmpty, isUndefined } from "lodash-es";

export function isAnswerEmpty(answer: AnswerTypes | undefined): boolean {
	return isUndefined(answer) || (isArray(answer) && isEmpty(answer));
}
