import ISectionData from "../../abstract/sectionData";
import { SectionType } from "../../consts/sectionType";

export default interface QuizSectionData extends ISectionData {
	variant: SectionType.Quiz;
	title: string;
	description: string;
	questionIds: string[];
	isTest: boolean;
}
