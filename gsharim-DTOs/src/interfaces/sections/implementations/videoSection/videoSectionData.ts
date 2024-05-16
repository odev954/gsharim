import ISectionData from "../../abstract/sectionData";
import { SectionType } from "../../consts/sectionType";
import Video from "./video";

export default interface VideoSectionData extends ISectionData {
	variant: SectionType.Video;
	video: Video;
}
