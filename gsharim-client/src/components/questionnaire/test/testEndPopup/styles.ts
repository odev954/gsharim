import { questionnaireItemContainer } from "components/questionnaire/styles";

export const bold = { fontWeight: "bold" };

export const modal = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const popupContainer = {
	...questionnaireItemContainer,
	height: "330px",
	width: "540px",
	minHeight: "unset",
};
