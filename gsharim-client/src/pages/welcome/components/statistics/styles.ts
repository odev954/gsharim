import { SystemStyleObject } from "@mui/system";
import {
	mobileStatisticsBackground,
	statisticsBackground,
} from "assets/welcomePageImages";

export const container: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	backgroundImage: `url(${statisticsBackground})`,
	backgroundSize: "cover",
	height: "950px",
	justifyContent: "center",
	fontFamily: "Rubik",
	fontStyle: "normal",
};
export const mobileContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	backgroundImage: `url(${mobileStatisticsBackground})`,
	backgroundSize: "cover",
	justifyContent: "center",
	marginTop: "50px",
	height: "500px",
};
export const title: SystemStyleObject = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	fontWeight: 600,
	fontSize: "38px",
	color: "black.main",
};
export const dataRowContainer: SystemStyleObject = {
	marginTop: "5px",
};

export const mobileTitle: SystemStyleObject = {
	fontSize: "28px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};
export const dataRow: SystemStyleObject = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	width: "750px",
	margin: "auto",
	marginTop: "70px",
};
export const mobileDataRow: SystemStyleObject = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	margin: "auto",
	marginTop: "10px",
	padding: "10px",
	width: "70%",
};
export const dataBlock: SystemStyleObject = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	fontFamily: "Rubik",
	fontStyle: "normal",
	fontWeight: 300,
};
export const dataTitle: SystemStyleObject = {
	fontSize: "24px",
	color: "black",
};

export const mobileDataTitle: SystemStyleObject = {
	fontSize: "18px",
	color: "black",
};
export const dataValue: SystemStyleObject = {
	fontSize: "48px",
	color: "secondary.main",
};
export const mobileDataValue: SystemStyleObject = {
	fontSize: "25px",
	color: "secondary.main",
};
