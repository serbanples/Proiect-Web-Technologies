export interface UserContext {
    id: string;
    email: string;
}

// QueryFilter

export interface QueryPaginationFilter {
    fromItem?: number;
    pageSize?: number;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
}

export interface ResourceWithPagination<T> {
    result: T[];
    pagination: {
        fromItem: number;
        perPage: number;
        count: number;
        totalPages: number;
        totalCount: number;
    }
}

// Requests

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmedPassword: string;
}

// Utils

export interface AnyObject {

}

export interface UserInfo {
    name: string;
    password: string;
    email: string;
    createdAt: Date; 
}