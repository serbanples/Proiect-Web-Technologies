import mongoose, { Mongoose } from "mongoose";
import { ModelNameEnum, PopulateOpts } from "../utils/types";
import { addTextQuery, cleanMongoQuery, getQueryLimit, toBoolean, validatePaginationFilter } from "../utils/utils";
import { logger } from "../../logger";
import _ from "lodash";
import { error } from "console";
import { QueryPaginationFilter, ResourceWithPagination } from "../../types";

export abstract class Abs<ModelType extends mongoose.Document> {
    protected abstract SchemaDef: mongoose.SchemaDefinition;
    protected abstract SchemaOptions: mongoose.SchemaOptions;

    protected abstract textSearchFields: string[];
    protected abstract populateOptions: PopulateOpts;

    protected Schema!: mongoose.Schema;
    protected Model!: mongoose.Model<ModelType>;

    protected ModelName: ModelNameEnum;
    private readonly Mongoose: mongoose.Mongoose;

    constructor(mongoose: Mongoose, modelName: ModelNameEnum) {
        this.Mongoose = mongoose;
        this.ModelName = modelName;
    }

    /**
     * Method used to instantiate a concrete Model and Schema.
     * 
     * @returns {void}
     */
    protected setup(): void {
        this.setupSchema();
        this.addSchemaEnhancement();
        this.setupModel();
    }

    /**
     * Method used by concrete classes to add custom functionality to concrete schema
     * 
     * @returns {void}
     */
    protected abstract addSchemaEnhancement(): void;

    /**
     * Method used to instantiate a concrete schema.
     * 
     * @returns {void}
     */
    private setupSchema(): void {
        this.Schema = new this.Mongoose.Schema(this.SchemaDef, this.SchemaOptions);
    }

    /**
     * Method used to instantiate a concrete model.
     * 
     * @returns {void}
     */
    private setupModel(): void {
        try {
            this.Model = this.Mongoose.model<ModelType>(this.ModelName, this.Schema);
        }
        catch (error: any) {
            if (error && error.name === 'OverwriteModelError') this.Model = this.Mongoose.model<ModelType>(this.ModelName);
            else throw error;
        }
    }

    /**
     * Method used to return the concrete mongoose model.
     * 
     * @returns {ModelType} concrete model
     */
    getModel(): mongoose.Model<ModelType> {
        if(this.Model) return this.Model;
        else throw new Error('setup method was not called');
    }

    /* *************************************************** GENERIC METHODS ********************************************************* */

    /**
     * Method used to find one document.
     * 
     * @param {object} filter mongoDb query.
     * @param {object} projection Fields to return (optional, default all).
     * @param {boolean} populate Flag to mark if returned docs will be populated (optional, default false).
     * @returns {Promise<ModelType | null>} query response.
     */
    async findOne(filter: object, projection: object = {}, populate: boolean = false): Promise<ModelType | null> {
        if(!this.Model) throw new Error('Setup method was not called!');

        return this.Model.findOne(filter, projection).exec()
            .then(async response => response ? toBoolean(populate) ? this.Model.populate(response, this.populateOptions) : response : null)
            .then(response => response ? response.toObject() as ModelType : null)
            .catch(error => { logger.error(error); throw error; });
    }

    /**
     * Method used to find multiple documents using filtering.
     * 
     * @param {object} filter mongoDb query.
     * @param {object} projection Fields to return (optional, default all).
     * @param {boolean} populate Flag to mark if returned docs will be populated (optional, default false).
     * @returns {Promise<ModelType[]>} query response.
     */
    async findMany(filter: object, projection: object = {}, populate: boolean = false): Promise<ModelType[]> {
        if(!this.Model) throw new Error('Setup method was not called!');

        return this.Model.find(filter, projection).limit(getQueryLimit()).exec()
            .then(response => response ? toBoolean(populate) ? this.Model.populate(response, this.populateOptions) : response : [])
            .then(response => response ? _.map(response, (res) => res.toObject() as ModelType) : [])
            .catch(error => { logger.error(error); throw error; })
    }

    /**
     * Method used to count documents matching a certain filter
     * 
     * @param {object} filter mongoDb query. 
     * @returns {Promise<number>} number of documents.
     */
    async count(filter: object): Promise<number> {
        if(!this.Model) throw new Error('Setup method was not called!');

        return this.Model.where({ $and: filter }).countDocuments().exec()
            .catch(error => { logger.error(error); throw error; })
    }

    /**
     * Method used to get paginated documents.
     * 
     * @param {QueryPaginationFilter} pagination Pagination filter.
     * @param {object} query mongo db query.
     * @param {boolean} populate Flag to mark if returned docs will be populated (optional, default false).
     * @param {object} projection Fields to return (optional, default all).
     * @returns 
     */
    async findWithPagination(pagination: QueryPaginationFilter, query: object = {}, populate: boolean = false, projection: object = {}): Promise<ResourceWithPagination<ModelType>> {
        if(!this.Model) throw new Error('Setup method was not called!');

        const text = _.get(query, 'text', '');
        const { fromItem, pageSize, orderBy, orderDir } = validatePaginationFilter(pagination);
        const mongoQuery = addTextQuery(text, this.textSearchFields, cleanMongoQuery(query));
        return Promise.all([
            this.Model.countDocuments(mongoQuery).exec(),
            this.Model.find(query, projection).skip(fromItem).limit(pageSize).sort( { [orderBy]: orderDir === 'asc' ? 1 : -1 } ),
        ])
            .then(async ([count, result]) => { return toBoolean(populate) ? Promise.all([count, this.Model.populate(result, this.populateOptions)]) : Promise.all([count, result]); })
            .then(([count, response]) => {
                const totalPages = _.ceil(count / pageSize);
                return {
                    result: response ?  _.map(response, r => r.toObject() as ModelType) : [],
                    pagination: {
                        fromItem: fromItem,
                        perPage: pageSize,
                        totalPages: totalPages,
                        count: _.size(response),
                        totalCount: count
                    }
                }
            })
            .catch(error => { logger.error(error); throw error; })
    }

    async create(object: ModelType): Promise<ModelType> {
        if(!this.Model) throw new Error('Setup method was not called!');

        return this.Model.create(object)
            .then(response => response.toObject() as ModelType)
            .catch(error => { logger.error(error); throw error; })
    }

}