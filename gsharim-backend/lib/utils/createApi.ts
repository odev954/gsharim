import { Stack } from "aws-cdk-lib/core";
import { ResourcesNames, apiGatewayNameCharacterLimit } from "../consts";
import { RestApi, RestApiProps } from "aws-cdk-lib/aws-apigateway";
import { buildConstructorId, buildResourceName } from "../utils";

export default function createApi(
	stack: Stack,
	name: ResourcesNames,
	options?: RestApiProps
): RestApi {
	return new RestApi(stack, buildConstructorId(stack, name), {
		restApiName: buildResourceName(
			stack,
			name,
			apiGatewayNameCharacterLimit
		),
		...options,
	});
}
