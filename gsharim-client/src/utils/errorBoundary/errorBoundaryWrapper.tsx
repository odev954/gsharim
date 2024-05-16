import React from "react";
import ErrorBoundary from "components/errorBoundary";
import { FallbackComponentProps } from "components/errorBoundary/types";

export function errorBoundaryWrapper<T extends object>(
	Component: React.FC<T>,
	fallbackComponentProps: FallbackComponentProps,
	FallbackComponent?: React.FC<FallbackComponentProps>
): React.FC<T> {
	return function wrappedComponent(componentProps: T) {
		return (
			<ErrorBoundary
				FallbackComponent={FallbackComponent}
				{...fallbackComponentProps}
			>
				<Component {...componentProps} />
			</ErrorBoundary>
		);
	};
}
