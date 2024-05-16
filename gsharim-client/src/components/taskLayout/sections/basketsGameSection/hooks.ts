import { useCallback } from "react";
import { TextItem } from "components/taskLayout/sections/basketsGameSection";
import useUnity, { CallUnityFunction, UnityEvent } from "hooks/unity";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import {
	GameUrl,
	GameName,
	SetSproutSpeedFunctionName,
	SetDropSpeedFunctionName,
	SetFontSizeFunctionName,
	SetTextListFunctionName,
	SetPlayerSpeedFunctionName,
	ResetFunctionName,
	SproutFunctionName,
} from "./consts";

const useUnityFunction = (
	callUnityFunction: CallUnityFunction,
	FunctionName: string,
	...params: string[]
): (() => Promise<void>) => {
	return useCallback(async () => {
		await callUnityFunction(FunctionName, params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callUnityFunction, FunctionName, ...params]);
};

type GameFunction = () => Promise<void>;
type UseBasketsProps = {
	textItems: TextItem[];
	sproutSpeed: number;
	playerSpeed: number;
	dropSpeed: number;
	fontSize: number;
	onUnityEvent: (event: UnityEvent) => void;
};

type SetSproutSpeed = (speed?: number) => Promise<void>;
type UseBasketsReturnType = {
	setSproutSpeed: SetSproutSpeed;
	setGravityScale: GameFunction;
	setFontSize: GameFunction;
	setTextList: GameFunction;
	setPlayerSpeed: GameFunction;
	resetGame: GameFunction;
	sproutItem: GameFunction;
	unload: GameFunction;
	isUnityLoaded: boolean;
	unityProvider: UnityProvider;
	loadingProgression: number;
};
export function useBaskets({
	textItems,
	sproutSpeed,
	playerSpeed,
	dropSpeed,
	fontSize,
	onUnityEvent,
}: UseBasketsProps): UseBasketsReturnType {
	const {
		unityProvider,
		callUnityFunction,
		isUnityLoaded,
		loadingProgression,
		unload,
	} = useUnity(GameUrl, GameName, onUnityEvent);

	const setSproutSpeed = useCallback(
		async (speed = sproutSpeed) => {
			await callUnityFunction(SetSproutSpeedFunctionName, [speed.toString()]);
		},
		[sproutSpeed, callUnityFunction]
	);

	const setGravityScale = useUnityFunction(
		callUnityFunction,
		SetDropSpeedFunctionName,
		dropSpeed.toString()
	);

	const setFontSize = useUnityFunction(
		callUnityFunction,
		SetFontSizeFunctionName,
		fontSize.toString()
	);

	const setTextList = useCallback(async () => {
		const sproutTextList = {
			textList: textItems,
		};
		await callUnityFunction(SetTextListFunctionName, [
			JSON.stringify(sproutTextList),
		]);
	}, [callUnityFunction, textItems]);

	const setPlayerSpeed = useUnityFunction(
		callUnityFunction,
		SetPlayerSpeedFunctionName,
		playerSpeed.toString()
	);

	const resetGame = useUnityFunction(
		callUnityFunction,
		ResetFunctionName,
		playerSpeed.toString(),
		dropSpeed.toString()
	);

	const sproutItem = useUnityFunction(callUnityFunction, SproutFunctionName);

	return {
		setSproutSpeed,
		setGravityScale,
		setFontSize,
		setTextList,
		setPlayerSpeed,
		resetGame,
		sproutItem,
		isUnityLoaded,
		unityProvider,
		loadingProgression,
		unload,
	};
}
