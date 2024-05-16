import { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import UnityDisplay from "components/unityDisplay";
import GameDataDisplayBar from "components/gameDataDisplayBar";
import GamePopupModalDisplay from "components/gamePopupModalDisplay";
import DeadSnakeLogo from "assets/snake/deadSnake.svg";
import * as styles from "./styles";
import { UnityTabIndex } from "./consts";
import { submitButtonText } from "./strings";

type SnakeGameSectionComponentProps = {
	unityProvider: UnityProvider;
	snakeLength: number;
	isAlive: boolean;
	resetGame: () => void;
	deathMessage: string[];
	isUnityLoaded: boolean;
	unload: () => Promise<void>;
	loadingProgression: number;
};

export default function SnakeGameSectionComponent({
	unityProvider,
	snakeLength,
	isAlive,
	resetGame,
	deathMessage,
	isUnityLoaded,
	unload,
	loadingProgression,
}: SnakeGameSectionComponentProps): JSX.Element {
	const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>();
	const [displayModal, setDisplayModal] = useState(false);
	useEffect(() => {
		if (canvasRef && isUnityLoaded) {
			canvasRef.focus();
		}
	}, [canvasRef, isUnityLoaded]);

	const popupSubmit = useCallback(() => {
		setDisplayModal(false);
		resetGame();
		canvasRef?.focus();
	}, [resetGame, canvasRef]);

	useEffect(() => {
		if (!isAlive) {
			setDisplayModal(true);
		}
	}, [isAlive]);

	return (
		<Box sx={styles.container}>
			{isUnityLoaded && (
				<GameDataDisplayBar score={snakeLength - 1} gameRunning={isAlive} />
			)}
			{displayModal && (
				<GamePopupModalDisplay
					popupAsset={DeadSnakeLogo}
					submitButtonText={submitButtonText}
					onSubmit={popupSubmit}
				>
					<Typography>{deathMessage}</Typography>
				</GamePopupModalDisplay>
			)}
			<UnityDisplay
				unityProvider={unityProvider}
				style={styles.unityStyles}
				tabIndex={UnityTabIndex}
				isUnityLoaded={isUnityLoaded}
				canvasRef={setCanvasRef}
				loadingProgression={loadingProgression}
				unload={unload}
			/>
		</Box>
	);
}
