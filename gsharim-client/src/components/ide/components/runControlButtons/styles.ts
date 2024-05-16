import { SystemStyleObject } from "@mui/system";

const baseButtonStyle: SystemStyleObject = {
	color: "text.light",
	boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
	borderRadius: "8px",
	transition: "opacity 0.2s, background 0.5s",
};

export const container: SystemStyleObject = {
	position: "absolute",
	right: 0,
	bottom: 0,
	display: "flex",
	flexDirection: "row-reverse",
	marginRight: "16px",
	marginBottom: "17px",
};

export const loadingRunButton: SystemStyleObject = {
	...baseButtonStyle,
	backgroundColor: "success.light",
	"&:hover": {
		opacity: 0.7,
		backgroundColor: "success.light",
	},
};
export const runButton: SystemStyleObject = {
	...baseButtonStyle,
	backgroundColor: "secondary.light",
	"&:hover": {
		opacity: 0.7,
		backgroundColor: "secondary.light",
	},
};
export const stopButton: SystemStyleObject = {
	...baseButtonStyle,
	backgroundColor: "error.400",
	"&:hover": {
		opacity: 0.7,
		backgroundColor: "error.400",
	},
};
