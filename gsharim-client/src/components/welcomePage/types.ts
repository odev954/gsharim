export interface BaseWelcomePageProps {
	buttonText: string;
	mainTitle: string;
	subTitle: string;
	background: string;
	onClick?: () => void;
	subSubtitle: string;
}

export interface SecondaryLayoutProps extends BaseWelcomePageProps {
	layoutType: "secondaryLayout";
	bannerDisplayNumber: number;
}

export interface PrimaryLayoutProps extends BaseWelcomePageProps {
	layoutType: "primaryLayout";
	bannerDisplayNumber?: never;
}
export type WelcomePageProps = SecondaryLayoutProps | PrimaryLayoutProps;
