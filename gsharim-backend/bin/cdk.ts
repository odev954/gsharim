#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib/core";
import GsharimBackendStack from "../lib/stack";

const app = new cdk.App();
const stackName = app.node.tryGetContext("stackName");
new GsharimBackendStack(app, "GsharimBackendStack", {
	stackName: stackName,
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
});
