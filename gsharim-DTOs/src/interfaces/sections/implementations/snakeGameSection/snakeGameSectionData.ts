import ISectionData from "../../abstract/sectionData";
import { SectionType } from "../../consts/sectionType";

export const MessageTypeName = "message";
export type PopupContentMessage = {
	type: "message";
	text: string;
};
export type PopupContent = PopupContentMessage;
export default interface SnakeGameSectionData extends ISectionData {
	variant: SectionType.SnakeGameSection;
	boardWidth: number;
	pauseOnEat: boolean;
	popupOnEat: boolean;
	popupMessages: PopupContent[];
	deathMessage: string;
}
