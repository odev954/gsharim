import { useCallback, useEffect, useState } from "react";

import { useUnityContext } from "react-unity-webgl";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";
import { once } from "utils/customEvents";
import {
	UnityEventName,
	UnityTriggerEventName,
	UnityReadyEventName,
} from "./consts";
import { UnityEvent, CallUnityFunction } from "./types";
import { generateUnityContext, getRandomQueryId } from "./utils";

type UseUnityReturnType = {
	unityProvider: UnityProvider;
	callUnityFunction: CallUnityFunction;
	isUnityLoaded: boolean;
	unload: () => Promise<void>;
	loadingProgression: number;
};

export default function useUnity(
	gameUrl: string,
	gameName: string,
	onEventCallback: (event: UnityEvent) => void
): UseUnityReturnType {
	const [isUnityLoaded, setIsUnityLoaded] = useState(false);
	// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
	const {
		unityProvider,
		UNSAFE__unityInstance: unityInstance,
		UNSAFE__detachAndUnloadImmediate: unload,
		loadingProgression,
	} = useUnityContext(generateUnityContext(gameUrl, gameName));

	const effectiveUnityEventListener = useCallback(
		(event: CustomEvent): void => {
			const eventInformation: UnityEvent = JSON.parse(event.detail);
			if (eventInformation.eventName === UnityReadyEventName) {
				setIsUnityLoaded(true);
			} else {
				onEventCallback(eventInformation);
			}
		},
		[onEventCallback]
	);

	useEffect(() => {
		const eventListener = effectiveUnityEventListener as EventListener;
		document.addEventListener(UnityTriggerEventName, eventListener);
		return () => {
			document.removeEventListener(UnityTriggerEventName, eventListener);
		};
	}, [unityProvider, onEventCallback, effectiveUnityEventListener]);

	const callUnityFunction = useCallback<CallUnityFunction>(
		async (funcName, args = []) => {
			if (!unityInstance) {
				return null;
			}

			const randomQueryId = getRandomQueryId();
			const returnValuePromise = new Promise<string>((resolve) => {
				once(`${UnityEventName}:${randomQueryId}`, (event: CustomEvent) => {
					resolve(event.detail);
				});
			});
			unityInstance.SendMessage(
				"bridge",
				"callFuncion",
				JSON.stringify({
					id: randomQueryId,
					functionName: funcName,
					args,
				})
			);
			const functionReturnValue = await returnValuePromise;
			if (functionReturnValue.length === 0) {
				return null;
			}
			return functionReturnValue;
		},
		[unityInstance]
	);

	return {
		unityProvider,
		callUnityFunction,
		isUnityLoaded,
		unload,
		loadingProgression,
	};
}
