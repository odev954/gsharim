import { Task } from "@eco8200/data-models";

type SetTaskServerStateReturnType = {
	status: string;
};

export async function updateTask(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	newTask: Task
): Promise<SetTaskServerStateReturnType> {
	return { status: "OK" };
}
