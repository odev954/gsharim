import IQuestion from "../abstract/question";
import ChoiceAnswer from "./choiceAnswer";
import ChoiceListSubmit from "./choiceListSubmit";

export default interface MultiChoiceQuestion
	extends IQuestion<ChoiceListSubmit> {
	// variant: QuestionType.MultiChoice,
	possibleAnswers: ChoiceAnswer[];
}
