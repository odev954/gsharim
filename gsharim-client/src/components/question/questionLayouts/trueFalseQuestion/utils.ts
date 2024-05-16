import { AnswerCheckStatus, QuestionSubmitResult } from "@eco8200/data-models";
import { SystemStyleObject } from "@mui/system";
import {
	selectedAnswer,
	correctAnswerOutline,
	incorrectAnswerOutline,
} from "./styles";

export function outline(
	checkResult: QuestionSubmitResult | undefined
): SystemStyleObject {
	if (!checkResult || !checkResult.isChecked) {
		return selectedAnswer;
	}
	if (checkResult.checkStatus === AnswerCheckStatus.Correct) {
		return correctAnswerOutline;
	}
	return incorrectAnswerOutline;
}
