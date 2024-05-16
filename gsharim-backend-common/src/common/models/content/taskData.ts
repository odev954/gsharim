import { TaskTypeSchema } from "@eco8200/data-models";
import { z as zod } from "zod";

export const TaskDataSchema = zod.object({
	variant: TaskTypeSchema,
	lessonId: zod.string().uuid(),
	name: zod.string(),
	description: zod.string(),
	sectionGroupId: zod.string().uuid(),
	numberInSeries: zod.number().min(0),
});

export type TaskData = zod.infer<typeof TaskDataSchema>;
