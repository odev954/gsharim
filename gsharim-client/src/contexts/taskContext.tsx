import { TaskState } from "@eco8200/data-models";
import { createContext, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Outlet } from "react-router-dom";
import useTask from "hooks/tasks/useTask";
import { useLessonMetadata } from "hooks/lesson";

type TaskContextType = {
	taskId: string;
};

export const TaskContext = createContext<TaskContextType>({
	taskId: "",
});

export function TaskProvider(): JSX.Element {
	const { taskId } = useParams();

	if (!taskId) {
		throw new Error("undefined task id");
	}

	const { data: task, setData: setTask } = useTask({ taskId });
	const { data: lessonMetaData, setData: setLessonMetadata } =
		useLessonMetadata();

	if (!lessonMetaData) {
		throw new Error("lessonMetadata is undefined");
	}

	useEffect(() => {
		if (task?.metadata.status.state === TaskState.Todo) {
			setTask((currentTask) => {
				const taskClone = { ...currentTask };
				taskClone.metadata.status.state = TaskState.Ongoing;
				return taskClone;
			});
		}
	}, [setTask, task]);

	useEffect(() => {
		setLessonMetadata((currentLessonMetadata) => {
			return {
				...currentLessonMetadata,
				currentTaskId: taskId,
			};
		});
	}, [setLessonMetadata, taskId]);

	const taskContext = useMemo(() => ({ taskId }), [taskId]);

	return (
		<TaskContext.Provider value={taskContext}>
			<Outlet />
		</TaskContext.Provider>
	);
}
