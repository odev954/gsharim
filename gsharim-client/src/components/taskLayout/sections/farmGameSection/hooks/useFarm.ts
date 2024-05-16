import { useCallback } from "react";
import {
	CallUnityFunction,
	useParameterlessFunction,
	useParameterlessFunctionWithNoReturnValue,
} from "hooks/unity";
import { FarmSetupMessage } from "@eco8200/data-models";
import {
	RightFunctionName,
	LeftFunctionName,
	DownFunctionName,
	UpFunctionName,
	PickupDropFunctionName,
	InterractFunctionName,
	DanceFunctionName,
	GetCurrentPositionFunctionName,
	GetClosestBucketFunctionName,
	GetClosestShovelFunctionName,
	GetClosestFountainFunctionName,
	GetClosestSoilFunctionName,
	GetClosestGrainFunctionName,
	SetupFunctionName,
} from "./consts";
import { PossiblePosition } from "./types";
import { parsePosition } from "./utils";

type useFarmReturnType = {
	right: () => Promise<void>;
	left: () => Promise<void>;
	down: () => Promise<void>;
	up: () => Promise<void>;
	pickupDrop: () => Promise<void>;
	interract: () => Promise<void>;
	dance: () => Promise<void>;
	getCurrentPosition: () => Promise<PossiblePosition>;
	getClosestBucket: () => Promise<PossiblePosition>;
	getClosestShovel: () => Promise<PossiblePosition>;
	getClosestFountain: () => Promise<PossiblePosition>;
	getClosestSoil: () => Promise<PossiblePosition>;
	getClosestGrain: () => Promise<PossiblePosition>;
	setup: (setupMessage: FarmSetupMessage) => Promise<void>;
};

export default function useFarm(
	callUnityFunction: CallUnityFunction
): useFarmReturnType {
	const right = useParameterlessFunctionWithNoReturnValue(
		callUnityFunction,
		RightFunctionName
	);

	const left = useParameterlessFunctionWithNoReturnValue(
		callUnityFunction,
		LeftFunctionName
	);

	const down = useParameterlessFunctionWithNoReturnValue(
		callUnityFunction,
		DownFunctionName
	);

	const up = useParameterlessFunctionWithNoReturnValue(
		callUnityFunction,
		UpFunctionName
	);

	const pickupDrop = useParameterlessFunctionWithNoReturnValue(
		callUnityFunction,
		PickupDropFunctionName
	);

	const interract = useParameterlessFunctionWithNoReturnValue(
		callUnityFunction,
		InterractFunctionName
	);

	const dance = useParameterlessFunctionWithNoReturnValue(
		callUnityFunction,
		DanceFunctionName
	);

	const getCurrentPosition = useParameterlessFunction(
		callUnityFunction,
		GetCurrentPositionFunctionName,
		parsePosition
	);

	const getClosestBucket = useParameterlessFunction(
		callUnityFunction,
		GetClosestBucketFunctionName,
		parsePosition
	);

	const getClosestShovel = useParameterlessFunction(
		callUnityFunction,
		GetClosestShovelFunctionName,
		parsePosition
	);

	const getClosestFountain = useParameterlessFunction(
		callUnityFunction,
		GetClosestFountainFunctionName,
		parsePosition
	);

	const getClosestSoil = useParameterlessFunction(
		callUnityFunction,
		GetClosestSoilFunctionName,
		parsePosition
	);

	const getClosestGrain = useParameterlessFunction(
		callUnityFunction,
		GetClosestGrainFunctionName,
		parsePosition
	);

	const setup = useCallback(
		async (setupMessage: FarmSetupMessage) => {
			await callUnityFunction(SetupFunctionName, [
				JSON.stringify(setupMessage),
			]);
		},
		[callUnityFunction]
	);

	return {
		right,
		left,
		down,
		up,
		pickupDrop,
		interract,
		dance,
		getCurrentPosition,
		getClosestBucket,
		getClosestShovel,
		getClosestFountain,
		getClosestSoil,
		getClosestGrain,
		setup,
	};
}
