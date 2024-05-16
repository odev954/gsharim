import { AnswerCheckStatus } from "../consts/answerCheckStatus";

export default interface QuestionCheckResult {
	questionId: string;
	checkStatus: AnswerCheckStatus;
	explanation: string;
}
