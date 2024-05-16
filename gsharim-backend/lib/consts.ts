export enum ResourcesNames {
	TasksTable = "TasksTable",
	SectionsTable = "SectionsTable",
	SectionsGroupTable = "SectionsGroupTable",
	SectionsManager = "SectionsManager",
	ContentManager = "ContentManager",
	ContentProvider = "ContentProvider",
	Api = "GsharimApi",
	CoreApi = "GsharimCoreApi",
	RdsDatabaseSecretName = "RdsDatabaseSecretName",
	RdsVpc = "RdsVpc",
	ContentDatabase = "ContentDatabase",
}

export const lambdaFunctionNameCharacterLimit = 64;
export const postgresDatabaseNameCharacterLimit = 63;
export const apiGatewayNameCharacterLimit = 128;
export const lambdaVersionNameCharacterLimit = 128;
export const dynamoTableNameCharacterLimit = 255;
