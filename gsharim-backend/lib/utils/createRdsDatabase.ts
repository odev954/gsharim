import { Stack, RemovalPolicy } from "aws-cdk-lib/core";
import {
	Vpc,
	InstanceType,
	InstanceClass,
	InstanceSize,
	VpcLookupOptions,
	SubnetType,
} from "aws-cdk-lib/aws-ec2";
import {
	DatabaseInstance,
	DatabaseInstanceEngine,
	PostgresEngineVersion,
} from "aws-cdk-lib/aws-rds";
import { ResourcesNames } from "../consts";
import {
	buildConstructorId,
	buildPostgresDatabaseName,
	buildResourceName,
} from "./buildResourceNames";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

export default function createRdsDatabase(
	stack: Stack,
	name: ResourcesNames,
	VpcLookupOptions: VpcLookupOptions
) {
	const engine = DatabaseInstanceEngine.postgres({
		version: PostgresEngineVersion.VER_13,
	});

	const vpc = Vpc.fromLookup(
		stack,
		buildConstructorId(stack, ResourcesNames.RdsVpc),
		VpcLookupOptions
	);

	const secret = new Secret(
		stack,
		buildConstructorId(stack, ResourcesNames.RdsDatabaseSecretName),
		{
			secretName: buildResourceName(
				stack,
				ResourcesNames.RdsDatabaseSecretName
			),
		}
	);

	const database = new DatabaseInstance(
		stack,
		buildConstructorId(stack, name),
		{
			vpc: vpc,
			storageEncrypted: true,
			vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_NAT },
			instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
			engine: engine,
			databaseName: buildPostgresDatabaseName(stack, name),
			deleteAutomatedBackups: true,
			removalPolicy: RemovalPolicy.SNAPSHOT,
		}
	);

	return { database, vpc, engine, secret };
}
