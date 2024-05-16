import {
	DockerImageFunction,
	DockerImageCode,
	Version,
} from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { Stack } from "aws-cdk-lib/core";
import {
	ResourcesNames,
	lambdaFunctionNameCharacterLimit,
	lambdaVersionNameCharacterLimit,
} from "../consts";
import {
	buildConstructorId,
	buildResourceName,
	buildVersionName,
} from "../utils";

export default function createLambda(
	stack: Stack,
	name: ResourcesNames,
	imagePath: string
): {
	lambdaFunction: DockerImageFunction;
	version: Version;
} {
	const lambdaFunction = new DockerImageFunction(
		stack,
		buildConstructorId(stack, name),
		{
			functionName: buildResourceName(
				stack,
				name,
				lambdaFunctionNameCharacterLimit
			),
			code: DockerImageCode.fromImageAsset(
				join(__dirname, `../${imagePath}`)
			),
		}
	);

	const version = new Version(
		stack,
		buildVersionName(stack, name, lambdaVersionNameCharacterLimit),
		{
			lambda: lambdaFunction,
		}
	);

	return {
		lambdaFunction,
		version,
	};
}
