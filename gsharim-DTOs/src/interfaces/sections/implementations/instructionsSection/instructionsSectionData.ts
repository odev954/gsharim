import ISectionData from "../../abstract/sectionData";
import { SectionType } from "../../consts/sectionType";
import Video from "../videoSection/video";

export default interface InstructionsSectionData extends ISectionData {
	variant: SectionType.Instructions;
	title: string;
	description: string;
	instructionsVideo?: Video;
	helperVideos?: Video[];
}
