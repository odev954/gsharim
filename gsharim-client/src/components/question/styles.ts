import { questionnaireItemContainer } from "components/questionnaire/styles";

export const questionNumber = {
	fontSize: "0.875rem",
	color: "text.secondary",
};
export const questionTitle = {
	unicodeBidi: "plaintext",
	fontSize: "large",
	fontWeight: "bold",
	fontFamily: "rubik",
	maxWidth: "inherit",
	minWidth: "fit-content",
};
export const questionDescription = {
	unicodeBidi: "plaintext",
	fontSize: "medium",
	fontFamily: "rubik",
	paddingBottom: "8px",
	whiteSpace: "pre-wrap",
	maxWidth: "inherit",
	minWidth: "fit-content",
};
export const buttonLayer = {
	display: "flex",
	flexDirection: "row-reverse",
	justifyContent: "space-between",
	marginTop: "16px",
};

export const loaderContainer = [
	questionnaireItemContainer,
	{ justifyContent: "center" },
];
