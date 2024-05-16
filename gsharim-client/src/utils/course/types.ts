export type ScrollOptions = {
	id: string;
	type: "chapter" | "lesson";
};

interface IBuildUrlType {
	courseId: string;
	chapterId?: string;
	lessonId?: string;
	taskId?: string;
}

interface BuildCourseUrl extends IBuildUrlType {
	courseId: string;
}

interface BuildChapterUrl extends BuildCourseUrl {
	chapterId: string;
}

interface BuildLessonUrl extends BuildChapterUrl {
	lessonId: string;
}

interface BuildTaskUrl extends BuildLessonUrl {
	taskId: string;
}

export type buildUrlProps =
	| BuildCourseUrl
	| BuildChapterUrl
	| BuildLessonUrl
	| BuildTaskUrl;

export type Active<T extends { progress?: number }> = WithRequired<
	T,
	"progress"
>;
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
