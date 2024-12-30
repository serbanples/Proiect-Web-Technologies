import { Request } from "express";
import { TaskPriorityEnum, TaskStatusEnum } from "./models/types";

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
    _id?: string;
    role?: UserRoleEnum;
    pagination?: QueryPaginationFilter;
}

export interface TaskBrowseFilter extends with_populate_optional, with_text_optional {
    _id?: string;
    project?: string;
    createdBy?: string;
    assignedTo?: string;
    priority?: TaskPriorityEnum;
    status?: TaskStatusEnum;
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

export interface TaskRequest {
    name: string;
    project: string;
    dueDate: Date;
    assignedTo?: string;
    priority: TaskPriorityEnum;
    status?: TaskStatusEnum;
    description?: string;
}

export interface TaskUpdateRequest {
    dueDate?: Date;
    assignedTo?: string;
    priority?: TaskPriorityEnum;
    status?: TaskStatusEnum;
    description?: string;
    percentageCompleted?: number;
}

// PROJECT

export interface ProjectRequest {
    name: string;
    description?: string;
}

export interface ProjectInfo {
    name: string;
    description?: string;
    createdAt: Date;
    createdBy: string;
}

export interface ProjectUpdateRequest {
    name?: string;
    description?: string;
}

export interface ProjectBrowseFilter extends with_text_optional, with_populate_optional {
    _id?: string;
    pagination?: QueryPaginationFilter;
}

// TEAM

export interface TeamRequest {
    name: string;
    description?: string;
}

export interface TeamUpdateRequest {
    name?: string;
    description?: string;
}

export interface TeamBrowseFilter extends with_text_optional, with_populate_optional {
    _id?: string;
    pagination?: QueryPaginationFilter;
}

export interface TeamInfo {
    name: string;
    description?: string;
    createdAt: Date;
    createdBy: string;
}

// Utils

export interface UserInfo {
    name: string;
    password: string;
    email: string;
    createdAt: Date; 
    role: UserRoleEnum;
}

export interface TaskInfo {
    name: string;
    displayId: string;
    project: string;
    createdBy: string;
    createdAt: Date;
    dueDate: Date;
    assignedTo?: string;
    priority: TaskPriorityEnum;
    status: TaskStatusEnum;
    description?: string;
    percentageCompleted?: number;
}

export interface RequestWrapper extends Request { 
    userContext?: UserContext;
}