export const getCourseMetadataQueryKey = "get-course-metadata";
export const getCourseQueryKey = "get-course";
export const getHomepageCourseMetadataListQueryKey =
	"get-homepage-course-metadata-list";
export const courseMetadataAllowedToUpdateFields = [
	"progress",
	"currentChapterId",
];
export const courseAllowedUpdateKeyPaths = [
	"chapters.*.progress",
	"chapters.*.currentLessonId",
	"chapters.*.lessonsMetadata.*.progress",
	"chapters.*.lessonsMetadata.*.currentTaskId",
];
