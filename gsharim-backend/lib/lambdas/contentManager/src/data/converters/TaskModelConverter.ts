import {
    DataTypes,
    IConverter,
    TaskModel,
    TaskModelSchema,
    TaskRecord
} from '@eco8200/backend-common';
import lodash from 'lodash';

export default class TaskModelConverter
    implements IConverter<TaskRecord, TaskModel>
{
    toDataTransfer(source: TaskRecord): TaskModel {
        const data = lodash.omit(source, ['type', 'created_at', 'updated_at']);

        return TaskModelSchema.parse(data);
    }
    toDatabaseRecord(source: TaskModel): TaskRecord {
        return {
            ...source,
            type: DataTypes.Task,
            created_at: null,
            updated_at: null
        };
    }
}
