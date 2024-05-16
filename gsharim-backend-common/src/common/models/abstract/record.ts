import { DataTypesSchema } from "../../types/dataTypes";
import { z as zod } from "zod";

export const IRecordSchema = zod
	.object({
		id: zod.string().uuid(),
		type: DataTypesSchema,
		created_at: zod.number().int().min(0),
		updated_at: zod.number().int().min(0),
	})
	.passthrough()
	.refine(
		({ created_at, updated_at }) => created_at <= updated_at,
		"invliad timestamps, created_at is grater than updated_at"
	);

export type IRecord = zod.infer<typeof IRecordSchema>;
