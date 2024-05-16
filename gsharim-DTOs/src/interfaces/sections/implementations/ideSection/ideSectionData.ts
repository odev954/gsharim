import ISectionData from "../../abstract/sectionData";
import { SectionType } from "../../consts/sectionType";
import IdeConfiguration from "../../abstract/ideConfiguration";

export default interface IdeSectionData extends ISectionData, IdeConfiguration {
	variant: SectionType.Ide;
}
