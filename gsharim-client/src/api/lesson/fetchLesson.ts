import { Lesson, TaskMetadata, TaskMetadataSchema } from "@eco8200/data-models";
import axios from "axios";
import * as consts from "./consts";

export default async function fetchLesson(
	lessonId: string,
	language: string
): Promise<Lesson> {
	if (!lessonId) throw new Error("undefined lesson id");

	const queryString = new URLSearchParams({ lessonId, language }).toString();
	const response = await axios.get<TaskMetadata[]>(
		`${import.meta.env.VITE_API_URL}/${consts.taskFilterRoute}/?${queryString}`
	);
	return {
		id: lessonId,
		tasksMetadata: TaskMetadataSchema.array().parse(response.data),
	};
}
