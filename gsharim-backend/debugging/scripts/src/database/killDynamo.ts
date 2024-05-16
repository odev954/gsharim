import { execSync as exec } from "child_process";
import commands from "./commands";
import utils from "../utils";

export default function killDynamoContainer(name: string) {
	const output = exec(
		utils.replaceName(commands.dynamoLifeCheckCommand, name)
	).toString();

	if (output.match("[a-f0-9]{12}")?.length !== 0) {
		exec(utils.replaceName(commands.dynamoStopCommand, name));
		exec(utils.replaceName(commands.dynamoRemoveCommand, name));
	}
}
