import PresentationSectionOptions from "./presentationSectionOptions";
import ISectionData from "../../abstract/sectionData";
import { SectionType } from "../../consts/sectionType";

export default interface PresentationSectionData extends ISectionData {
	variant: SectionType.Presentation;
	googleSlideId: string;
	slideStartIndex: number;
	options: PresentationSectionOptions;
}
