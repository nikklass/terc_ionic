import { Profile } from '../../models/profiles/profile.interface';

const profileList: Profile[] = [
	{ id: "1", first_name: "Nikk", last_name: "OK", phone: "0720765433", phone_country: "KE" },
	{ id: "2", first_name: "Smith", last_name: "OK", phone: "0720765433", phone_country: "KE" },
	{ id: "3", first_name: "Jane", last_name: "OK", phone: "0720765433", phone_country: "KE" },
	{ id: "4", first_name: "Kim", last_name: "OK", phone: "0720765433", phone_country: "KE" }
];

export const PROFILE_LIST = profileList;