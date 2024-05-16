import { TaskMetadata, TaskState } from "@eco8200/data-models";

export const calcLessonProgress = (
	lessonTasksMetadata: TaskMetadata[]
): number => {
	const completedTasks = lessonTasksMetadata.filter(
		(metadata) => metadata.status.state === TaskState.Completed
	);
	return Math.round((completedTasks.length / lessonTasksMetadata.length) * 100);
};
