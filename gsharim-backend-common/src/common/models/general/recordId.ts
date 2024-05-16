import { z as zod } from "zod";

export const RecordIdSchema = zod.object({
	id: zod.string().uuid(),
});

export type RecordId = zod.infer<typeof RecordIdSchema>;
