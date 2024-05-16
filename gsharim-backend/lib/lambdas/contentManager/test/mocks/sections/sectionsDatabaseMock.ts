import { ExecutionResult, IQuery } from '@eco8200/backend-common';
import ISectionsDatabase, {
    IdInput,
    IdOutput,
    RecordInput,
    RecordOutput
} from '../../../src/data/abstract/sectionsDatabase';
import { sectionMocks } from './sectionMocks';
import { ResourceNotFoundException } from '@aws-sdk/client-dynamodb';

class GetSectionMock implements IQuery<Error, IdInput, RecordOutput> {
    async run({ id }: IdInput): Promise<ExecutionResult<Error, RecordOutput>> {
        if (!sectionMocks[id])
            return {
                success: false,
                error: new ResourceNotFoundException({
                    message: 'task does not exists',
                    $metadata: null
                })
            };

        return {
            success: true,
            data: { record: sectionMocks[id] }
        };
    }
}

class DeleteSectionMock implements IQuery<Error, IdInput> {
    async run({ id }: IdInput): Promise<ExecutionResult<Error>> {
        if (!sectionMocks[id])
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

class CreateSectionMock implements IQuery<Error, RecordInput, IdOutput> {
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

class UpdateSectionMock implements IQuery<Error, RecordInput> {
    async run({ record }: RecordInput): Promise<ExecutionResult<Error>> {
        if (!sectionMocks[record.id])
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

export class SectionsDatabaseMock implements ISectionsDatabase {
    public readonly queries: {
        createSection: CreateSectionMock;
        deleteSection: DeleteSectionMock;
        getSection: GetSectionMock;
        updateSection: UpdateSectionMock;
    };

    constructor() {
        this.queries = {
            createSection: new CreateSectionMock(),
            deleteSection: new DeleteSectionMock(),
            getSection: new GetSectionMock(),
            updateSection: new UpdateSectionMock()
        };
    }
}
