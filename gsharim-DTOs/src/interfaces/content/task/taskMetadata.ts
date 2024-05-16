import { TaskStatus } from "./taskStatus";
import { TaskType } from "./taskType";

export default interface TaskMetadata {
	id: string;
	variant: TaskType;
	name: string;
	description: string;
	status: TaskStatus;
}
