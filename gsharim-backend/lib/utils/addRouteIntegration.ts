import {
	Integration,
	IResource,
	MethodOptions,
} from "aws-cdk-lib/aws-apigateway";
import { allMethods } from "./consts";

export default function addRouteIntegration(
	baseReource: IResource,
	route: string,
	integration: Integration,
	specifyMethods = allMethods,
	methodOptions?: MethodOptions
) {
	const routeParts = route.split("/");
	let currentRoute = baseReource;

	routeParts.forEach((part) => {
		currentRoute =
			currentRoute.getResource(part) ?? currentRoute.addResource(part);
	});

	specifyMethods.forEach((method) => {
		currentRoute.addMethod(method, integration, methodOptions);
	});
}
