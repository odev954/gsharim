import { SystemStyleObject } from "@mui/system";

export const title: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "28px",
	fontWeight: 600,
	color: "secondary.300",
};
export const text: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "16px",
	fontWeight: 500,
	color: "black",
	whiteSpace: "pre-line",
	marginTop: "10px",
};
export const paragraph: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	padding: "2rem",
	margin: "0 80px 0 80px",
};
export const mobileParagraph: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	padding: "2rem",
	margin: "0 16px",
};
export const reversedLine: SystemStyleObject = {
	display: "flex",
	flexDirection: "row-reverse",
	alignItems: "center",
	justifyContent: "flex-end",
};
export const mobileLine: SystemStyleObject = {
	display: "flex",
	flexDirection: "column-reverse",
	alignItems: "center",
	justifyContent: "flex-end",
};
export const line: SystemStyleObject = {
	display: "flex",
	alignItems: "center",
	flexDirection: "row",
};
