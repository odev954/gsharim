import IAnswerSubmit from "../abstract/answer";

export default interface ChoiceListSubmit extends IAnswerSubmit {
	answerIds: string[];
}
