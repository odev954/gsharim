import { DifficultyLevel } from "@eco8200/data-models";
import { ReactComponent as EasyLevel } from "assets/courseListItem/easyLevel.svg";
import { ReactComponent as MediumLevel } from "assets/courseListItem/mediumLevel.svg";
import { ReactComponent as HardLevel } from "assets/courseListItem/hardLevel.svg";

export const difficultyLevelSvgDictionary = {
	[DifficultyLevel.Easy]: EasyLevel,
	[DifficultyLevel.Medium]: MediumLevel,
	[DifficultyLevel.Hard]: HardLevel,
};
