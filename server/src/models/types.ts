import mongoose from "mongoose";

export interface UserModelType extends ModelType {
    name: string;
    password: string;
    email: string;
    createdAt: Date;   
}

export interface ModelType extends mongoose.Document {
    id: string;
}