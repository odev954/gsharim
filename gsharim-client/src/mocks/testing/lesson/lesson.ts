import { Lesson } from "@eco8200/data-models";
import { tasksMetadataListMock } from "../tasks";

export const lessonMock = {
	id: "680247ef-3cd8-4963-ba3e-99ed640101d1",
	tasksMetadata: tasksMetadataListMock,
};

export const getLessonById = (
	lessonId: string | undefined
): Lesson | undefined => {
	const allowedIdsMock = ["0"];

	if (lessonId && allowedIdsMock.includes(lessonId)) {
		return lessonMock;
	}

	return undefined;
};
