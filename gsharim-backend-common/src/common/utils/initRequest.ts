import { IRequest } from "../models/abstract/session";
import { v4 as uuid } from "uuid";

export default function initRequest(request: IRequest): IRequest {
	request.id = uuid();
	request.timestamp = Math.floor(Date.now() / 1000);

	return request;
}
