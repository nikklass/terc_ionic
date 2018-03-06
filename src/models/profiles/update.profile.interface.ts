/*import { Gender } from './gender.interface';
import { Country } from './country.interface';
import { State } from './state.interface';
import { City } from './city.interface';
import { Constituency } from './constituency.interface';
import { Ward } from './ward.interface';*/

export interface UpdateProfile {

	  id: string,
	  first_name?: string,
	  last_name?: string,
	  status_id?: string,
	  phone_country?: string,
	  email?: string,
	  phone?: string,
	  state_id?: string,
	  city_id?: string,
	  constituency_id?: string,
	  ward_id?: string,
	  gender?: string,
	  dob?: Date,
	  dob_updated?: string,
	  preferred_amount?: string

}
