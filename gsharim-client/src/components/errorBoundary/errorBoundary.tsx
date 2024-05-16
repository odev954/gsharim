import { ErrorBoundary } from "react-error-boundary";
import { useCallback } from "react";
import { useLogger } from "hooks/logger";
import { DefaultFallback } from "components/errorComponents";
import { useTranslation } from "react-i18next";
import { ErrorBoundaryProps } from "./types";

export default function ErrorBoundaryComponent({
	errorTextKey,
	errorTextTitleKey,
	FallbackComponent = DefaultFallback,
	children,
}: ErrorBoundaryProps): JSX.Element {
	const logger = useLogger();
	const { t: translate } = useTranslation();
	const errorText = translate(errorTextKey);
	const errorTextTitle = translate(errorTextTitleKey);
	const logOnError = useCallback(
		(error: Error) => {
			logger.error("user-received-error", `${errorTextTitle}-${errorText}`, {
				error,
			});
		},
		[logger, errorText, errorTextTitle]
	);
	return (
		<ErrorBoundary
			fallback={
				<FallbackComponent
					errorTextKey={errorText}
					errorTextTitleKey={errorTextTitle}
				/>
			}
			onError={logOnError}
		>
			{children}
		</ErrorBoundary>
	);
}
