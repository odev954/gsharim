import ContentCreatorInfo from "../../users/contentCreatorInfo";
import { DifficultyLevel } from "./difficultyLevel";
import { RibbonType } from "./ribbonType";
import Tag from "./tag";

export default interface Course {
	id: string;
	name: string;
	description: string;
	creator: ContentCreatorInfo;
	progress?: number;
	ribbon?: RibbonType;
	skillSet: string[];
	tags: Tag[];
	difficulty: DifficultyLevel;
	duration: number;
	registrations: number;
	created: Date;
	updated: Date;
	thumbnailUrl: string;
	hasCertificate: boolean;
}
