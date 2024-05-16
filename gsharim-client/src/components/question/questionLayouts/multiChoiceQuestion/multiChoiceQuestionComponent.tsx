import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChoiceAnswer, QuestionSubmitResult } from "@eco8200/data-models";
import * as styles from "../styles";
import { checkboxColor } from "../utils";
import { isChecked } from "./utils";

interface MultiChoiceQuestionComponentProps {
	possibleAnswers: ChoiceAnswer[];
	answer: string[];
	checkResult?: QuestionSubmitResult;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => void;
	disabled: boolean;
}

export default function MultiChoiceQuestionComponent({
	possibleAnswers,
	answer,
	checkResult,
	handleChange,
	disabled,
}: MultiChoiceQuestionComponentProps): JSX.Element {
	return (
		<FormGroup>
			{possibleAnswers.map((currentAnswer) => {
				return (
					<FormControlLabel
						sx={styles.answer}
						key={currentAnswer.id}
						control={
							<Checkbox
								sx={[styles.checkbox.outline, checkboxColor(checkResult)]}
								checked={isChecked(answer, currentAnswer)}
								value={currentAnswer.id}
								onChange={handleChange}
							/>
						}
						label={currentAnswer.displayText}
						disabled={disabled}
						disableTypography
					/>
				);
			})}
		</FormGroup>
	);
}
