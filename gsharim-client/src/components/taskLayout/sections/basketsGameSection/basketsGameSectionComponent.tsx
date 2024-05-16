import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import { GameDisplayUnityWrapper } from "components/gameDataDisplayBar";
import GamePopupModalDisplay from "components/gamePopupModalDisplay";
import DeadBasket from "assets/baskets/deadBasket.svg";
import { useKeyPress } from "@react-typed-hooks/use-key-press";
import { uniq } from "lodash-es";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import { labelHeader, submitButtonText } from "./strings";
import {
	UnityTabIndex,
	BasketsAspectRatio,
	PopupDisplayTimeout,
	EscapeKeyName,
} from "./consts";
import LabelChangePopup from "./labelChangePopup";
import { GameDataDisplayColor } from "./styles";
import WelcomeMessage from "./welcomeMessage";

type BasketsGameSectionComponentProps = {
	isUnityLoaded: boolean;
	unityProvider: UnityProvider;
	lives: number;
	score: number;
	label: string;
	deathMessage: string[];
	doneSetup: boolean;
	loadingProgression: number;
	popupTextColor: string;
	popupBackgroundColor: string;
	unload: () => Promise<void>;
	reset: () => Promise<void>;
	showInstructions: boolean;
	instructionsOnSubmit: VoidFunction;
};

export default function BasketsGameSectionComponent({
	isUnityLoaded,
	unityProvider,
	lives,
	score,
	label,
	deathMessage,
	doneSetup,
	loadingProgression,
	popupTextColor,
	popupBackgroundColor,
	unload,
	reset,
	showInstructions,
	instructionsOnSubmit,
}: BasketsGameSectionComponentProps): JSX.Element {
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const isEscapePressed = useKeyPress({ targetKey: EscapeKeyName });
	const { t: translate } = useTranslation();
	useEffect(() => {
		if (doneSetup) {
			canvas?.focus();
		}
	}, [doneSetup, canvas]);
	const [showPopup, setShowPopup] = useState(false);
	const gameRunning = useMemo(() => lives > 0, [lives]);
	const isDead = useMemo(() => !gameRunning, [gameRunning]);
	const headerText = useMemo(
		() => `${translate(labelHeader)} - ${label}`,
		[label, translate]
	);
	const effectiveTabIndex = useMemo(
		() => (gameRunning ? UnityTabIndex : undefined),
		[gameRunning]
	);

	useEffect(() => {
		if (isUnityLoaded && !showInstructions) {
			setShowPopup(true);
			const timeout = setTimeout(() => {
				setShowPopup(false);
			}, PopupDisplayTimeout);
			return () => {
				clearTimeout(timeout);
			};
		}
		return () => null;
	}, [label, isUnityLoaded, showInstructions]);

	useEffect(() => {
		if (isEscapePressed) {
			reset();
		}
	}, [isEscapePressed, reset]);
	useEffect(() => {
		if (doneSetup) {
			canvas?.focus();
		}
	}, [doneSetup, showPopup, canvas, showInstructions, lives]);
	return (
		<Box sx={styles.container}>
			<GameDisplayUnityWrapper
				gameRunning={gameRunning}
				headerText={headerText}
				unload={unload}
				loadingProgression={loadingProgression}
				setCanvasRef={setCanvas}
				score={score}
				unityProvider={unityProvider}
				isUnityLoaded={isUnityLoaded}
				doneSetup={doneSetup}
				UnityTabIndex={effectiveTabIndex}
				aspectRatio={BasketsAspectRatio}
				lives={lives}
				gameDataDisplayColor={GameDataDisplayColor}
			/>
			{isDead && (
				<GamePopupModalDisplay
					onSubmit={reset}
					submitButtonText={submitButtonText}
					popupAsset={DeadBasket}
				>
					<Box>
						{uniq(deathMessage).map((line) => {
							return <Typography key={line}>{line}</Typography>;
						})}
					</Box>
				</GamePopupModalDisplay>
			)}
			{showInstructions && (
				<WelcomeMessage instructionsOnSubmit={instructionsOnSubmit} />
			)}
			<LabelChangePopup
				showPopup={showPopup}
				text={label}
				textColor={popupTextColor}
				backgroundColor={popupBackgroundColor}
			/>
		</Box>
	);
}
