import { OutputLineType } from "components/ide/types";
import * as styles from "./styles";

export function getLineStyle(lineType: OutputLineType): object {
	if (lineType === "output") {
		return styles.outputLine;
	}
	if (lineType === "input") {
		return styles.inputLine;
	}
	return styles.errorLine;
}
