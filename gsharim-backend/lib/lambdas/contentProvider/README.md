# Task Provider

### Abstract

The task provider is a restful microservice used as a front stage service, which
the client is interacting with. The task provider is providing support to any
operation that a student can do inside a “learning page” (in the scope of a
single task). The service is responsible for keeping track on the student’s
progress, updating task statuses, receiving submissions and providing the
necessary data for the current student’s task. This service is also
communicating with the managers via `GsharimCoreAPI`, in order to retrieve data
and build the necessary DTOs for the client.

### Specifications

-   Runs on AWS Lambda as a docker image
-   Runtime environment: NodeJs 16.X
-   Implemented with typescript and nestJS framework
-   Synced Invokation, API Gateway proxy integration
-   Integrated with `GsharimAPI`

## API

The lambda function will receive an `APIGatewayProxyEvent` as the event object,
and will output the result as an HTTP response.

### Routes

| Method | Route        | Input body | Output body |
| :----: | ------------ | ---------- | ----------- |
| `GET`  | `/tasks/:id` | none.      | `Task`      |

see more details in
[documentation](https://docs.google.com/document/d/1Hy-IxpeQuDLcL5Nb_-_BEieAvAJ4567ImA6PJHZzs78/edit?usp=sharing).

## Build

Everything is built automatically with AWS CDK. The lambda will compile into a
docker image and will be deployed afterwards to the AWS cloud.

## Debugging

To debug the function select the `Debug TaskProvider` option in the debug
section inside VSCode. The debugger will run the project with the serverless
framework, executing a setup task pre-debugging and a clean-up task
post-debugging.

You can find the configuration in `.vscode/tasks.json`
(`setup taskProvider debug` & `clean taskProvider debug` tasks) and
`.vscode/launch.json` (`Debug TaskProvider` launch configuration).

The setup task will run a setup script that lifts an instance of `json-server`
with pre-made mocks that you can find & edit in
`debugging/resources/jsonServerMocks.json`.
