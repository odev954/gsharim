const dynamoLifeCheckCommand = `docker ps --filter name={NAME} --filter status=running --quiet`;

const dynamoRunCommand = `docker run --name {NAME} -d -p {PORT}:8000 amazon/dynamodb-local:latest -jar DynamoDBLocal.jar -sharedDb`;

const dynamoStopCommand = `docker stop {NAME}`;
const dynamoRemoveCommand = `docker rm {NAME}`;

export default {
	dynamoRunCommand,
	dynamoLifeCheckCommand,
	dynamoStopCommand,
	dynamoRemoveCommand,
};
