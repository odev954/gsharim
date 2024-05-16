import Ide, { IdeProps } from "components/ide";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import { Box } from "@mui/material";
import Confetti from "react-confetti";
import UnityDisplay from "components/unityDisplay";
import { unityStyle, container } from "./styles";

interface MazeGameSectionComponentProps extends IdeProps {
	unityProvider: UnityProvider;
	didWin: boolean;
	containerRef: (node: HTMLDivElement | null) => void;
	canvasSize: { width: number; height: number };
	isUnityLoaded: boolean;
	unload: () => Promise<void>;
	loadingProgression: number;
}

export default function MazeGameSectionComponent({
	api,
	unityProvider,
	didWin,
	editable,
	defaultCode,
	containerRef,
	canvasSize,
	isUnityLoaded,
	unload,
	loadingProgression,
	autoAwait,
	maxOutputSize,
	verboseDelay,
	autoRun,
	pythonPrefix,
	pythonSuffix,
}: MazeGameSectionComponentProps): JSX.Element {
	return (
		<Box ref={containerRef} sx={container}>
			{didWin && (
				<Confetti height={canvasSize.height} width={canvasSize.width} />
			)}
			<UnityDisplay
				unityProvider={unityProvider}
				style={unityStyle}
				isUnityLoaded={isUnityLoaded}
				unload={unload}
				loadingProgression={loadingProgression}
			/>
			<Ide
				defaultCode={defaultCode}
				api={api}
				editable={editable}
				autoAwait={autoAwait}
				maxOutputSize={maxOutputSize}
				verboseDelay={verboseDelay}
				autoRun={autoRun}
				pythonPrefix={pythonPrefix}
				pythonSuffix={pythonSuffix}
			/>
		</Box>
	);
}
