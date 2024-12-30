import mongoose from "mongoose";
import { TeamModelType } from "../types";
import { AbstractModel } from "./AbstractModel";
import { transformFn } from "../utils/utils";
import { ModelNameEnum, PopulateOpts } from "../utils/types";

export class TeamModel extends AbstractModel<TeamModelType> {
    protected SchemaDef: mongoose.SchemaDefinition = {
        name: { type: String, required: true, unique: true },
        members: [{ type: mongoose.Types.ObjectId, ref: ModelNameEnum.USER }],
        createdBy: { type: mongoose.Types.ObjectId, ref: ModelNameEnum.USER },
        createdAt: { type: Date },
        projects: [{ type: mongoose.Types.ObjectId, ref: ModelNameEnum.PROJECT }],
    }

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'teams',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn }
    }

    protected textSearchFields: string[] = [];

    protected populateOptions: PopulateOpts = [
        { path: 'members', model: ModelNameEnum.USER, select: 'name email' },
        { path: 'createdBy', model: ModelNameEnum.USER, select: 'name email' },
        { path: 'projects', model: ModelNameEnum.PROJECT, select: 'name description' },
    ];

    constructor(Mongoose: mongoose.Mongoose) {
        super(Mongoose, ModelNameEnum.TEAM);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        
    }

}