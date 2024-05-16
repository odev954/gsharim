import { Box, Button, Paper, Typography } from "@mui/material";
import victoryFox from "assets/quiz/victoryFox.webp";
import { questionTitle } from "components/question/styles";
import { questionnaireItemContainer } from "components/questionnaire/styles";
import Text from "components/text";
import { victoryMessage, buttonBack } from "./strings";
import {
	backToQuizButton,
	quizEndTextLocation,
	victoryFoxSize,
} from "./styles";

interface QuizEndProps {
	onBack: VoidFunction;
}

export default function QuizEnd({ onBack }: QuizEndProps): JSX.Element {
	return (
		<Paper sx={questionnaireItemContainer}>
			<Box sx={quizEndTextLocation}>
				<Box sx={victoryFoxSize} component="img" src={victoryFox} />
				<Typography sx={questionTitle}>
					<Text textToTranslate={victoryMessage} />
				</Typography>
			</Box>
			<Button
				sx={backToQuizButton}
				variant="text"
				color="secondary"
				onClick={onBack}
			>
				<Text textToTranslate={buttonBack} />
			</Button>
		</Paper>
	);
}
