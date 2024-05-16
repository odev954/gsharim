import Avatar from "./avatar";

export default interface UserDetails {
	name: string;
	email: string;
	phone: string;
	birthday: Date;
	institutes: string[];
	address: string;
	gender: string;
	avatar: Avatar;
}
