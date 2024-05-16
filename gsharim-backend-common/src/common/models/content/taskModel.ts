import { TaskTypeSchema } from "@eco8200/data-models";
import { z as zod } from "zod";

export const TaskModelSchema = zod.object({
	id: zod.string().uuid(),
	variant: TaskTypeSchema,
	lessonId: zod.string().uuid(),
	name: zod.string(),
	description: zod.string(),
	sectionGroupId: zod.string().uuid(),
	numberInSeries: zod.number().min(0),
});

export type TaskModel = zod.infer<typeof TaskModelSchema>;
