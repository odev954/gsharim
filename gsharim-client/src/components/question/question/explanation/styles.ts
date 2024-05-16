import { questionTitle } from "components/question/styles";
import { questionnaireItemContainer } from "components/questionnaire/styles";

export const popupContainer = {
	...questionnaireItemContainer,
	height: "fit-content",
	width: "fit-content",
	maxWidth: "450px",
	minHeight: "unset",
	borderRadius: "8px",
	padding: "12px",
};

export const explanationText = {
	fontSize: "small",
};

export const popover = {
	boxShadow: 1,
};

export const title = [
	questionTitle,
	{ marginTop: "-4px", color: "error.main" },
];

export const closeButton = { padding: "6px" };

export const topLayerContainer = {
	display: "flex",
	flexDirection: "row-reverse",
	justifyContent: "space-between",
};
