type SetLessonContentServerDataReturnType = {
	status: string;
};

export async function updateLessonMetadata(): Promise<SetLessonContentServerDataReturnType> {
	return { status: "Ok" };
}
