import { useCallback, useEffect, useMemo, useState } from "react";
import useUnity, { UnityEvent } from "hooks/unity";
import { useElementSize } from "usehooks-ts";
import { MazeGameSectionData } from "@eco8200/data-models";
import { addApiHints } from "components/ide";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import {
	gameUrl,
	gameName,
	WinEventName,
	SetupFunctionName,
	LeftFunctionName,
	UpFunctionName,
	DownFunctionName,
	ResetFunctionName,
	RightFunctionName,
} from "./consts";
import MazeGameSectionComponent from "./mazeGameSectionComponent";

export default function MazeGameSectionContainer({
	api: apiHints,
	levelConfiguration,
	editable,
	defaultCode,
	autoAwait,
	maxOutputSize,
	verboseDelay,
	autoRun,
	pythonPrefix,
	pythonSuffix,
	id,
}: MazeGameSectionData): JSX.Element {
	const [isGameLoaded, setIsGameLoaded] = useState(false);
	const [didWin, setDidWin] = useState(false);
	const handleUnityEvent = useCallback((eventInformation: UnityEvent) => {
		if (eventInformation.eventName === WinEventName) {
			setDidWin(true);
		}
	}, []);
	const {
		unityProvider,
		callUnityFunction,
		isUnityLoaded,
		loadingProgression,
		unload,
	} = useUnity(gameUrl, gameName, handleUnityEvent);
	const { approveSection } = useSetSectionBlocking(id);
	useEffect(() => {
		if (didWin) {
			approveSection();
		}
	}, [approveSection, didWin]);
	useEffect(() => {
		if (!isGameLoaded && isUnityLoaded) {
			callUnityFunction(SetupFunctionName, [
				JSON.stringify(levelConfiguration),
			]);
			setIsGameLoaded(true);
		}
	}, [isGameLoaded, isUnityLoaded, callUnityFunction, levelConfiguration]);

	const right = useCallback(async () => {
		await callUnityFunction(RightFunctionName, []);
	}, [callUnityFunction]);

	const left = useCallback(async () => {
		await callUnityFunction(LeftFunctionName, []);
	}, [callUnityFunction]);

	const up = useCallback(async () => {
		await callUnityFunction(UpFunctionName, []);
	}, [callUnityFunction]);

	const down = useCallback(async () => {
		await callUnityFunction(DownFunctionName, []);
	}, [callUnityFunction]);

	const reset = useCallback(async () => {
		await callUnityFunction(ResetFunctionName, []);
		setDidWin(false);
	}, [callUnityFunction]);

	const isDone = useCallback(async () => didWin, [didWin]);

	const endpoints = useMemo(
		() => ({
			right: { endpoint: right },
			left: { endpoint: left },
			down: { endpoint: down },
			up: { endpoint: up },
			reset: { endpoint: reset },
			isDone: { endpoint: isDone },
		}),
		[right, left, down, up, reset, isDone]
	);
	const documentedApi = useMemo(
		() => (apiHints ? addApiHints(endpoints, apiHints) : endpoints),
		[endpoints, apiHints]
	);

	const [containerRef, canvasSize] = useElementSize();

	return (
		<MazeGameSectionComponent
			api={documentedApi}
			unityProvider={unityProvider}
			didWin={didWin}
			editable={editable}
			defaultCode={defaultCode}
			containerRef={containerRef}
			canvasSize={canvasSize}
			isUnityLoaded={isUnityLoaded}
			unload={unload}
			loadingProgression={loadingProgression}
			autoAwait={autoAwait}
			maxOutputSize={maxOutputSize}
			verboseDelay={verboseDelay}
			autoRun={autoRun}
			pythonPrefix={pythonPrefix}
			pythonSuffix={pythonSuffix}
		/>
	);
}
