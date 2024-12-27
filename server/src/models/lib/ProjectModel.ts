import mongoose from "mongoose";
import { ProjectModelType } from "../types";
import { AbstractModel } from "./AbstractModel";
import { transformFn } from "../utils/utils";
import { ModelNameEnum, PopulateOpts } from "../utils/types";

export class ProjectModel extends AbstractModel<ProjectModelType>{
    protected SchemaDef: mongoose.SchemaDefinition = {
        name: { type: String, required: true, unique: false }
    };

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'projects',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn }
    }

    protected textSearchFields: string[] = [];

    protected populateOptions: PopulateOpts = [];

    constructor(Mongoose: mongoose.Mongoose) {
        super(Mongoose, ModelNameEnum.PROJECT);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        
    }

}