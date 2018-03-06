import { Image } from '../images/image.interface';

export interface Company {

	id?: number,
    name?: string,
    description?: string,
    physical_address?: string,
    phone?: string,
    box?: string,
    email?: string,
    ussd_code?: string,
    sms_user_name?: string,
    latitude?: string,
    longitude?: string,
    status_id?: number,
    status?: string,
    user_signed?: boolean,
    user_join_request?: boolean,
    creator_id?: number,
    creator?: string,
    updater_id?: number,
    updater?: string,
    deleter_id?: number,
    deleter?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    main_image?:Image,
    images?: Image[]

}