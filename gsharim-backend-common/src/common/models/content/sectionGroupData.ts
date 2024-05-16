import { ILayoutSchema } from "@eco8200/data-models";
import { z as zod } from "zod";

export const SectionGroupDataSchema = zod.object({
	sectionIds: zod.string().uuid().array(),
	layout: ILayoutSchema,
});

export type SectionGroupData = zod.infer<typeof SectionGroupDataSchema>;
