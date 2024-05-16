import { QuestionType } from "../consts/questionType";
import IAnswerSubmit from "./answer";

export default interface IQuestion<
	SubmittedAnswer extends IAnswerSubmit = IAnswerSubmit
> {
	id: string;
	variant: QuestionType;
	title: string;
	description?: string;
	submittedAnswer?: SubmittedAnswer;
}
