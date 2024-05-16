import { SystemStyleObject } from "@mui/system";
import * as styles from "./styles";
import { WelcomePageProps } from "./types";

type ContentContainerByLayoutType = {
	[key in WelcomePageProps["layoutType"]]: SystemStyleObject;
};

export const contentContainerByLayoutType: ContentContainerByLayoutType = {
	primaryLayout: styles.primaryLayoutTitlesContainer,
	secondaryLayout: styles.secondaryLayoutTitlesContainer,
};
