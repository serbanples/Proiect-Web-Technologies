import mongoose from "mongoose";
import { UserRoleEnum } from "../types";

export interface UserModelType extends ModelType {
    name: string;
    password: string;
    email: string;
    createdAt: Date;   
    role: UserRoleEnum;
}

export interface TaskModelType extends ModelType {
    name: string;
    displayId: string;
    project: string;
    createdBy: string;
    createdAt: Date;
    dueDate: Date;
    assignedTo: string;
    percentageCompleted: number;
    priority: TaskPriorityEnum;
    status: TaskStatusEnum;
    description: string;
}

export enum TaskPriorityEnum {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical',
}

export enum TaskStatusEnum {
    IN_PROGRESS = 'inProgress',
    DONE = 'done',
    CLOSED = 'closed',
    DEVQA = 'devqa',
    NEW = 'new', // maybe change to TO DO
}

export interface TeamModelType extends ModelType {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
}

export interface ProjectModelType extends ModelType {
    name: string;
    prefferedColor: string;
}

export interface ModelType extends mongoose.Document {
    id: string;
}