import { Box } from "@mui/material";
import { useHover } from "usehooks-ts";
import { useRef, useEffect } from "react";
import { useLogger } from "hooks/logger";
import { useTranslation } from "react-i18next";
import { authorityAlt } from "./strings";
import * as styles from "./styles";

interface AuthorityProps {
	authorityImage: string;
	itemRef?: React.Ref<Element>;
}

export function Authority({
	authorityImage,
	itemRef,
}: AuthorityProps): JSX.Element {
	const { t: translate } = useTranslation();
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);
	const logger = useLogger();

	useEffect(() => {
		if (isHover) logger.info("authority-hovered", "user hover authority");
	}, [isHover, logger]);
	return (
		<Box sx={styles.authorityContainer} ref={itemRef}>
			<Box
				component="img"
				alt={translate(authorityAlt)}
				src={authorityImage}
				sx={styles.authority}
				ref={hoverRef}
			/>
		</Box>
	);
}
