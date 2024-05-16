import IAnswerSubmit from "../abstract/answer";

export default interface ChoiceSubmit extends IAnswerSubmit {
	answerId?: string;
}
