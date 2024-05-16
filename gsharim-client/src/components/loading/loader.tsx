import React from "react";
import { Box } from "@mui/material";
import BooksLoader from "components/booksLoader";
import * as styles from "./styles";

interface LoaderProps {
	isPage?: boolean;
	LoaderComponent?: () => JSX.Element;
}

export function Loader({
	LoaderComponent = BooksLoader,
	isPage,
}: LoaderProps): JSX.Element {
	const loadingContainerStyles = isPage
		? styles.pageLoaderContainer
		: styles.componentLoaderContainer;
	return (
		<Box sx={loadingContainerStyles}>
			<LoaderComponent />
		</Box>
	);
}
