import TaskMetadata from "../task/taskMetadata";

export default interface LessonContent {
	id: string;
	tasksMetadata: TaskMetadata[];
}
