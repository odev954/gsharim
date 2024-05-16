import { Stack } from "aws-cdk-lib/core";
import { ResourcesNames, postgresDatabaseNameCharacterLimit } from "../consts";
import { Md5 } from "md5-typescript";

export function buildResourceName(
	stack: Stack,
	name: ResourcesNames,
	characterLimit?: number
): string {
	const resourceName = `${stack.stackName}-${name}`;
	if (characterLimit && resourceName.length > characterLimit) {
		return Md5.init(resourceName);
	}
	return resourceName;
}

export function buildPostgresDatabaseName(
	stack: Stack,
	name: ResourcesNames
): string {
	const databaseName = buildResourceName(stack, name).replace(
		/W/g,
		"_"
	);
	if (databaseName.length > postgresDatabaseNameCharacterLimit) {
		return `DB${Md5.init(databaseName)}`;
	}
	return databaseName;
}

export function buildConstructorId(
	stack: Stack,
	name: ResourcesNames,
	characterLimit?: number
): string {
	const constructorId = `${stack.stackName}-${name}Constructor`;
	if (characterLimit && constructorId.length > characterLimit) {
		return Md5.init(constructorId);
	}
	return constructorId;
}

export function buildVersionName(
	stack: Stack,
	name: ResourcesNames,
	characterLimit?: number
): string {
	const versionName = `${stack.stackName}-Version-${name}`;
	if (characterLimit && versionName.length > characterLimit) {
		return Md5.init(versionName);
	}
	return versionName;
}
