import mongoose from "mongoose";
import { TaskModelType } from "../types";
import { AbstractModel } from "./AbstractModel";
import { ModelNameEnum, PopulateOpts } from "../utils/types";
import { transformFn } from "../utils/utils";

export class TaskModel extends AbstractModel<TaskModelType> {
    protected SchemaDef: mongoose.SchemaDefinition = {
        name: { type: String, required: true },
        displayId: { type: String, required: true },
        createdBy: { type: mongoose.Types.ObjectId, required: true, ref: ModelNameEnum.USER },
        project: { type: mongoose.Types.ObjectId, required: true, ref: ModelNameEnum.PROJECT },
        createdAt: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        assignedTo: { type: mongoose.Types.ObjectId },
        priority: { type: String, required: true },
        status: { type: String },
        description: { type: String },
        percentageCompleted: { type: Number, default: 0 },
    }

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'tasks',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn },
    }

    protected textSearchFields: string[] = ['name', 'displayId'];

    protected populateOptions: PopulateOpts = [
        { path: 'createdBy', model: ModelNameEnum.USER, select: 'name email' },
        { path: 'assignedTo', model: ModelNameEnum.USER, select: 'name email' },
        { path: 'project', model: ModelNameEnum.PROJECT, select: 'name prefferedColor' }
    ];

    constructor(Mongoose: mongoose.Mongoose) {
        super(Mongoose, ModelNameEnum.TASK);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        this.Schema.index({ name: 1 });
        this.Schema.index({ displayId: 1 });
    }

}