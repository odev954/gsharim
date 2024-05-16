import { writeFileSync as write } from "fs";
import { join } from "path";
import config from "../../../resources/apiGatewayEventConfig.json";
import template from "../../../resources/apiGatewayEventTemplate.json";

export default function generateApiGatewayEvent() {
	let debugEvent = template;
	const eventPath = join(__dirname, "../../../debugEvent.json");

	debugEvent.body = config.body;
	debugEvent.path = config.path;
	debugEvent.resource = config.path;
	debugEvent.httpMethod = config.method;
	debugEvent.requestContext.resourcePath = config.path;
	debugEvent.requestContext.httpMethod = config.method;

	write(eventPath, JSON.stringify(debugEvent));
}
