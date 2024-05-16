import { Box, Theme, SxProps, useTheme, useMediaQuery } from "@mui/material";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import { generateLineStyles } from "./utils";

export interface ParagraphProps extends JSX.IntrinsicAttributes {
	title: string;
	text: string;
	image: { src: string; imageAlt: string; imageSx?: SxProps<Theme> };
	isTextBeforeImage: boolean;
}

export default function Paragraph({
	title,
	text,
	image,
	isTextBeforeImage,
}: ParagraphProps): JSX.Element {
	const { t: translate } = useTranslation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const lineStyles = generateLineStyles(isTextBeforeImage, isMobile);

	return (
		<Box sx={lineStyles}>
			<Box
				component="img"
				src={image.src}
				alt={translate(image.imageAlt)}
				sx={image.imageSx}
			/>
			<Box sx={isMobile ? styles.mobileParagraph : styles.paragraph}>
				<Box sx={styles.title}>
					<Text textToTranslate={title} />
				</Box>
				<Box sx={styles.text}>
					<Text textToTranslate={text} />
				</Box>
			</Box>
		</Box>
	);
}
