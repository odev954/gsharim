import { Box, Button, Paper, SxProps, Typography } from "@mui/material";
import { questionDescription } from "components/question/styles";
import Text from "components/text";
import { startTest, startQuiz } from "./strings";
import { alignButton, title } from "./styles";
import { questionnaireItemContainer } from "../styles";

interface QuestionnaireStartProps {
	sx?: SxProps;
	titleText: string;
	description: string;
	examMode: boolean;
	startQuestionnaire: VoidFunction;
}

export default function QuestionnaireStart({
	sx,
	titleText,
	description,
	examMode,
	startQuestionnaire,
}: QuestionnaireStartProps): JSX.Element {
	return (
		<Paper
			sx={[questionnaireItemContainer, ...(Array.isArray(sx) ? sx : [sx])]}
		>
			<Box>
				<Typography sx={title}>{titleText}</Typography>
				<Typography sx={questionDescription}>{description}</Typography>
			</Box>
			<Button
				sx={alignButton}
				color="secondary"
				variant="contained"
				onClick={startQuestionnaire}
			>
				<Text textToTranslate={examMode ? startTest : startQuiz} />
			</Button>
		</Paper>
	);
}
