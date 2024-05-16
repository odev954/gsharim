import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Stack, IResource } from "aws-cdk-lib/core";
import { IResourceCreator } from "../interfaces";
import { addRouteIntegration, buildRestApiUrl, createLambda } from "../utils";
import {
	lambdaIntegrationCorSupportOptions,
	methodCorSupportOptions,
} from "./consts";
import { ResourcesNames } from "../consts";

export default class ContentProviderResources implements IResourceCreator {
	private managersApi: RestApi;
	private providersApi: RestApi;

	public constructor(managersApi: RestApi, providersApi: RestApi) {
		this.managersApi = managersApi;
		this.providersApi = providersApi;
	}

	public create(stack: Stack): IResource[] {
		const { lambdaFunction, version } = createLambda(
			stack,
			ResourcesNames.ContentProvider,
			"lambdas/contentProvider"
		);

		const integration = new LambdaIntegration(
			lambdaFunction,
			lambdaIntegrationCorSupportOptions
		);

		addRouteIntegration(
			this.providersApi.root,
			"task/{id}",
			integration,
			["GET"],
			methodCorSupportOptions
		);

		addRouteIntegration(
			this.providersApi.root,
			"tasks",
			integration,
			["GET"],
			methodCorSupportOptions
		);

		lambdaFunction.addEnvironment(
			"API_URL",
			buildRestApiUrl(this.managersApi.restApiId, stack.region)
		);

		return [lambdaFunction, version];
	}
}
