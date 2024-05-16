import { SectionType } from "../consts/sectionType";
import ISectionOptions from "./sectionOptions";

export default interface ISectionData {
	id: string;
	variant: SectionType;
	options?: ISectionOptions;
}
