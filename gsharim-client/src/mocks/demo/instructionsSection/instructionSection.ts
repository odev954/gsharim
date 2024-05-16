import { SectionType, InstructionsSectionData } from "@eco8200/data-models";

export const instructionsSectionMock = (): InstructionsSectionData => {
	return {
		id: "0",
		variant: SectionType.Instructions,
		title: "יצירת קלידים",
		description: `האפליקציה שלנו תכלול 8 קלידים: החל מתו דו נמוך ועד לדו גבוה. את הקלידים של מכונת המוסיקה 
        ניצור בעזרת כפתורים (Buttons) ונשכפל זה לצד זה.`,
	};
};
