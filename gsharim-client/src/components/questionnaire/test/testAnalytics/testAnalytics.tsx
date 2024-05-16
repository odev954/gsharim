import { Box, Paper, Typography } from "@mui/material";
import { questionnaireItemContainer } from "components/questionnaire/styles";
import { questionDescription, questionTitle } from "components/question/styles";
import Text from "components/text";
import { questionCountText, gradeText } from "./strings";
import * as styles from "./styles";

interface TestAnalyticsProps {
	title: string;
	questionCount: number;
	pointsReceived: number;
}

export default function TestAnalytics({
	title,
	questionCount,
	pointsReceived,
}: TestAnalyticsProps): JSX.Element {
	return (
		<Paper sx={questionnaireItemContainer}>
			<Box>
				<Typography sx={questionTitle}>
					<Text textToTranslate={title} />
				</Typography>
				<Box sx={styles.textContainer}>
					<Typography sx={[questionDescription, styles.bold]}>
						<Text textToTranslate={questionCountText} />
					</Typography>
					<Typography sx={questionDescription}>{questionCount}</Typography>
				</Box>
				<Box sx={styles.textContainer}>
					<Typography sx={[questionDescription, styles.bold]}>
						<Text textToTranslate={gradeText} />
					</Typography>
					<Typography sx={questionDescription}>{pointsReceived}</Typography>
				</Box>
			</Box>
		</Paper>
	);
}
