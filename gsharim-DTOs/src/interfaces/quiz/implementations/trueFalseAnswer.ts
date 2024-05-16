import IAnswerSubmit from "../abstract/answer";

export default interface TrueFalseSubmit extends IAnswerSubmit {
	isTrue?: boolean;
}
