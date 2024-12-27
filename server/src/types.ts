import { Request } from "express";

export interface UserContext {
    id: string;
    email: string;
    role: UserRoleEnum;
}

export enum UserRoleEnum {
    USER = 'user',
    ADMIN = 'admin',
    MASTER = 'master'
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

export interface UserDeleteFilter {
    ids?: string[];
}

export interface UserBrowseFilter extends with_text_optional, with_populate_optional {
    role?: UserRoleEnum;
    pagination?: QueryPaginationFilter;
}

interface with_text_optional {
    text?: string;
}

interface with_populate_optional {
    populate?: boolean;
}

export interface UserDeleteResponse {
    deleteCount: number;
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
    confirmPassword: string;
}

// Utils

export interface AnyObject {

}

export interface UserInfo {
    name: string;
    password: string;
    email: string;
    createdAt: Date; 
    role: UserRoleEnum;
}

export interface RequestWrapper extends Request { 
    userContext?: UserContext;
}