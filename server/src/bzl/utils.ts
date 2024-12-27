import { QueryPaginationFilter } from "../types";

export const formatPaginationFilter = (pagination?: QueryPaginationFilter): QueryPaginationFilter => {
    if(pagination) return pagination;
    else return {
        pageSize: 50,
        fromItem: 0,
        orderBy: 'name',
        orderDir: 'asc'
    }
}