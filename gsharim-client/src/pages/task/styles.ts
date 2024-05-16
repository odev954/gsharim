import { SystemStyleObject } from "@mui/system";

export const taskContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	height: "100vh",
};

export const taskFooterContainer: SystemStyleObject = {
	flexGrow: "1%",
};

export const titleContainer: SystemStyleObject = {
	alignSelf: "flex-start",
	display: "flex",
	flexDirection: "column",
	marginTop: "-7px",
	marginBottom: "5px",
	alignItems: "flex-start",
};

export const taskHeaderContainer: SystemStyleObject = {
	display: "flex",
	padding: "0 30px",
	marginTop: "-7px",
	width: "100%",
	marginBottom: "5px",
	justifyContent: "space-between",
};

export const taskTitle: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "18px",
	fontWeight: 1000,
	color: "black.main",
	marginBottom: "2px",
};

export const progressBarContainer: SystemStyleObject = {
	display: "flex",
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	marginTop: "-30px",
};
