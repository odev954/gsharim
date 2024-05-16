import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import mocks from "../mocks";
import consts from "./consts";

export default function dynamoSetup(port: number) {
	const client = new DynamoDBClient({
		region: "localhost",
		endpoint: `http://localhost:${port}`,
	});

	createTables(client).then((_) => {
		pushMocks(client);
	});
}

async function createTables(client: DynamoDBClient) {
	const tables = [
		consts.tasksTable,
		consts.sectionsTable,
		consts.sectionsGroupTable,
	];

	const promises = tables.map(async (table) => {
		return client.send(
			new CreateTableCommand({
				TableName: table,
				KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
				AttributeDefinitions: [
					{ AttributeName: "id", AttributeType: "S" },
				],
				ProvisionedThroughput: {
					ReadCapacityUnits: 10,
					WriteCapacityUnits: 10,
				},
			})
		);
	});

	await Promise.all(promises);
}

function pushMocks(database: DynamoDBDocumentClient) {
	const mockMap = {
		[consts.tasksTable]: mocks.tasks,
		[consts.sectionsTable]: mocks.sections,
		[consts.sectionsGroupTable]: mocks.sectionGroups,
	};

	Object.entries(mockMap).forEach((entry) => {
		const [table, mocks] = entry;
		mocks.forEach((mock) => {
			const params = {
				TableName: table,
				Item: mock,
			};
			database.send(new PutCommand(params));
		});
	});
}
