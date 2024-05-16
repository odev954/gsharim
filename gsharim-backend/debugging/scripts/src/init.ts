import { RoutineMap } from "./types";
import { dynamoSetup, liftDynamoContainer, isDynamoRuns } from "./database";
import { liftJsonServer } from "./api";
import { generateApiGatewayEvent } from "./events";
import { awsLogin } from "./aws";
import config from "../../resources/debuggingConfig.json";

function dynamoRoutine() {
	const port = config.dynamoPort;
	const name = config.dynamoContainerName;

	if (!isDynamoRuns(name)) {
		liftDynamoContainer(port, name);
		dynamoSetup(port);
	}
}

function jsonServerRoutine() {
	const port = config.jsonServerPort;

	liftJsonServer(port);
}

const routines: RoutineMap = {
	dynamo: dynamoRoutine,
	jsonServer: jsonServerRoutine,
};

function main() {
	const routine = process.argv[2];

	awsLogin();

	if (!Object.keys(routines).includes(routine)) {
		throw new Error(
			`mode "${routine}" is unrecognized. available modes are: ` +
				Object.keys(routines).toString()
		);
	}

	routines[routine]();
	generateApiGatewayEvent();
}

main();
