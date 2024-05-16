import { UnprocessableEntityException } from "@nestjs/common";
import { ZodType } from "zod";

export default function parsePayload<TPayload, TSchema extends ZodType>(
	schema: TSchema,
	payload: TPayload
): TPayload {
	const result = schema.safeParse(payload);

	if (result.success) return result.data;
	throw new UnprocessableEntityException();
}
