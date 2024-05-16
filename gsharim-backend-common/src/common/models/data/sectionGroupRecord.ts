import { IRecordSchema } from "../abstract/record";
import { SectionGroupDataSchema } from "../content/sectionGroupData";
import { z as zod } from "zod";

export const SectionGroupRecordSchema = IRecordSchema.and(
	SectionGroupDataSchema
);

export type SectionGroupRecord = zod.infer<typeof SectionGroupRecordSchema>;
