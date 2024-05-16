import { useCallback, useEffect, useMemo, useState } from "react";
import { FarmGameSectionData } from "@eco8200/data-models";
import useUnity, { UnityEvent } from "hooks/unity";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import {
	GameName,
	GameUrl,
	HarvestEventName,
	InitialHarvestNumber,
} from "./consts";
import FarmGameSectionComponent from "./farmGameSectionComponent";
import useFarm from "./hooks/useFarm";
import useFarmApi from "./hooks/useFarmApi";

export default function FarmGameSectionContainer({
	setupMessage,
	api,
	autoAwait,
	defaultCode,
	editable,
	maxOutputSize,
	verboseDelay,
	autoRun,
	pythonPrefix,
	pythonSuffix,
	id,
}: FarmGameSectionData): JSX.Element {
	const [harvestNumber, setHarvestNumber] = useState(InitialHarvestNumber);
	const onUnityEvent = useCallback((event: UnityEvent) => {
		if (event.eventName === HarvestEventName) {
			setHarvestNumber((current) => current - 1);
		}
	}, []);
	const {
		unityProvider,
		callUnityFunction,
		isUnityLoaded,
		unload,
		loadingProgression,
	} = useUnity(GameUrl, GameName, onUnityEvent);
	const {
		right,
		left,
		down,
		up,
		pickupDrop,
		interract,
		getCurrentPosition,
		getClosestBucket,
		getClosestShovel,
		getClosestFountain,
		getClosestSoil,
		getClosestGrain,
		setup,
		dance,
	} = useFarm(callUnityFunction);
	const farmApi = useFarmApi({
		right,
		left,
		down,
		up,
		pickupDrop,
		interract,
		getCurrentPosition,
		getClosestBucket,
		getClosestShovel,
		getClosestFountain,
		getClosestSoil,
		getClosestGrain,
	});

	const { approveSection } = useSetSectionBlocking(id);

	useEffect(() => {
		approveSection();
	}, [approveSection]);

	useEffect(() => {
		if (isUnityLoaded) {
			setup(setupMessage);
		}
	}, [isUnityLoaded, setup, setupMessage]);

	useEffect(() => {
		if (harvestNumber === 0) {
			dance();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [harvestNumber]);
	const effectiveApi = useMemo(() => ({ ...farmApi, ...api }), [api, farmApi]);
	return (
		<FarmGameSectionComponent
			unityProvider={unityProvider}
			isUnityLoaded={isUnityLoaded}
			api={effectiveApi}
			unload={unload}
			loadingProgression={loadingProgression}
			autoAwait={autoAwait}
			defaultCode={defaultCode}
			editable={editable}
			maxOutputSize={maxOutputSize}
			verboseDelay={verboseDelay}
			autoRun={autoRun}
			pythonPrefix={pythonPrefix}
			pythonSuffix={pythonSuffix}
		/>
	);
}
