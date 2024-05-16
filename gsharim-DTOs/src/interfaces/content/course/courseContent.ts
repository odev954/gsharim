import Chapter from "./chapter";

export default interface CourseContent {
	id: string;
	chapters: Chapter[];
	backgroundUrl?: string;
}
