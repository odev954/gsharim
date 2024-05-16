import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogger } from "hooks/logger";
import { useCallback } from "react";
import Text from "components/text";
import * as styles from "./styles";
import { LinkInformation } from "./types";

type LinkListProps = {
	LinksInfo: LinkInformation[];
};

export default function LinkList({ LinksInfo }: LinkListProps): JSX.Element {
	const logger = useLogger();
	const log = useCallback(
		(linkName: string) => {
			logger.info(
				"footer-link-clicked",
				`${linkName} footer button was clicked`,
				{
					linkName,
				}
			);
		},
		[logger]
	);
	return (
		<Box sx={styles.container}>
			{LinksInfo.map((linkInfo, i) => {
				return (
					<Box sx={styles.dotContainer} key={linkInfo.linkName}>
						<Box
							sx={styles.link}
							component={Link}
							to={linkInfo.linkUrl}
							onClick={() => log(linkInfo.linkName)}
						>
							<Text textToTranslate={linkInfo.linkName} />
						</Box>
						{i !== LinksInfo.length - 1 && <Box sx={styles.dot} />}
					</Box>
				);
			})}
		</Box>
	);
}
