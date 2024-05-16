import { execSync as exec } from "child_process";
import commands from "./commands";
import utils from "../utils";

export function isDynamoRuns(name: string) {
	const output = exec(
		utils.replaceName(commands.dynamoLifeCheckCommand, name)
	).toString();

	return !!output.match("[a-f0-9]{12}");
}
