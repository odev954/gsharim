import IQuestion from "../abstract/question";
import ChoiceAnswer from "./choiceAnswer";
import ChoiceSubmit from "./choiceSubmit";

export default interface SingleChoiceQuestion extends IQuestion<ChoiceSubmit> {
	// variant: QuestionType.SingleChoice,
	possibleAnswers: ChoiceAnswer[];
}
