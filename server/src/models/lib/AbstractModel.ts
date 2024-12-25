// import * as _ from 'lodash';
// import * as mongoose from 'mongoose';
//  
// import { logger } from '../../logger';
// import { ModelNameEnum, PopulateOpts } from '../types/internalTypes';
// import { AggregateSumResult, AnyObject, QueryPaginationFilter, RecursivePartial, ResourceWithPagination } from '../../types';
// import { formatPaginationFilter, addTextQuery, getDocQueryLimit, logError, cleanMongoQuery, toBoolean } from './utils';
//  
//  
// /* eslint-disable jsdoc/no-undefined-types*/
//  
// /**
// * Abstract class used to encapsulate the logic for creating a Mongoose Model.
// * It provides generic CRUD functions for Mongoose Model interaction.
// */
// export abstract class AbstractModel<ModelType extends mongoose.Document> {
//     protected abstract SchemaDef: mongoose.SchemaDefinition;
//     protected abstract SchemaOptions: mongoose.SchemaOptions;
//  
//     protected abstract textSearchFields: string[];
//     protected abstract populateOptions: PopulateOpts;
//  
//     protected Schema!: mongoose.Schema;
//     protected Model!: mongoose.Model<ModelType>;
//  
//     protected ModelName: ModelNameEnum;
//     private readonly Mongoose: mongoose.Mongoose;
//  
//     constructor(Mongoose: mongoose.Mongoose, modelName: ModelNameEnum) {
//         this.Mongoose = Mongoose;
//         this.ModelName = modelName;
//     }
//  
//     /**
//      * Method used by concrete classes to add custom functionality and logic
//      * to concrete schema.
//      *
//      * @returns {void}
//      */
//     protected abstract addSchemaEnhancement(): void;
//  
//     /**
//      * Method used to instantiate a concrete Model and Schema.
//      *
//      * @returns {void}
//      */
//     protected setup(): void {
//         this.setupSchema();
//         this.addSchemaEnhancement();
//         this.setupModel();
//     }
//  
//     /**
//      * Method used to instantiate a concrete Schema.
//      *
//      * @returns {void}
//      */
//     private setupSchema(): void {
//         this.Schema = new this.Mongoose.Schema(this.SchemaDef, this.SchemaOptions);
//     }
//  
//     /**
//      * Method used to instantiate a concrete Model.
//      *
//      * @returns {void}
//      */
//     private setupModel(): void {
//         try {
//             this.Model = this.Mongoose.model<ModelType>(this.ModelName, this.Schema);
//         }
//         // eslint-disable-next-line
//         catch (error: any) {
//             // eslint-disable-next-line
//             if (error && error.name === 'OverwriteModelError') this.Model = this.Mongoose.model<ModelType>(this.ModelName);
//             else throw error;
//         }
//     }
//  
//     /**
//      * Getter method used by concrete class to return the Mongoose Model.
//      *
//      * @returns {ModelType} Concrete Model.
//      */
//     getModel(): mongoose.Model<ModelType> {
//         if (this.Model) return this.Model;
//         else throw new Error('Setup method was not called!');
//     }
//  
//     /* ********************************************** Generic Methods ********************************************** */
//  
//     /**
//      * Generic method used to find a document based on a query.
//      *
//      * @param {object} filter MongoDB query like.
//      * @param {object} projection  Fields to return (optional, default all).
//      * @param {boolean} populate Flag to mark if returned docs will be populated.
//      * @returns {ModelType} query response
//      */
//     async findOne(filter: object, projection: object = {}, populate: boolean = false): Promise<ModelType | null> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         return this.Model.findOne(filter, projection).exec()
//             .then(async response => response ? toBoolean(populate) ? this.Model.populate(response, this.populateOptions) : response : null)
//             .then(response => response ? response.toObject() as ModelType : null)
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while findOne query!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to find multiple documents based on a query.
//      *
//      * @param {object} filter MongoDB query like.
//      * @param {object} projection  Fields to return (optional, default all).
//      * @param {boolean} populate Flag to mark if returned docs will be populated.
//      * @returns {ModelType[]} query response
//      */
//     async findMany(filter: object, projection: object = {}, populate: boolean = false): Promise<ModelType[]> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         return this.Model.find(filter, projection).limit(getDocQueryLimit()).exec()
//             .then(async response => response ? toBoolean(populate) ? this.Model.populate(response, this.populateOptions) : response : [])
//             .then(response => response ? _.map(response, r => r.toObject() as ModelType) : [])
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while findMany query!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to count documents based on query
//      *
//      * @param {object} filter MongoDB query like.
//      * @returns {number} query response
//      */
//     async count(filter: object[]): Promise<number> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         return this.Model.where({ $and: filter }).countDocuments().exec()
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while count query!'); throw error; });;
//     }
//  
//     /**
//      * Generic method used to sum all the values of a key in the collection
//      *
//      * @param {string} key key for which we want to sum the values
//      * @param {object} filter MongoDB query like.
//      * @returns {number} sum of the values
//      */
//     async sumValuesForKey(key: string, filter: object = {}): Promise<number> {
//         if(!this.Model) throw new Error('Setup method was not called');
//  
//         const aggregationPipeline = [
//             { $match: filter },
//             { $group: { _id: '', total: { $sum: `$${key}` } } },
//             { $project: { _id: 0, total: '$total' } }
//         ];
//  
//         return this.Model.aggregate(aggregationPipeline)
//             .then((response: AggregateSumResult[]) => { return response.length > 0 ? response[0].total : 0; })
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while sumValues query!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to query multiple documents with pagination.
//      *
//      * @param {QueryPaginationFilter} pagination Pagination filter.
//      * @param {object} query MongoDB query like.
//      * @param {boolean} populate Flag to mark if returned docs will be populated.
//      * @param {object} projection  Fields to return (optional, default all).
//      * @returns {ResourceWithPagination<ModelType>[]} query response with pagination.
//      */
//     async findWithPagination(pagination: QueryPaginationFilter, query: object = {}, populate: boolean = false, projection: object = {}): Promise<ResourceWithPagination<ModelType>> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         const text = _.get(query, 'text', '');
//         const paginationFiler = formatPaginationFilter(pagination);
//         const mongoQuery = addTextQuery(text, this.textSearchFields, cleanMongoQuery(query));
//         return Promise.all([
//             this.Model.count(mongoQuery).exec(),
//             this.Model.find(mongoQuery, projection).skip(paginationFiler.fromItem).limit(paginationFiler.pageSize)
//                 .sort({ [paginationFiler.orderBy]: paginationFiler.orderDir === 'asc' ? 1 : -1 }).exec()
//         ])
//             .then(async ([count, resources]) => { return toBoolean(populate) ? Promise.all([count, this.Model.populate(resources, this.populateOptions)]) : Promise.all([count, resources]) })
//             .then(([count, resources]) => {
//                 const pagesTotal = _.ceil(count / paginationFiler.pageSize);
//                 return {
//                     result: resources ? _.map(resources, r => r.toObject() as ModelType) : [],
//                     pagination: {
//                         fromItem: paginationFiler.fromItem,
//                         perPage: paginationFiler.pageSize,
//                         count: _.size(resources),
//                         totalPages: pagesTotal,
//                         totalCount: count
//                     }
//                 }
//             })
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while findWithPagination query!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to execute aggregate queries
//      * This method returns any. THE RESULT SHOULD BE CAST AFTER TO A CONCRETE TYPE.
//      *
//      * @param {mongoose.PipelineStage[]} pipeline MongoDB pipeline to execute
//      * @param {object} query MongoDB query like.
//      * @returns {Promise<AnyObject[]>} query response
//      */
//     async aggregate(pipeline: mongoose.PipelineStage[], query: object = {}): Promise<AnyObject[]> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         // add free text search filter as first pipeline stage of the aggregation
//         const text = _.get(query, 'text', '');
//         const mongoQuery = addTextQuery(text, this.textSearchFields, cleanMongoQuery(query));
//         const textSearch = _.omit(mongoQuery, 'packId');
//  
//         pipeline.unshift({
//             $match: textSearch,
//         });
//  
//         return this.Model.aggregate(pipeline);
//     }
//  
//     /**
//      * Generic method used to save a document in database.
//      *
//      * @param {RecursivePartial<ModelType>} object Object that will be saved.
//      * @returns {ModelType} saved object
//      */
//     async create(object: RecursivePartial<ModelType>): Promise<ModelType> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         return new this.Model(object).save()
//             .then(response => response.toObject() as ModelType)
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while creating document!'); throw error; });
//     }
//     /**
//      * Generic method used to update a document.
//      * By default it will return the updated document.
//      *
//      * @param {object} filter MongoDB query like.
//      * @param {object} updateObject MongoDB update object like.
//      * @param {mongoose.QueryOptions} options Mongoose updateOne options.
//      * @param {boolean} populate Flag to mark if returned docs will be populated.
//      * @returns {ModelType} updated object
//      */
//     async updateOne(filter: object, updateObject: object, options: mongoose.QueryOptions = {}, populate: boolean = false): Promise<ModelType | null> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         if (!_.has(options, 'new')) options.new = true;
//         return this.Model.findOneAndUpdate(filter, updateObject, options).exec()
//             .then(async response => response ? toBoolean(populate) ? this.Model.populate(response, this.populateOptions) : response : null)
//             .then(response => response ? response.toObject() as ModelType : null)
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while updating document!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to partial update a document.
//      * By default it will return the updated document.
//      *
//      * @param {object} filter MongoDB query like.
//      * @param {RecursivePartial<ModelType>} updateObject partial object.
//      * @param {mongoose.QueryOptions} options Mongoose updateOne options
//      * @param {boolean} populate Flag to mark if returned docs will be populated.
//      * @returns {ModelType} updated object
//      */
//     async updateOnePartial(filter: object, updateObject: RecursivePartial<ModelType>, options: mongoose.QueryOptions = {}, populate: boolean = false): Promise<ModelType | null> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         if (!_.has(options, 'new')) options.new = true;
//         return this.Model.findOneAndUpdate(filter, { $set: updateObject }, options).exec()
//             .then(async response => response ? toBoolean(populate) ? this.Model.populate(response, this.populateOptions) : response : null)
//             .then(response => response ? response.toObject() as ModelType : null)
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while partial updating document!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to update multiple documents.
//      *
//      * @param {object} filter MongoDB query like.
//      * @param {object} updateObject MongoDB update object like.
//      * @param {mongoose.QueryOptions} options Mongoose updateOne options
//      * @returns {mongoose.UpdateWriteOpResult} Mongoose update result.
//      */
//     async updateMany(filter: object, updateObject: object, options: mongoose.QueryOptions = {}): Promise<mongoose.UpdateWriteOpResult> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         return this.Model.updateMany(filter, updateObject, options).exec()
//             .then(response => response)
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while updating documents!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to delete a document.
//      *
//      * @param {object} filter MongoDB query like.
//      * @returns {ModelType} updated object
//      */
//     async deleteOne(filter: object): Promise<mongoose.mongo.DeleteResult> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//  
//         return this.Model.deleteOne(filter).exec()
//             .then(response => response)
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while deleting document!'); throw error; });
//     }
//  
//     /**
//      * Generic method used to delete multiple documents.
//      *
//      * @param {object} filter MongoDB query like.
//      * @param {boolean} force Flag to force a delete all query.
//      * @returns {ModelType} updated object
//      */
//     async deleteMany(filter: object, force: boolean = false): Promise<mongoose.mongo.DeleteResult> {
//         if (!this.Model) throw new Error('Setup method was not called!');
//         if (_.isEmpty(filter) && !force) throw new Error('Delete all is not allowed without force flag.');
//  
//         return this.Model.deleteMany(filter).exec()
//             .then(response => response)
//             .catch(error => { logger.error({ error: logError(error), model: this.ModelName }, 'Error while deleting documents!'); throw error; });
//     }
// }