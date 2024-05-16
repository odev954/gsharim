import { Box } from "@mui/material";
import UnityDisplay from "components/unityDisplay";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import Ide, { ApiDescription } from "components/ide";
import { SplitPane } from "react-collapse-pane";
import GameDataDisplayBar from "components/gameDataDisplayBar";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import { FontSize, GameTabIndex } from "./consts";

type FarmGameSectionComponentProps = {
	unityProvider: UnityProvider;
	isUnityLoaded: boolean;
	api: ApiDescription;
	loadingProgression: number;
	unload: () => Promise<void>;
	autoAwait?: boolean;
	defaultCode?: string;
	editable?: boolean;
	maxOutputSize?: number;
	verboseDelay?: number;
	autoRun?: boolean;
	pythonPrefix?: string;
	pythonSuffix?: string;
};

export default function FarmGameSectionComponent({
	unityProvider,
	isUnityLoaded,
	api,
	loadingProgression,
	unload,
	autoAwait,
	defaultCode,
	editable,
	maxOutputSize,
	verboseDelay,
	autoRun,
	pythonPrefix,
	pythonSuffix,
}: FarmGameSectionComponentProps): JSX.Element {
	const { i18n } = useTranslation();
	const dir = i18n.dir(i18n.language);
	return (
		<Box sx={styles.container}>
			<SplitPane split="vertical" dir={dir}>
				<Box sx={styles.unityContainer}>
					{isUnityLoaded && (
						<GameDataDisplayBar gameRunning fontSize={FontSize} />
					)}
					<UnityDisplay
						unityProvider={unityProvider}
						style={styles.unityStyle}
						tabIndex={GameTabIndex}
						loadingProgression={loadingProgression}
						unload={unload}
						isUnityLoaded={isUnityLoaded}
					/>
				</Box>
				<Box sx={styles.ideContainer}>
					<Ide
						api={api}
						autoAwait={autoAwait}
						defaultCode={defaultCode}
						editable={editable}
						maxOutputSize={maxOutputSize}
						verboseDelay={verboseDelay}
						hideRunningButtons={!isUnityLoaded}
						autoRun={autoRun}
						pythonPrefix={pythonPrefix}
						pythonSuffix={pythonSuffix}
					/>
				</Box>
			</SplitPane>
		</Box>
	);
}
