import { QuestionSubmitResult, IQuestion } from "@eco8200/data-models";

export interface QuestionLayoutProps<
	QuestionType extends IQuestion = IQuestion
> {
	question: QuestionType;
	onAnswerChange: (answer: QuestionType["submittedAnswer"] | undefined) => void;
	checkResult?: QuestionSubmitResult;
}
