import { SystemStyleObject } from "@mui/system";

export const wrapper: SystemStyleObject = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const linkTitle: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "12px",
	fontWeight: 500,
	color: "blue.main",
};

export const simpleTitle: SystemStyleObject = {
	fontFamily: "Rubik",
	fontSize: "12px",
	fontWeight: 500,
	color: "black.main",
};

export const breadcrumbs: SystemStyleObject = {
	color: "text.disabled",
	fontSize: "12px",
	"& .MuiBreadcrumbs-separator": {
		marginLeft: "1px",
		marginRight: "3px",
	},
};
