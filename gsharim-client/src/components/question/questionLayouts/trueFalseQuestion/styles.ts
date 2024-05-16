import { Theme, alpha } from "@mui/material";

export const answerArea = {
	display: "flex",
	justifyContent: "space-evenly",
	width: "100%",
	flexWrap: "wrap",
	height: "fit-content",
};
export const selectedAnswer = {
	border: 2,
	borderColor: "secondary.main",
};
export const correctAnswerOutline = {
	border: 2,
	borderColor: "success.main",
	backgroundColor: (theme: Theme) => alpha(theme.palette.success.main, 0.1),
};
export const incorrectAnswerOutline = {
	border: 2,
	borderColor: "error.main",
	backgroundColor: (theme: Theme) => alpha(theme.palette.error.main, 0.05),
};
