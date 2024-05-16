import { Box } from "@mui/material";
import { Quiz } from "components/questionnaire";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import {
	questionnairSectionWrapper,
	taskWrapper,
} from "components/taskLayout/styles";

interface QuizSectionProps {
	id: string;
	title: string;
	description: string;
	questionIds: string[];
}

export default function QuizSection({
	id,
	title,
	description,
	questionIds,
}: QuizSectionProps): JSX.Element {
	const { approveSection } = useSetSectionBlocking(id);
	return (
		<Box sx={taskWrapper}>
			<Box sx={questionnairSectionWrapper}>
				<Quiz
					title={title}
					description={description}
					questionIds={questionIds}
					onQuizDone={approveSection}
				/>
			</Box>
		</Box>
	);
}
