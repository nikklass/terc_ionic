import { Chatmessage } from './chatmessage.interface';
import { Pagination } from '../pagination/pagination.interface';

export interface ChatthreadMessageList {

	  data: Chatmessage[],
	  meta?: Pagination

}