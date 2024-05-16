# Content Manager

### Abstract

The content manager is a simple CRUD service for our RDS database, which is
responsible for the content management of the system. The content is ordered in
hierarchy: There are courses, then chapters, then lessons and in the final
stage, tasks. The content manager is responsible for keeping the database
consistent with the structure of the content’s hierarchy.

### Specifications

-   Runs on AWS Lambda as a docker image
-   Runtime environment: NodeJs 16.X
-   Implemented with typescript and nestJS framework
-   Synced Invokation, API Gateway proxy integration
-   Integrated with `GsharimCoreAPI`

## API

The lambda function will receive an `APIGatewayProxyEvent` as the event object,
and will output the result as an HTTP response.

|  Method  | Route        | Input body  | Output body |
| :------: | ------------ | ----------- | ----------- |
|  `GET`   | `/tasks/:id` | none.       | `TaskModel` |
|  `PUT`   | `/task/`     | `TaskModel` | none.       |
| `DELETE` | `/tasks/:id` | none.       | none.       |
|  `POST`  | `/task/`     | `TaskModel` | `RecordId`  |

see more details in
[documentation](https://docs.google.com/document/d/1Hy-IxpeQuDLcL5Nb_-_BEieAvAJ4567ImA6PJHZzs78/edit?usp=sharing).

## Build

Everything is built automatically with AWS CDK. The lambda will compile into a
docker image and will be deployed afterwards to the AWS cloud.

## Debugging

To debug the function select the `Debug ContentManager` option in the debug
section inside VSCode. The debugger will run the project with the serverless
framework, executing a setup task pre-debugging and a clean-up task
post-debugging.

You can find the configuration in `.vscode/tasks.json`
(`setup contentManager debug` & `clean contentManager debug` tasks) and
`.vscode/launch.json` (`Debug ContentManager` launch configuration).

The setup task will run a setup script that lifts an instance of `dynamoDB`
container on docker, that is loaded afterwards with mocks that you can find in
`debugging/scripts/mocks/tasks.ts` file.
