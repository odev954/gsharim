import { Stack, RemovalPolicy } from "aws-cdk-lib/core";
import { IGrantable } from "aws-cdk-lib/aws-iam";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { ResourcesNames, dynamoTableNameCharacterLimit } from "../consts";
import { buildConstructorId, buildResourceName } from "../utils";

export default function createDynamoTable(
	stack: Stack,
	name: ResourcesNames,
	giveAccessTo?: IGrantable[]
) {
	const table = new Table(stack, buildConstructorId(stack, name), {
		tableName: buildResourceName(
			stack,
			name,
			dynamoTableNameCharacterLimit
		),
		billingMode: BillingMode.PAY_PER_REQUEST,
		partitionKey: {
			name: "id",
			type: AttributeType.STRING,
		},
		removalPolicy: RemovalPolicy.DESTROY,
	});

	giveAccessTo?.forEach((resource) => {
		table.grantFullAccess(resource);
	});

	return table;
}
