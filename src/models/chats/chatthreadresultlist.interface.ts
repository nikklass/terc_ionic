import { Chatthread } from './chatthread.interface';
import { Pagination } from '../pagination/pagination.interface';

export interface ChatthreadResultList {

	  data: Chatthread[],
	  meta?: Pagination

}