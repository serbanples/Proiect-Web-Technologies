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
    STANDBY = 'standby',
    NEW = 'new',
}

export interface TeamModelType extends ModelType {

}

export interface ProjectModelType extends ModelType {
    name: string;
}

export interface ModelType extends mongoose.Document {
    id: string;
}