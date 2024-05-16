import { Box } from "@mui/material";
import UnityDisplay from "components/unityDisplay";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import GameDataDisplayBar from ".";
import * as styles from "./gameDisplayUnityWrapperStyles";
import { DefaultAspectRatio } from "./consts";

type GameDisplayUnityWrapperProps = {
	isUnityLoaded: boolean;
	unityProvider: UnityProvider;
	lives?: number;
	score?: number;
	headerText?: string;
	doneSetup: boolean;
	loadingProgression: number;
	gameRunning: boolean;
	UnityTabIndex?: number;
	aspectRatio?: number;
	gameDataDisplayColor?: string;
	unload: () => Promise<void>;
	setCanvasRef?: (canvas: HTMLCanvasElement) => void;
};
export default function GameDisplayUnityWrapper({
	isUnityLoaded,
	unityProvider,
	lives,
	score,
	doneSetup,
	headerText,
	loadingProgression,
	gameRunning,
	UnityTabIndex,
	aspectRatio = DefaultAspectRatio,
	gameDataDisplayColor,
	unload,
	setCanvasRef,
}: GameDisplayUnityWrapperProps): JSX.Element {
	const unityStyle = { ...styles.unityStyle, aspectRatio };
	return (
		<Box sx={[styles.unityContainer]}>
			{doneSetup && (
				<GameDataDisplayBar
					gameRunning={gameRunning}
					lives={lives}
					score={score}
					headerText={headerText}
					color={gameDataDisplayColor}
				/>
			)}
			<UnityDisplay
				unityProvider={unityProvider}
				tabIndex={doneSetup ? UnityTabIndex : undefined}
				style={unityStyle}
				isUnityLoaded={isUnityLoaded}
				canvasRef={setCanvasRef}
				loadingProgression={loadingProgression}
				unload={unload}
			/>
		</Box>
	);
}
