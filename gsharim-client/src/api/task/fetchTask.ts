import { Task, TaskSchema } from "@eco8200/data-models";
import axios from "axios";
import { taskRoute } from "./consts";

export default async function fetchTask(
	taskId: string | undefined,
	language: string
): Promise<Task> {
	if (!taskId) throw new Error("the provided taskId was undefined");

	const queryString = new URLSearchParams({ language }).toString();
	const response = await axios.get<Task>(
		`${import.meta.env.VITE_API_URL}/${taskRoute}/${taskId}?${queryString}`
	);

	return TaskSchema.parse(response.data);
}
