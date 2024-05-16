import { RoutineMap } from "./types";
import { killDynamoContainer } from "./database";
import { killJsonServer } from "./api";
import { removeDebugEventFile } from "./events";
import config from "../../resources/debuggingConfig.json";

const routines: RoutineMap = {
	dynamo: () => killDynamoContainer(config.dynamoContainerName),
	jsonServer: () => killJsonServer(config.jsonServerPort),
};

function main() {
	const routine = process.argv[2];

	if (!Object.keys(routines).includes(routine)) {
		throw new Error(
			"mode is unrecognized. available modes are: " +
				Object.keys(routines).toString()
		);
	}

	routines[routine]();
	removeDebugEventFile();
}

main();
