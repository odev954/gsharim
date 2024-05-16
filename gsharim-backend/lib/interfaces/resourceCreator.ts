import { Stack, IResource } from "aws-cdk-lib/core";

export default interface IResourceCreator {
	create(scope: Stack): IResource[];
}
