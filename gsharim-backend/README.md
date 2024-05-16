# gsharim-backend

AWS backend for gsharim system ☁️🌉

## Setup

Before working in this project, make sure you have nodeJS installed on your local machine.

To setup the project, run the command:

```sh
npm run setup
```

Wait until the script will install all of the required dependencies.

Happy development! :)

## Resources

To read more about api specifications, design & planning, visit our [backend documentation](https://docs.google.com/document/d/1Hy-IxpeQuDLcL5Nb_-_BEieAvAJ4567ImA6PJHZzs78/edit?usp=sharinghttps:/).

The backend is implemented with the Cloud Development Kit (CDK) which consists the AWS CloudFormation API.
All resources of our backend are configured with CDK.
You can check the `lib/stack.ts` file to see the configuration of all AWS resources in more details.

| Resource Name         | AWS Service | Configuration                                                                                                                                       |
| --------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SectionsTable`       | DynamoDB    | pay per request, id (string) as partition key                                                                                                       |
| `SectionsGroupsTable` | DynamoDB    | pay per request, id (string) as partition key                                                                                                       |
| `TasksTable`          | DynamoDB    | pay per request, id (string) as partition key                                                                                                       |
| `ContentManager`      | Lambda      | source code from docker image                                                                                                                       |
| `ContentProvider`     | Lambda      | source code from docker image                                                                                                                       |
| `GsharimCoreApi`      | API Gateway | rest API, for supported routes see[documentation](https://docs.google.com/document/d/1Hy-IxpeQuDLcL5Nb_-_BEieAvAJ4567ImA6PJHZzs78/edit?usp=sharing) |
| `GsharimApi`          | API Gateway | rest API, for supported routes see[documentation](https://docs.google.com/document/d/1Hy-IxpeQuDLcL5Nb_-_BEieAvAJ4567ImA6PJHZzs78/edit?usp=sharing) |

## Automations

The deployment of backend versions is executed automatically with `github actions`.

There are several automations configured for this repository:

1. `create-stack-branch` - creates a CDK stack for a feature branch when a PR is opened.
2. `deploy-stack-dev` - updates the dev stack when new commits are being pushed.
3. `deploy-stack-prod` - updates the master stack when new commits are being pushed.
4. `destroy-stack-branch` - destroys the feature branch stack when PR is closed.
5. `update-stack-branch` - updates the feature branch stack when new commits are being pushed.

## Debugging

For each lambda function that is implemented here there is a different debugging configuration. The debugging configured according to the resources that the lambda needs in order to execute operations successfully.
To use the debugging feature make sure to open the wanted lambda sub-directory with `vscode`, the debugging option then appears ready to use :)

Here is a summery of the debugging configuration cover:

| Lambda Function  | Debug configuration |                                             Specification                                              |
| :--------------- | :-----------------: | :----------------------------------------------------------------------------------------------------: |
| Content Provider |         ✅          | Will run a json server instance locally, debugging via serverless framework, API gateway event trigger |
| Content Manager  |         ✅          | Will run a dynamoDB container on docker, debugging via serverless framework, API gateway event trigger |

Before using the debugger, make sure to edit the `debugging/resources/apiGatewayEventConfig.json` file to set the desired API gateway event trigger.

You can find all configurations in `.vscode/launch.json` and `.vscode/task.json`, as well as the source code for the setup & clean scripts in `debugging/scripts` package.
