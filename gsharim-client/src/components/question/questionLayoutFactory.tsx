import { QuestionType } from "@eco8200/data-models";
import {
	MultiChoiceQuestion,
	SingleChoiceQuestion,
	TrueFalseQuestion,
	QuestionLayoutProps,
} from "./questionLayouts";

const QuestionLayoutProducers: Map<
	QuestionType,
	(props: QuestionLayoutProps) => JSX.Element
> = new Map()
	.set(QuestionType.MultiChoice, MultiChoiceQuestion)
	.set(QuestionType.TrueFalse, TrueFalseQuestion)
	.set(QuestionType.SingleChoice, SingleChoiceQuestion);

export interface QuestionLayoutFactoryProps {
	props: QuestionLayoutProps;
	producers?: Map<QuestionType, (props: QuestionLayoutProps) => JSX.Element>;
}

export default function QuestionLayoutFactory({
	props,
	producers = QuestionLayoutProducers,
}: QuestionLayoutFactoryProps): JSX.Element {
	if (!producers.has(props.question.variant)) {
		throw ReferenceError("question variant is not defined");
	}

	const Question = producers.get(props.question.variant)!;
	return <Question {...props} />;
}
