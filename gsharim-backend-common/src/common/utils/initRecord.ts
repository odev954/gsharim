import { IRecord } from "../models/abstract/record";
import { v4 as uuid } from "uuid";

export default function initRecord(record: IRecord, isUpdate = false): IRecord {
	if (!isUpdate) {
		record.id = uuid();
		record.created_at = Math.floor(Date.now() / 1000);
	}
	record.updated_at = Math.floor(Date.now() / 1000);

	return record;
}
