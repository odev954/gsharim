import { z as zod } from "zod";

export enum DataTypes {
	Section = "Section",
	Task = "Task",
	SectionGroup = "SectionGroup",
}

export const DataTypesSchema = zod.nativeEnum(DataTypes);
