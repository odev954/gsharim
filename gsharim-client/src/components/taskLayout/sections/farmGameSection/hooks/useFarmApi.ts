import { ApiDescription } from "components/ide";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PossiblePosition } from "./types";
import {
	rightFunctionDocString,
	leftFunctionDocString,
	downFunctionDocString,
	upFunctionDocString,
	pickupDropDocString,
	interactDocString,
	getCurrentPositionDocString,
	getClosestBucketDocString,
	getClosestShovelDocString,
	getClosestFountainDocString,
	getClosestSoilDocString,
	getClosestGrainDocString,
} from "./strings";

type UseFarmApiProps = {
	right: () => Promise<void>;
	left: () => Promise<void>;
	down: () => Promise<void>;
	up: () => Promise<void>;
	pickupDrop: () => Promise<void>;
	interract: () => Promise<void>;
	getCurrentPosition: () => Promise<PossiblePosition>;
	getClosestBucket: () => Promise<PossiblePosition>;
	getClosestShovel: () => Promise<PossiblePosition>;
	getClosestFountain: () => Promise<PossiblePosition>;
	getClosestSoil: () => Promise<PossiblePosition>;
	getClosestGrain: () => Promise<PossiblePosition>;
};
export default function useFarmApi({
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
}: UseFarmApiProps): ApiDescription {
	const { t: translate } = useTranslation();

	const api = useMemo(
		() => ({
			right: {
				endpoint: right,
				docString: translate(rightFunctionDocString),
			},
			left: {
				endpoint: left,
				docString: translate(leftFunctionDocString),
			},
			down: {
				endpoint: down,
				docString: translate(downFunctionDocString),
			},
			up: {
				endpoint: up,
				docString: translate(upFunctionDocString),
			},
			pickupDrop: {
				endpoint: pickupDrop,
				docString: translate(pickupDropDocString),
			},
			interract: {
				endpoint: interract,
				docString: translate(interactDocString),
			},
			getCurrentPosition: {
				endpoint: getCurrentPosition,
				docString: translate(getCurrentPositionDocString),
			},
			getClosestBucket: {
				endpoint: getClosestBucket,
				docString: translate(getClosestBucketDocString),
			},
			getClosestShoval: {
				endpoint: getClosestShovel,
				docString: translate(getClosestShovelDocString),
			},
			getClosestFountain: {
				endpoint: getClosestFountain,
				docString: translate(getClosestFountainDocString),
			},
			getClosestSoil: {
				endpoint: getClosestSoil,
				docString: translate(getClosestSoilDocString),
			},
			getClosestGrain: {
				endpoint: getClosestGrain,
				docString: translate(getClosestGrainDocString),
			},
		}),
		[
			down,
			getClosestBucket,
			getClosestFountain,
			getClosestGrain,
			getClosestShovel,
			getClosestSoil,
			getCurrentPosition,
			interract,
			left,
			pickupDrop,
			right,
			up,
			translate,
		]
	);
	return api;
}
