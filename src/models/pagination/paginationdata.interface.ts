import { Links } from './links.interface';

export interface PaginationData {

    current_page?: number;
    per_page?: number;
    total?: number;
    count?: number;
    total_pages?: number;
    links?: Links

}

