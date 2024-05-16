import {
	AnswerCheckStatus,
	CheckedQuestionSubmitResult,
} from "@eco8200/data-models";
import { ButtonTextOptions } from ".";

export function buttonText(
	buttonNext: string,
	buttonSubmit: string,
	checkResult: CheckedQuestionSubmitResult | undefined,
	options?: ButtonTextOptions
): string {
	if (checkResult?.checkStatus === AnswerCheckStatus.Correct) {
		return options?.successText ?? buttonNext;
	}
	return options?.submitionText ?? buttonSubmit;
}
