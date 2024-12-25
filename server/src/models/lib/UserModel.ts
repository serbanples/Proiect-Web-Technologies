import mongoose, { SchemaDefinitionProperty } from "mongoose";
import { Abs } from "./Abs";
import { ModelNameEnum, PopulateOpts } from "../utils/types";
import { UserModelType } from "../types";
import { transformFn } from "../utils/utils";

export class UserModel extends Abs<UserModelType> {
    protected SchemaDef: mongoose.SchemaDefinition = {
        name: { type: String, required: true, unique: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date }
    };

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'users',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn }
    }

    protected textSearchFields: string[] = ['email, name'];

    protected populateOptions: PopulateOpts = [];

    constructor(Mongoose: mongoose.Mongoose) {
        super(Mongoose, ModelNameEnum.USER);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        this.Schema.index({ name: 1 });
        this.Schema.index({ email: 1 });
    }
}