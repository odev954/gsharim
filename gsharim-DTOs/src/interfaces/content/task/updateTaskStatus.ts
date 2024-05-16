import { TaskStatus } from "./taskStatus";

export default interface UpdateTaskStatus {
	taskId: string;
	status: TaskStatus;
}
