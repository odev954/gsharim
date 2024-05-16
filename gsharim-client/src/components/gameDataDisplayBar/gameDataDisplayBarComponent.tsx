import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import DefaultLivesAsset from "assets/gameDataDisplay/heart.svg";
import Text from "components/text";
import * as styles from "./styles";
import { formatSeconds } from "./utils";
import { useVisability } from "./hooks";
import { clockText, scoreText } from "./strings";
import { LivesAsset } from "./types";
import { DefaultColor, DefaultFontSize } from "./consts";

type GameDataDisplayBarComponentProps = {
	secondsPassed: number;
	score?: number;
	headerText?: string;
	lives?: number;
	livesAsset?: LivesAsset;
	fontSize?: number;
	color?: string;
};
export default function GameDataDisplayBarComponent({
	secondsPassed,
	score,
	headerText,
	lives,
	livesAsset,
	fontSize = DefaultFontSize,
	color = DefaultColor,
}: GameDataDisplayBarComponentProps): JSX.Element {
	const currentTime = formatSeconds(secondsPassed);
	const scoreContainerVisability = useVisability(score);
	const headerTextVisability = useVisability(headerText);
	const rightSideTextVisability = useVisability(lives);
	const effectiveLivesAsset = useMemo(
		() => (livesAsset !== undefined ? livesAsset.asset : DefaultLivesAsset),
		[livesAsset]
	);
	const livesAssetWidthHeight = useMemo(() => {
		if (livesAsset !== undefined) {
			return {
				width: livesAsset.width,
				height: livesAsset.height,
			};
		}
		return null;
	}, [livesAsset]);
	const effectiveFontSize = `${fontSize.toString()}px`;
	return (
		<>
			<Box sx={[styles.container, { color }]}>
				<Box
					sx={[
						styles.rightSide,
						{
							visibility: rightSideTextVisability,
							fontSize: effectiveFontSize,
						},
					]}
				>
					{`X ${lives}`}
					<Box
						component="img"
						src={effectiveLivesAsset}
						sx={[styles.livesImage, livesAssetWidthHeight]}
					/>
				</Box>

				<Box sx={styles.leftSide}>
					<Box
						sx={[
							styles.scoreContainer,
							{ visibility: scoreContainerVisability },
						]}
					>
						<Typography
							sx={[styles.scoreText, { fontSize: effectiveFontSize }]}
						>
							<Text textToTranslate={scoreText} />
						</Typography>
						<Typography
							sx={[styles.scoreNumbers, { fontSize: effectiveFontSize }]}
						>
							{score}
						</Typography>
					</Box>
					<Box sx={styles.clockContainer}>
						<Typography
							sx={[styles.clockText, { fontSize: effectiveFontSize }]}
						>
							<Text textToTranslate={clockText} />
						</Typography>
						<Typography
							sx={[styles.clockNumbers, { fontSize: effectiveFontSize }]}
						>
							{currentTime}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box
				sx={[
					styles.middlePart,
					{ visibility: headerTextVisability },
					{ color },
				]}
			>
				<Typography
					sx={[styles.middlePartText, { fontSize: effectiveFontSize }]}
				>
					{headerText}
				</Typography>
			</Box>
		</>
	);
}
