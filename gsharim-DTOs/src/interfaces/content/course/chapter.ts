import Lesson from "../lesson/lesson";

export default interface Chapter {
	id: string;
	description?: string;
	name: string;
	lessons: Lesson[];
	finalExercise?: Lesson;
}
