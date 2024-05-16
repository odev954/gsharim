import { UpdateAvatar, AvatarSchema } from "@eco8200/data-models";
import axios from "axios";

export const updateAvatar = async ({ avatar }: UpdateAvatar): Promise<void> => {
	AvatarSchema.parse(avatar);

	const response = await axios.post(
		import.meta.env.VITE_ENDPOINT_MOCK,
		JSON.stringify(avatar)
	);

	if (!response.status) {
		const err = new Error(`HTTP status code: ${response.status}`);

		throw err;
	}
};
