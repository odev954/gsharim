import { Task, TaskState } from "@eco8200/data-models";
import { difference, remove, union } from "lodash-es";

export function generateNewTaskObject(
	currentTask: Task,
	isDone: boolean,
	sectionId: string
): Task {
	const newTask = { ...currentTask };
	let newCompletedSections = [...newTask.metadata.status.completedSections];
	if (isDone) {
		newCompletedSections = union(newCompletedSections, [sectionId]);
	} else {
		remove(newCompletedSections, (item) => item === sectionId);
	}
	const taskSectionIds = currentTask.sections.map(({ id }) => id);
	const isTaskDone =
		difference(taskSectionIds, newCompletedSections).length === 0;
	const taskState = isTaskDone
		? TaskState.Completed
		: currentTask.metadata.status.state;
	newTask.metadata.status = {
		state: taskState,
		completedSections: newCompletedSections,
	};
	return newTask;
}
