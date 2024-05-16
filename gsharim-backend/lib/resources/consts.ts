import { Cors } from "aws-cdk-lib/aws-apigateway";

export const lambdaIntegrationCorSupportOptions = {
	integrationResponses: [
		{
			responseParameters: {
				"method.response.header.Access-Control-Allow-Origin": "'*'",
			},
			responseTemplates: {
				"application/json": JSON.stringify({
					message: "$util.parseJson($input.body)",
					state: "ok",
				}),
			},
			statusCode: "200",
		},
	],
};

export const methodCorSupportOptions = {
	methodResponses: [
		{
			statusCode: "200",
			responseParameters: {
				"method.response.header.Content-Type": true,
				"method.response.header.Access-Control-Allow-Origin": true,
				"method.response.header.Access-Control-Allow-Credentials": true,
			},
		},
	],
};

export const apiCorsOptions = {
	defaultCorsPreflightOptions: {
		allowHeaders: [
			"Content-Type",
			"X-Amz-Date",
			"Authorization",
			"X-Api-Key",
			"X-Amz-Security-Token",
		],
		statusCode: 200,
		allowMethods: ["OPTIONS", "GET", "POST", "DELETE"],
		allowCredentials: true,
		allowOrigins: Cors.ALL_ORIGINS,
	},
	deploy: true,
};
