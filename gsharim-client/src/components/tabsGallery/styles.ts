import { SxProps, Theme } from "@mui/material";

export const skeletonTabs: SxProps<Theme> = {
	width: 50,
	height: 30,
	ml: 1,
};

export const skeletonItems: SxProps<Theme> = {
	width: 250,
	height: 320,
	ml: 4,
};

export const tabsGalleryContainer: SxProps<Theme> = {
	padding: "0 4rem",
};

export const unScrollableItemsContainer: SxProps<Theme> = {
	userSelect: "none",
	padding: 0,
};
export const tab: SxProps<Theme> = {
	color: "black.main",
	fontSize: "16px",
	fontWeight: 500,
	padding: 0,
	height: "20px",
	marginBottom: "0px",
	minWidth: 0,
	marginLeft: "38px",
};
export const categoriesWrapper: SxProps<Theme> = {
	display: "flex",
	width: "1000px",
	height: "50px",
};
export const buttonsStyle: SxProps<Theme> = {
	":hover": {
		boxShadow: 1,
		color: "primary.main",
		background: "transparent",
	},
};

export const scrollableItemsContainer: SxProps<Theme> = {
	marginTop: "-50px",
	userSelect: "none",
	padding: 0,
};
