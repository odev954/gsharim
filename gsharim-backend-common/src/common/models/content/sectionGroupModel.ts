import { ILayoutSchema, ISectionDataSchema } from "@eco8200/data-models";
import { z as zod } from "zod";

export const SectionGroupModelSchema = zod.object({
	id: zod.string().uuid(),
	sections: ISectionDataSchema.array(),
	layout: ILayoutSchema,
});

export type SectionGroupModel = zod.infer<typeof SectionGroupModelSchema>;
