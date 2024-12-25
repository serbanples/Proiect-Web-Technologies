// import * as mongoose from 'mongoose';
//  
// import { AbstractModel } from './AbstractModel'
// import { transformFn, transformObjectId } from './utils';
// import { RepoReferenceType, ResourceType } from '../types';
// import { ModelNameEnum, PopulateOpts } from '../types/internalTypes';
// import { UserModelType } from '../types';
//  
// /**
// * Concrete class that defines the RepoReferenceModel Model.
// */
// export class UserModel extends AbstractModel<UserModelType>{
//     /**
//      * Schema definition of the RepoReferenceModel Model.
//      * Observations!
//      *  ObjectIds attributes will be returned as strings.
//      */
//     protected SchemaDef: mongoose.SchemaDefinition = {
//         name: { type: String, required: true, unique: true },
//         repoPath: { type: String, required: true },
//         type: { type: String, required: true, enum: Object.values(ResourceType) },
//         isLatest: { type: Boolean },
//         registered: { type: Boolean, required: true, default: false },
//         registeredAt: { type: Date },
//         registeredBy: { type: mongoose.Types.ObjectId, ref: 'User', get: transformObjectId },
//         unregisteredAt: { type: Date },
//         unregisteredBy: { type: mongoose.Types.ObjectId, ref: 'User', get: transformObjectId },
//         lang: { type: String, maxlength: 30 },
//         dbType: { type: String, maxlength: 30 },
//         fromMajorVersion: { type: String, maxlength: 3 },
//         toMajorVersion: { type: String, maxlength: 3 },
//         fromMinorVersion: { type: String, maxlength: 3 },
//         toMinorVersion: { type: String, maxlength: 3 },
//         fromPatch: { type: String, maxlength: 3 },
//         toPatch: { type: String, maxlength: 3 },
//         //potential: { type: Number}, // Only for incremental packs.
//         hasChangelog: { type: Boolean, required: false }, // Only for incremental packs. (#63334)
//         buildDate: { type: Date }, // Build date of the file
//         publishedAt: { type: Date }, // Last modification of the file in storage (currently FTP)
//         size: { type: Number },
//         numberOfDownloads: { type: Number},
//         potential: { type: Number },
//         numberOfApplied: { type: Number},
//         isLatestRegistered:{type:Boolean},
//         isLatestUnregistered:{type:Boolean}
//     };
//  
//     /**
//      * Schema options of the RepoReferenceModel Model.
//      */
//     protected SchemaOptions: mongoose.SchemaOptions = {
//         collection: 'repoReferences',
//         toObject: { getters: true, transform: transformFn },
//         toJSON: { getters: true, transform: transformFn }
//     }

//     /**
//      * List of Model fields used for query text search.
//      */
//     protected textSearchFields: string[] = ['name'];
//  
//     /**
//      * List of options to populate.
//      */
//     protected populateOptions: PopulateOpts = [
//         { path: 'registeredBy', model: ModelNameEnum.USER, select: 'firstName lastname email role' },
//         { path: 'unregisteredBy', model: ModelNameEnum.USER, select: 'firstName lastname email role' }
//     ];
//  
//     constructor(Mongoose: mongoose.Mongoose) {
//         super(Mongoose, ModelNameEnum.REPO_REFERENCE);
//         this.setup();
//     }
//  
//     /**
//      * Method used to add custom logic to current schema.
//      *
//      * @returns {void}
//      */
//     protected addSchemaEnhancement(): void {
//         this.Schema.index({ name: 1 });
//         this.Schema.index({ registered: 1 });
//         this.Schema.index({ name: 1, registered: 1 });
//     }
// }