import { ExecutionResult, IQuery } from '@eco8200/backend-common';
import ISectionsGroupDatabase, {
    IdInput,
    IdOutput,
    RecordInput,
    RecordListOutput,
    RecordOutput
} from '../../../src/data/abstract/sectionsGroupDatabase';
import { sectionGroupMocks, sectionMocks } from './sectionMocks';
import { ResourceNotFoundException } from '@aws-sdk/client-dynamodb';

class GetSectionGroupMock implements IQuery<Error, IdInput, RecordOutput> {
    async run({ id }: IdInput): Promise<ExecutionResult<Error, RecordOutput>> {
        if (!sectionGroupMocks[id])
            return {
                success: false,
                error: new ResourceNotFoundException({
                    message: 'task does not exists',
                    $metadata: null
                })
            };

        return {
            success: true,
            data: { record: sectionGroupMocks[id] }
        };
    }
}

class DeleteSectionGroupMock implements IQuery<Error, IdInput> {
    async run({ id }: IdInput): Promise<ExecutionResult<Error>> {
        if (!sectionGroupMocks[id])
            return {
                success: false,
                error: new ResourceNotFoundException({
                    message: 'task does not exists',
                    $metadata: null
                })
            };

        return {
            success: true
        };
    }
}

class CreateSectionGroupMock implements IQuery<Error, RecordInput, IdOutput> {
    async run({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        record
    }: RecordInput): Promise<ExecutionResult<Error, IdOutput>> {
        return {
            success: true,
            data: { id: '38aa16ea-69b5-4d2e-abb0-8d512094b430' }
        };
    }
}

class UpdateSectionGroupMock implements IQuery<Error, RecordInput> {
    async run({ record }: RecordInput): Promise<ExecutionResult<Error>> {
        if (!sectionGroupMocks[record.id])
            return {
                success: false,
                error: new ResourceNotFoundException({
                    message: 'task does not exists',
                    $metadata: null
                })
            };
        return { success: true };
    }
}

class GetGroupsWithSectionMock
    implements IQuery<Error, IdInput, RecordListOutput>
{
    async run({
        id
    }: IdInput): Promise<ExecutionResult<Error, RecordListOutput>> {
        if (sectionMocks[id])
            return {
                success: true,
                data: {
                    records: Object.values(sectionGroupMocks).filter(
                        (group) => group.sectionIds.includes(id)
                    )
                }
            };

        return {
            success: true,
            data: {
                records: []
            }
        };
    }
}

export class SectionsGroupDatabaseMock implements ISectionsGroupDatabase {
    public readonly queries: {
        createGroup: CreateSectionGroupMock;
        deleteGroup: DeleteSectionGroupMock;
        getGroup: GetSectionGroupMock;
        updateGroup: UpdateSectionGroupMock;
        getGroupsWithSection: GetGroupsWithSectionMock;
    };

    constructor() {
        this.queries = {
            createGroup: new CreateSectionGroupMock(),
            deleteGroup: new DeleteSectionGroupMock(),
            getGroup: new GetSectionGroupMock(),
            updateGroup: new UpdateSectionGroupMock(),
            getGroupsWithSection: new GetGroupsWithSectionMock()
        };
    }
}
