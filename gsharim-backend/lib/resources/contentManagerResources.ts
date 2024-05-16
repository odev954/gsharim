import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Stack, IResource } from "aws-cdk-lib/core";
import { IResourceCreator } from "../interfaces";
import {
	addRouteIntegration,
	createDynamoTable,
	createLambda,
} from "../utils";
import { ResourcesNames } from "../consts";

export default class ContentManagerResources implements IResourceCreator {
	private managersApi: RestApi;

	public constructor(managersApi: RestApi) {
		this.managersApi = managersApi;
	}

	public create(stack: Stack): IResource[] {
		const routeBase = this.managersApi.root;
		const { lambdaFunction, version } = createLambda(
			stack,
			ResourcesNames.ContentManager,
			"lambdas/contentManager"
		);

		const tasksTable = createDynamoTable(stack, ResourcesNames.TasksTable, [
			lambdaFunction,
		]);

		const sectionsTable = createDynamoTable(
			stack,
			ResourcesNames.SectionsTable,
			[lambdaFunction]
		);

		const sectionGroupsTable = createDynamoTable(
			stack,
			ResourcesNames.SectionsGroupTable,
			[lambdaFunction]
		);

		const integration = new LambdaIntegration(lambdaFunction);

		addRouteIntegration(routeBase, "tasks", integration, [
			"PUT",
			"POST",
			"GET",
		]);

		addRouteIntegration(routeBase, "tasks/{id}", integration, [
			"GET",
			"DELETE",
		]);

		addRouteIntegration(routeBase, "sections", integration, [
			"PUT",
			"POST",
		]);

		addRouteIntegration(routeBase, "sections/{id}", integration, [
			"GET",
			"DELETE",
		]);

		addRouteIntegration(routeBase, "sections/groups", integration, [
			"POST",
		]);

		addRouteIntegration(routeBase, "sections/groups/{id}", integration, [
			"PUT",
			"GET",
			"DELETE",
		]);

		lambdaFunction.addEnvironment(
			"SECTION_COLLECTION",
			sectionsTable.tableName
		);

		lambdaFunction.addEnvironment(
			"SECTION_GROUP_COLLECTION",
			sectionGroupsTable.tableName
		);

		lambdaFunction.addEnvironment("TASK_COLLECTION", tasksTable.tableName);

		return [tasksTable, lambdaFunction, version];
	}
}
