import {
	mobilePageTopBackground,
	pageTopBackground,
} from "assets/welcomePageImages";
import { SystemStyleObject } from "@mui/system";

export const pageTopWrapper: SystemStyleObject = {
	width: "100%",
	height: "68vh",
	backgroundImage: `url(${pageTopBackground})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
};
export const mobilePageTopWrapper: SystemStyleObject = {
	width: "100%",
	backgroundImage: `url(${mobilePageTopBackground})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
};
export const entranceTextContainer: SystemStyleObject = {
	marginRight: "93px",
	display: "flex",
	justifyContent: "space-between",
	height: "50vh",
	paddingLeft: "45px",
	marginTop: "65px",
};
export const mobileEntranceTextContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	width: "100%",
	minHeight: "500px",
	padding: "70px 20px",
};
export const entranceText: SystemStyleObject = {
	width: "500px",
	height: "100px",
	display: "flex",
	flexDirection: "column",
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: 600,
	fontSize: "24px",
	lineHeight: "28px",
	textAlign: "start",
	color: "text.white",
	marginTop: "auto",
	marginBottom: "auto",
};
export const mobileEntranceText: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	fontSize: "6vw",
	textAlign: "start",
	color: "text.white",
	marginTop: "20px",
	marginBottom: "20px",
	margin: "20px 20px",
};
export const computerImage: SystemStyleObject = {
	width: "40%",
	height: "85%",
	marginTop: "50px",
};
export const mobileComputerImage: SystemStyleObject = {
	width: "300px",
	maxWidth: "750px",
	marginTop: "50px",
};
