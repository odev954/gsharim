import { IRecordSchema } from "../abstract/record";
import { ISectionDataSchema } from "@eco8200/data-models";
import { z as zod } from "zod";

export const SectionRecordSchema = IRecordSchema.and(ISectionDataSchema);

export type SectionRecord = zod.infer<typeof SectionRecordSchema>;
