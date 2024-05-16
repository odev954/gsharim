import { AvailableAvatars } from "@eco8200/data-models";
import { mockAvailableIcons } from "mocks/demo/assets/profileIconsMock";

export const fetchAvailableIcons = async (): Promise<AvailableAvatars> => {
	return mockAvailableIcons();
};
