import { IResponse } from "../models/abstract/session";
import { v4 as uuid } from "uuid";

export default function initResponse(
	response: IResponse,
	requestId: string,
	success: boolean
): IResponse {
	response.id = uuid();
	response.timestamp = Math.floor(Date.now() / 1000);
	response.requestId = requestId;
	response.success = success;

	return response;
}
