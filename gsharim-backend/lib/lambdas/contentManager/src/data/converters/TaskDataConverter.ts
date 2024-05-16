import {
    DataTypes,
    IConverter,
    TaskData,
    TaskDataSchema,
    TaskRecord
} from '@eco8200/backend-common';
import lodash from 'lodash';

export default class TaskConverter implements IConverter<TaskRecord, TaskData> {
    toDataTransfer(source: TaskRecord): TaskData {
        const data = lodash.omit(source, [
            'type',
            'created_at',
            'updated_at',
            'id'
        ]);

        return TaskDataSchema.parse(data);
    }
    toDatabaseRecord(source: TaskData): TaskRecord {
        return {
            id: '',
            ...source,
            type: DataTypes.Task,
            created_at: null,
            updated_at: null
        };
    }
}
