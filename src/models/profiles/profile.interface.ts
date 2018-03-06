/*import { Gender } from './gender.interface';
import { Country } from './country.interface';
import { State } from './state.interface';
import { City } from './city.interface';
import { Constituency } from './constituency.interface';
import { Ward } from './ward.interface';*/

export interface Profile {

	  id?: string,
	  user_id?: number,
	  first_name?: string,
	  last_name?: string,
	  phone_country?: string,
	  phone_country_name?: string,
	  email?: string,
	  active?: string,
	  status_id?: string,
	  phone?: string,
	  state_id?: string,
	  state?: string,
	  city_id?: string,
	  city?: string,
	  constituency_id?: string,
	  constituency?: string,
	  ward_id?: string,
	  ward?: string,
	  gender?: string,
	  gender_name?: string,
	  dob?: Date,
	  dob_updated?: number,
	  preferred_amount?: string,
	  preferred_amount_fmt?: string,
	  created_at?: Date,
	  updated_at?: Date,
	  deleted_at?: Date

}
