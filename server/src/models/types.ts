import mongoose from "mongoose";
import { UserRoleEnum } from "../types";

export interface UserModelType extends ModelType {
    name: string;
    password: string;
    email: string;
    createdAt: Date;   
    role: UserRoleEnum;
}

export interface TeamModelType extends ModelType {

}

export interface ProjectModelType extends ModelType {

}

export interface ModelType extends mongoose.Document {
    id: string;
}