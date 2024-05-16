import { AnswerCheckStatus, QuestionSubmitResult } from "@eco8200/data-models";
import { SystemStyleObject } from "@mui/system";
import { checkbox } from "./styles";

export function checkboxColor(
	checkResult: QuestionSubmitResult | undefined
): SystemStyleObject {
	if (checkResult === undefined || !checkResult.isChecked) {
		return checkbox.nutral;
	}
	if (checkResult.checkStatus === AnswerCheckStatus.Correct) {
		return checkbox.success;
	}
	return checkbox.error;
}

export function isCheckStatusCorrect(
	checkResult: QuestionSubmitResult | undefined
): boolean {
	return (
		!!checkResult?.isChecked &&
		checkResult?.checkStatus === AnswerCheckStatus.Correct
	);
}
