type SetLessonServerDataReturnType = {
	status: string;
};

export async function updateLesson(): Promise<SetLessonServerDataReturnType> {
	return { status: "Ok" };
}
