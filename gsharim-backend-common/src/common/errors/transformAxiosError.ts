import { HttpException, InternalServerErrorException } from "@nestjs/common";
import { isAxiosError } from "axios";

export function transformAxiosError(error: Error): HttpException {
	if (isAxiosError(error)) {
		if (error.response) {
			return new HttpException(
				error.response.data,
				error.response.status
			);
		}
	}

	return new InternalServerErrorException();
}
