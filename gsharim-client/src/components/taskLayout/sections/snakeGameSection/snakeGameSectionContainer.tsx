import { useState, useCallback, useEffect } from "react";
import useUnity, { UnityEvent } from "hooks/unity";
import { SnakeGameSectionData } from "@eco8200/data-models";
import { sample, uniqueId } from "lodash-es";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import { createSetupMessage, getPopupText } from "./utils";
import {
	GameUrl,
	GameName,
	EatFoodEventName,
	OutOfBoundsEventName,
	SelfInteractionEventName,
	SpawnFoodFunctionName,
	AddFoodTextureFunctionName,
	ResetFunctionName,
	StopFunctionName,
	SetupFunctionName,
	SpawnPopupFunctionName,
	InitialSnakeLength,
} from "./consts";

import SnakeGameSectionComponent from "./snakeGameSectionComponent";

export type Position = [number, number];

export type SnakeSetupMessage = {
	width: number;
	intialPosition: Position;
	autoMove: boolean;
};

export default function SnakeGameSectionContainer({
	boardWidth,
	pauseOnEat,
	deathMessage,
	foodItems,
	id,
	targetScore,
}: SnakeGameSectionData): JSX.Element {
	const [gameLoaded, setGameLoaded] = useState(false);
	const [isFoodPresent, setIsFoodPresent] = useState(false);
	const [isAlive, setIsAlive] = useState(true);
	const [snakeLength, setSnakeLength] = useState(InitialSnakeLength);
	const [lastPopupText, setLastPopupText] = useState<{
		id: string;
		text: string | null;
	}>({ id: "0", text: null });
	const { approveSection } = useSetSectionBlocking(id);
	useEffect(() => {
		if (snakeLength - 1 >= targetScore) {
			approveSection();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [snakeLength, targetScore]);
	const onUnityEvent = useCallback(
		(event: UnityEvent) => {
			if (event.eventName === EatFoodEventName) {
				const foodName = event.data;
				const popupText = getPopupText(foodName, foodItems);
				const popupId = uniqueId();
				setLastPopupText({ id: popupId, text: popupText });
				setIsFoodPresent(false);
				setSnakeLength((current) => current + 1);
			} else if (
				event.eventName === OutOfBoundsEventName ||
				event.eventName === SelfInteractionEventName
			) {
				setIsAlive(false);
			}
		},
		[foodItems]
	);

	const {
		unityProvider,
		callUnityFunction,
		isUnityLoaded,
		loadingProgression,
		unload,
	} = useUnity(GameUrl, GameName, onUnityEvent);

	const addFoodTexture = useCallback(
		async (name: string, url: string) => {
			await callUnityFunction(AddFoodTextureFunctionName, [name, url]);
		},
		[callUnityFunction]
	);

	const spawnPopup = useCallback(
		(text: string) => {
			callUnityFunction(SpawnPopupFunctionName, [text]);
		},
		[callUnityFunction]
	);

	const spawnFood = useCallback(() => {
		const foodName = sample(foodItems)?.name || "";
		setIsFoodPresent(true);
		callUnityFunction(SpawnFoodFunctionName, [foodName]);
	}, [callUnityFunction, foodItems]);

	const reset = useCallback(() => {
		callUnityFunction(ResetFunctionName);
		setSnakeLength(InitialSnakeLength);
		setIsAlive(true);
	}, [callUnityFunction]);

	const pause = useCallback(() => {
		callUnityFunction(StopFunctionName);
	}, [callUnityFunction]);

	useEffect(() => {
		const shouldPause =
			isAlive && snakeLength > InitialSnakeLength && pauseOnEat;
		if (shouldPause) {
			pause();
		}
	}, [pauseOnEat, pause, isAlive, snakeLength]);

	useEffect(() => {
		if (!isFoodPresent && gameLoaded) {
			spawnFood();
		}
	}, [spawnFood, gameLoaded, isFoodPresent]);

	const sendSetupMessage = useCallback(async () => {
		const setupMessage: SnakeSetupMessage = createSetupMessage(boardWidth);
		callUnityFunction(SetupFunctionName, [JSON.stringify(setupMessage)]);
		const addTexturesPromises = foodItems.map((foodItem) => {
			return addFoodTexture(foodItem.name, foodItem.url);
		});
		await Promise.all(addTexturesPromises);
	}, [boardWidth, callUnityFunction, foodItems, addFoodTexture]);

	useEffect(() => {
		async function setup(): Promise<void> {
			if (isUnityLoaded && !gameLoaded) {
				await sendSetupMessage();
				setGameLoaded(true);
			}
		}
		setup();
	}, [isUnityLoaded, gameLoaded, sendSetupMessage]);

	useEffect(() => {
		if (lastPopupText.text !== null) {
			spawnPopup(lastPopupText.text);
		}
	}, [spawnPopup, lastPopupText]);

	return (
		<SnakeGameSectionComponent
			unityProvider={unityProvider}
			snakeLength={snakeLength}
			isAlive={isAlive}
			resetGame={reset}
			deathMessage={deathMessage}
			isUnityLoaded={isUnityLoaded && gameLoaded}
			unload={unload}
			loadingProgression={loadingProgression}
		/>
	);
}
