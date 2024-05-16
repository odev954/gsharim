import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Stack } from "aws-cdk-lib/core";
import { IResourceCreator } from "../interfaces";
import { apiCorsOptions } from "./consts";
import { createApi } from "../utils";
import { ResourcesNames } from "../consts";

export default class ApiGatewayResources implements IResourceCreator {
	public create(stack: Stack): RestApi[] {
		const managersApi = createApi(stack, ResourcesNames.CoreApi);
		const providersApi = createApi(
			stack,
			ResourcesNames.Api,
			apiCorsOptions
		);

		return [managersApi, providersApi];
	}
}
