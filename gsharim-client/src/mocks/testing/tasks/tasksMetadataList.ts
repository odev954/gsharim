import { TaskMetadata, TaskType, TaskState } from "@eco8200/data-models";

export const tasksMetadataListMock: TaskMetadata[] = [
	{
		id: "737e0622-7c1e-4ab8-b344-991a2be25b9f",
		variant: TaskType.Lecture,
		name: "write a game in python",
		description: "this task is to write a game in python",
		status: { state: TaskState.Todo, completedSections: [] },
	},
	{
		id: "4180ac1c-bcfa-4a05-956e-8c5718b2269d",
		variant: TaskType.Presentation,
		name: "find a 0day in IOS",
		description: "this task be a pasten and find 0day in IOS",
		status: { state: TaskState.Ongoing, completedSections: [] },
	},
	{
		id: "0f1c280a-dc7b-4059-a1c2-e75797ed84b7",
		variant: TaskType.Presentation,
		name: "presentation mock",
		description: "this is a presentation mock",
		status: { state: TaskState.Todo, completedSections: [] },
	},
	{
		id: "0f1c280a-dc7b-4059-a1c2-gogogagab761",
		variant: TaskType.Presentation,
		name: "presentation mock",
		description: "this is a presentation mock",
		status: { state: TaskState.Completed, completedSections: [] },
	},
];
