import { useCallback, useContext, useEffect, useState } from "react";
import { TaskContext } from "contexts";
import useTask from "hooks/tasks/useTask";
import { generateNewTaskObject } from "./utils";

type useSetSectionBlockingReturnValue = {
	approveSection: VoidFunction;
	denySection: VoidFunction;
};
export default function useSetSectionBlocking(
	sectionId: string
): useSetSectionBlockingReturnValue {
	const { taskId } = useContext(TaskContext);
	const { data: task, setData: setTask } = useTask({ taskId });
	const [isDone, setIsDone] = useState<boolean>(false);
	useEffect(() => {
		if (!task) throw new Error("task is not defined");
		if (task.metadata.status.completedSections.includes(sectionId) === isDone) {
			return; // if the value of isDone is equal to the value that is in the task, there is no need to mutate
		}
		setTask((currentTask) => {
			return generateNewTaskObject(currentTask, isDone, sectionId);
		});
	}, [task, taskId, sectionId, isDone, setTask]);

	const approveSection = useCallback(() => {
		setIsDone(true);
	}, [setIsDone]);

	const denySection = useCallback(() => {
		setIsDone(false);
	}, [setIsDone]);

	return { approveSection, denySection };
}
