import { TaskState } from "@eco8200/data-models";
import { Box } from "@mui/material";
import { errorBoundaryWrapper } from "utils/errorBoundary";
import useTask from "hooks/tasks/useTask";
import { useEffect, useMemo } from "react";
import TaskLayoutComponent from "./taskLayoutComponent";
import { taskLayoutContainer } from "./styles";
import { layoutComponentMap } from "./layouts";
import { errorTextTitle, errorText } from "./sectionContainer/strings";
import SectionContainer from "./sectionContainer";

export default function TaskLayoutContainer(): JSX.Element {
	const { data: task, setData: setTask } = useTask();
	if (!task) throw new Error("task is undefined");
	const { layout, metadata } = task;

	const LayoutComponent = useMemo(() => {
		return errorBoundaryWrapper(layoutComponentMap[layout.layoutType], {
			errorTextTitleKey: errorTextTitle,
			errorTextKey: errorText,
		});
	}, [layout.layoutType]);
	const doneSections = task.metadata.status.completedSections;

	useEffect(() => {
		if (metadata.status.state === TaskState.Todo) {
			setTask((currentTask) => {
				const newTask = {
					...currentTask,
					metadata: {
						...currentTask.metadata,
						status: {
							...currentTask.metadata.status,
							state: TaskState.Ongoing,
						},
					},
				};
				return newTask;
			});
		}
	}, [metadata, setTask]);

	return (
		<Box sx={taskLayoutContainer}>
			<TaskLayoutComponent LayoutComponent={LayoutComponent} layout={layout}>
				{task.sections.map(({ variant, ...props }) => {
					const { id } = props;
					const sectionDone = doneSections.includes(id);
					return (
						<SectionContainer
							id={id}
							variant={variant}
							isDone={sectionDone}
							sectionProps={props}
						/>
					);
				})}
			</TaskLayoutComponent>
		</Box>
	);
}
