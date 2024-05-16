export const chapterQueryKey = "parse-chapter";
export const chapterAllowedUpdateKeyPaths = [
	"currentLessonId",
	"progress",
	"lessonsMetadata.*.progress",
	"lessonsMetadata.*.currentTaskId",
];
