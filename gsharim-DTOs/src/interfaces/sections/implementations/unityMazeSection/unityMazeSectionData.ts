import ISectionData from "../../abstract/sectionData";
import { SectionType } from "../../consts/sectionType";
import IdeConfiguration from "../../abstract/ideConfiguration";

export type GameRect = {
	topLeftX: number;
	topLeftY: number;
	width: number;
	height: number;
};

export type MazeSetupMessage = {
	player: GameRect;
	playerSpeed: number;
	target: GameRect;
	terrain: GameRect[];
	worldWidth: number;
	worldHeight: number;
};

export default interface UnityMazeSectionData
	extends ISectionData,
		IdeConfiguration {
	variant: SectionType.UnityMazeSection;
	levelConfiguration: MazeSetupMessage;
}
