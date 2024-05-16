export default interface Lesson {
	id: string;
	name: string;
	description: string;
	thumbnailUrl: string;
	progress?: number;
	locked: boolean;
	currentTaskId?: string;
}
