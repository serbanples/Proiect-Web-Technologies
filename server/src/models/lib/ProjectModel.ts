import mongoose from "mongoose";
import { ProjectModelType } from "../types";
import { AbstractModel } from "./AbstractModel";
import { transformFn } from "../utils/utils";
import { ModelNameEnum, PopulateOpts } from "../utils/types";

export class ProjectModel extends AbstractModel<ProjectModelType>{
    protected SchemaDef: mongoose.SchemaDefinition = {
        name: { type: String, required: true, unique: false },
        createdBy: { type: mongoose.Types.ObjectId, required: true, ref: ModelNameEnum.USER },
        createdAt: { type: Date, required: true },
        description: { type: String },
        prefferedColor: { type: String, default: '#000000' },
        team: { type: mongoose.Types.ObjectId, ref: ModelNameEnum.TEAM }
    };

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'projects',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn }
    }

    protected textSearchFields: string[] = ['name'];

    protected populateOptions: PopulateOpts = [
        { path: 'createdBy', model: ModelNameEnum.USER, select: 'name email' },
        { path: 'team', model: ModelNameEnum.TEAM, select: 'name'}
    ];

    constructor(Mongoose: mongoose.Mongoose) {
        super(Mongoose, ModelNameEnum.PROJECT);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        
    }

}