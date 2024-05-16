import { UserDetails } from "@eco8200/data-models";
import { mockAvailableIcons } from "../assets/profileIconsMock";

export const userDetailsMock = (): UserDetails => {
	return {
		name: "ישראל ישראלי",
		email: "example@gmail.com",
		avatar: mockAvailableIcons().avatars["1234-52hs-r523-23ad"],
		phone: "059-839-788",
		address: "TLV Itay Hadad Street No.6",
		gender: "male",
		birthday: new Date(Date.now()),
		institutes: [],
	};
};
