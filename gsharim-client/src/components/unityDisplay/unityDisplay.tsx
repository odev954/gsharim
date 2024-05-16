import { CSSProperties, useEffect } from "react";
import { Box, Fade } from "@mui/material";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import { Unity } from "react-unity-webgl";
import * as styles from "./styles";
import UnityLoadingComponent from "./unityLoadingComponent";

type UnityDisplayProps = {
	unityProvider: UnityProvider;
	style: CSSProperties;
	tabIndex?: number;
	isUnityLoaded: boolean;
	unload: () => Promise<void>;
	loadingProgression: number;
	canvasRef?: (canvas: HTMLCanvasElement) => void;
};

export default function UnityDisplay({
	unityProvider,
	style,
	tabIndex = undefined,
	isUnityLoaded,
	unload,
	loadingProgression,
	canvasRef,
}: UnityDisplayProps): JSX.Element {
	useEffect(() => {
		return () => {
			unload();
		};
	}, [unload]);
	return (
		<Box sx={styles.container}>
			<Unity
				unityProvider={unityProvider}
				style={style}
				tabIndex={tabIndex}
				matchWebGLToCanvasSize
				ref={canvasRef}
			/>
			<Fade in={!isUnityLoaded}>
				<Box sx={styles.loadingPage}>
					<UnityLoadingComponent loadingProgression={loadingProgression} />
				</Box>
			</Fade>
		</Box>
	);
}
