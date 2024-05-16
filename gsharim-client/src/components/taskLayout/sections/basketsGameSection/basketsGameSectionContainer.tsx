import { useState, useCallback, useEffect, useMemo } from "react";
import { UnityEvent } from "hooks/unity";
import { BasketsGameSectionData } from "@eco8200/data-models";
import { random } from "lodash-es";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import { TextItem } from "./types";
import {
	InitialNextLabel,
	InitialScore,
	MissedObjectEventName,
	EatObjectEventName,
	StartGameDelay,
	SproutItemEventName,
	SproutItemDelay,
	PopupColorWheel,
	DefaultIncreaseSpeedEvery,
	DefaultIncreaseSpeedBy,
} from "./consts";
import BasketsGameSectionComponent from "./basketsGameSectionComponent";
import { useBaskets } from "./hooks";

export default function BasketsGameSectionContainer({
	textItems,
	labels,
	deathMessage,
	sproutSpeed,
	playerSpeed,
	dropSpeed,
	fontSize,
	initialNumberOfLives,
	increaseSpeedEvery = DefaultIncreaseSpeedEvery,
	increaseSpeedBy = DefaultIncreaseSpeedBy,
	id,
	targetScore,
}: BasketsGameSectionData): JSX.Element {
	const [currentSproutSpeed, setCurrentSproutSpeed] = useState(sproutSpeed);
	const [lives, setLives] = useState<number>(initialNumberOfLives);
	const [score, setScore] = useState(InitialScore);
	const [sproutedItems, setSproutedItems] = useState(0);
	const [nextLabel, setNextLabel] = useState(InitialNextLabel);
	const [doneSetup, setDoneSetup] = useState(false);
	const [popupTextColor, setPopupTextColor] = useState("");
	const [popupBackgroundColor, setPopupBackgroundColor] = useState("");
	const [showInstructions, setShowInstructions] = useState(true);
	const isAlive = useMemo(() => lives > 0, [lives]);
	const { approveSection } = useSetSectionBlocking(id);

	const instructionsSubmit = useCallback(() => {
		setShowInstructions(false);
	}, []);

	const updateNextLabel = useCallback(() => {
		const index = random(0, labels.length - 1);
		const randomItem = labels[index];
		const { textColor, backgroundColor } =
			PopupColorWheel[index % PopupColorWheel.length];
		setPopupTextColor(textColor);
		setPopupBackgroundColor(backgroundColor);
		setNextLabel(randomItem);
	}, [labels]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(updateNextLabel, []);

	const decreaseLife = useCallback(() => {
		if (lives > 0) {
			setLives((current) => current - 1);
		}
	}, [lives]);

	const onObjectEat = useCallback(
		(object: TextItem) => {
			if (object.label === nextLabel) {
				setScore((current) => current + 1);
				updateNextLabel();
			} else {
				decreaseLife();
			}
		},
		[updateNextLabel, nextLabel, decreaseLife]
	);

	const onObjectMiss = useCallback(
		(object: TextItem) => {
			if (object.label === nextLabel) {
				decreaseLife();
			}
		},
		[decreaseLife, nextLabel]
	);

	const onUnityEvent = useCallback(
		(event: UnityEvent) => {
			const textItem: TextItem = JSON.parse(event.data);
			if (event.eventName === SproutItemEventName) {
				setSproutedItems((current) => current + 1);
			} else if (event.eventName === EatObjectEventName) {
				onObjectEat(textItem);
			} else if (event.eventName === MissedObjectEventName) {
				onObjectMiss(textItem);
			}
		},
		[onObjectEat, onObjectMiss]
	);
	const {
		setSproutSpeed,
		setGravityScale,
		setFontSize,
		setTextList,
		setPlayerSpeed,
		resetGame,
		sproutItem,
		unload,
		isUnityLoaded,
		unityProvider,
		loadingProgression,
	} = useBaskets({
		textItems,
		sproutSpeed,
		playerSpeed,
		dropSpeed,
		fontSize,
		onUnityEvent,
	});

	const reset = useCallback(async () => {
		await resetGame();
		setScore(InitialScore);
		setLives(initialNumberOfLives);
		setTimeout(setSproutSpeed, StartGameDelay);
		setCurrentSproutSpeed(sproutSpeed);
	}, [initialNumberOfLives, resetGame, setSproutSpeed, sproutSpeed]);

	const setup = useCallback(async () => {
		await setFontSize();
		await setTextList();
		await setPlayerSpeed();
		await setGravityScale();
		await setSproutSpeed();
		setDoneSetup(true);
	}, [
		setFontSize,
		setGravityScale,
		setPlayerSpeed,
		setSproutSpeed,
		setTextList,
	]);
	useEffect(() => {
		setTimeout(() => {
			if (isUnityLoaded) {
				setup();
			}
		}, StartGameDelay);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUnityLoaded]);

	useEffect(() => {
		if (isAlive && !showInstructions) {
			setTimeout(sproutItem, SproutItemDelay);
		} else if (!isAlive) {
			resetGame();
		}
	}, [sproutItem, sproutedItems, isAlive, resetGame, showInstructions]);

	useEffect(() => {
		if (score % increaseSpeedEvery === increaseSpeedEvery - 1) {
			setCurrentSproutSpeed((current) => current + increaseSpeedBy);
		}
	}, [increaseSpeedBy, increaseSpeedEvery, score]);

	useEffect(() => {
		setSproutSpeed(currentSproutSpeed);
	}, [currentSproutSpeed, setSproutSpeed]);
	const effectiveDoneSetup = useMemo(
		() => doneSetup && !showInstructions,
		[doneSetup, showInstructions]
	);
	const effectiveShowInstructions = useMemo(
		() => showInstructions && isUnityLoaded,
		[isUnityLoaded, showInstructions]
	);

	useEffect(() => {
		if (score >= targetScore) {
			approveSection();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [score, targetScore]);
	return (
		<BasketsGameSectionComponent
			isUnityLoaded={isUnityLoaded}
			unityProvider={unityProvider}
			lives={lives}
			score={score}
			label={nextLabel}
			deathMessage={deathMessage}
			doneSetup={effectiveDoneSetup}
			loadingProgression={loadingProgression}
			reset={reset}
			unload={unload}
			popupTextColor={popupTextColor}
			popupBackgroundColor={popupBackgroundColor}
			showInstructions={effectiveShowInstructions}
			instructionsOnSubmit={instructionsSubmit}
		/>
	);
}
