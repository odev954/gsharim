import { Box } from "@mui/material";
import { Test } from "components/questionnaire";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import {
	questionnairSectionWrapper,
	taskWrapper,
} from "components/taskLayout/styles";

interface TestSectionProps {
	id: string;
	testId: string;
	title: string;
	description: string;
	questionIds: string[];
}

export default function TestSection({
	id,
	testId,
	title,
	description,
	questionIds,
}: TestSectionProps): JSX.Element {
	const { approveSection } = useSetSectionBlocking(id);
	return (
		<Box sx={taskWrapper}>
			<Box sx={questionnairSectionWrapper}>
				<Test
					testId={testId}
					title={title}
					description={description}
					questionIds={questionIds}
					setTestDone={approveSection}
				/>
			</Box>
		</Box>
	);
}
