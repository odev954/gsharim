import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { TaskMetadata, TaskState } from "@eco8200/data-models";
import { useMemo } from "react";
import * as styles from "./styles";
import { StepBlock } from "./stepBlock";

type LessonProgressBarProps = {
	tasksMetadata: Pick<TaskMetadata, "id" | "variant" | "status">[];
	currentTaskId: string;
	direction: "rtl" | "ltr";
};

function LessonProgressBar({
	tasksMetadata,
	currentTaskId,
	direction,
}: LessonProgressBarProps): JSX.Element {
	const isRtl = direction === "rtl";
	const progressIndex = useMemo(() => {
		return tasksMetadata.findIndex(
			(taskMetadata) => taskMetadata.id === currentTaskId
		);
	}, [currentTaskId, tasksMetadata]);
	return (
		<Box sx={styles.container}>
			<Box sx={styles.stepperWrapper}>
				<Stepper
					activeStep={progressIndex}
					alternativeLabel
					connector={
						<Box
							sx={isRtl ? styles.rtlStepConnector : styles.ltrStepConnector}
						/>
					}
					sx={isRtl ? styles.rtlStepper : styles.ltrStepper}
				>
					{tasksMetadata.map((task) => (
						<Step
							key={task.id}
							completed={task.status.state === TaskState.Completed}
						>
							<StepLabel
								StepIconProps={{
									icon: task.variant,
								}}
								StepIconComponent={StepBlock}
							/>
						</Step>
					))}
				</Stepper>
			</Box>
		</Box>
	);
}

export default LessonProgressBar;
