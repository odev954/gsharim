export type ScrollDirection = "Up" | "Down";

export type BackgroundTypes = "solid" | "wave" | "transparent";

export interface HeaderProps {
	backgroundType: BackgroundTypes;
	fixed: boolean;
	scrollDirection?: ScrollDirection;
}
