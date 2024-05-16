import { PropsWithChildren } from "react";

export type FallbackComponent = {
	FallbackComponent?: React.FC<FallbackComponentProps>;
};

export interface FallbackComponentProps {
	errorTextTitleKey: string;
	errorTextKey: string;
}

export type ErrorBoundaryProps = PropsWithChildren<
	FallbackComponentProps & FallbackComponent
>;
