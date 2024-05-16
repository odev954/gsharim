import { z as zod } from "zod";

export const IRequestSchema = zod
	.object({
		id: zod.string().uuid(),
		timestamp: zod.number().int().min(0),
	})
	.passthrough();

export type IRequest = zod.infer<typeof IRequestSchema>;

export const IResponseSchema = zod
	.object({
		id: zod.string().uuid(),
		requestId: zod.string().uuid(),
		timestamp: zod.number().int().min(0),
		success: zod.boolean(),
	})
	.passthrough();

export type IResponse = zod.infer<typeof IResponseSchema>;
