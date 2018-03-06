import { Company } from './company.interface';
import { Pagination } from '../pagination/pagination.interface';

export interface CompanyResultList {

	  data: Company[],
	  meta?: Pagination

}