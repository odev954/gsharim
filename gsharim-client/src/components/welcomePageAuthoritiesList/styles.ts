import { SystemStyleObject } from "@mui/system";

export const welcomePageAuthoritiesListContainer: SystemStyleObject = {
	width: "100%",
	height: "150px",
};
export const contentContainer: SystemStyleObject = {
	margin: "0 40px",
};
export const mobileContentContainer: SystemStyleObject = {
	margin: "0 20px",
};
export const text: SystemStyleObject = {
	width: "270px",
	color: "secondary.main",
	fontWeight: 700,
	fontSize: "28px",
	borderBottom: "2px solid",
	borderBottomColor: "secondary.main",
};
export const authorityContainer: SystemStyleObject = {
	display: "flex",
	justifyContent: "center",
	maxWidth: "220px",
	"&:hover": {
		filter: "grayscale(0%)",
	},
	filter: "grayscale(100%)",
	transition: "filter 1.5s",
};
export const galleryWrapper: SystemStyleObject = {
	marginTop: "30px",
};
export const authority: SystemStyleObject = {
	height: "60px",
};
