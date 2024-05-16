import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ChoiceAnswer, QuestionSubmitResult } from "@eco8200/data-models";
import * as styles from "../styles";
import { checkboxColor } from "../utils";

interface SingleChoiceQuestionComponentProps {
	possibleAnswers: ChoiceAnswer[];
	checkedAnswer: string | undefined;
	checkResult?: QuestionSubmitResult;
	onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
	disabled: boolean;
}

export default function SingleChoiceQuestionComponent({
	possibleAnswers,
	checkedAnswer,
	checkResult,
	onChange,
	disabled,
}: SingleChoiceQuestionComponentProps): JSX.Element {
	return (
		<RadioGroup onChange={onChange}>
			{possibleAnswers.map((answer: ChoiceAnswer) => {
				return (
					<FormControlLabel
						sx={styles.answer}
						key={answer.id}
						value={answer.id}
						control={
							<Radio
								sx={[styles.checkbox.outline, checkboxColor(checkResult)]}
								checked={checkedAnswer === answer.id}
							/>
						}
						label={answer.displayText}
						disabled={disabled}
						disableTypography
					/>
				);
			})}
		</RadioGroup>
	);
}
