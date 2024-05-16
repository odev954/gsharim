import { IRecordSchema } from "../abstract/record";
import { TaskModelSchema } from "../content/taskModel";
import { z as zod } from "zod";

export const TaskRecordSchema = IRecordSchema.and(TaskModelSchema);

export type TaskRecord = zod.infer<typeof TaskRecordSchema>;
