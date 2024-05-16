import { Stack, StackProps } from "aws-cdk-lib/core";
import { Construct } from "constructs";
import {
	ApiGatewayResources,
	ContentManagerResources,
	ContentProviderResources,
} from "./resources";

export default class GsharimBackendStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);
		const apiCreator = new ApiGatewayResources();

		const [managersApi, providersApi] = apiCreator.create(this);

		const contentManagerCreator = new ContentManagerResources(managersApi);
		const contentProviderCreator = new ContentProviderResources(
			managersApi,
			providersApi
		);

		contentManagerCreator.create(this);
		contentProviderCreator.create(this);
	}
}
