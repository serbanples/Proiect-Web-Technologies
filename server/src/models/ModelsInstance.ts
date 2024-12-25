import * as mongoose from 'mongoose'
import { UserModel } from './lib/UserModel';

export class ModelsInstance {
    private mongoose: mongoose.Mongoose;
    public userModel: UserModel;

    constructor(mongoose: mongoose.Mongoose) {
        this.mongoose = mongoose;
        this.userModel = new UserModel(mongoose);
    }


}