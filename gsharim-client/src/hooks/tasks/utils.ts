import { updateTask } from "api/task/updateTask";
import { Lesson, Task } from "@eco8200/data-models";
import { findIndexById } from "utils/common";
import { SetData } from "types/server/useServerData";

export async function onTaskUpdate(
	oldData: Task,
	newData: Task,
	taskId: string,
	setLesson: SetData<Lesson>
): Promise<void> {
	await setLesson((oldLesson) => {
		const newLesson = { ...oldLesson };
		const taskIndex = findIndexById(newLesson.tasksMetadata, taskId);
		newLesson.tasksMetadata[taskIndex] = newData.metadata;
		return newLesson;
	});
	updateTask(newData);
}
