import { Channel } from './channel.interface';
import { Pagination } from '../pagination/pagination.interface';

export interface ChannelResultList {

	  data: Channel[],
	  meta?: Pagination

}