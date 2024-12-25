import _ from "lodash";
import { config } from "../../config/config";
import { QueryPaginationFilter } from "../../types";
import { PaginationFilter } from "./types";

export const transformFn = (doc: any, ret: any, options: any): void => {
    if(ret._id)
        ret._id = ret._id.toString();
    delete ret._id;
    delete ret._v;
}

/**
 * Helper function used to turn a given value to a boolean
 * 
 * @param {any} value value to turn in a boolean
 * @returns {boolean} boolean
 */
export const toBoolean = (value: any): boolean => {
    //true
    if(value === true) return true;
    if(value === '1') return true;
    if(value === 1) return true;
    if(value === 'true') return true;

    // false
    if(value === false) return false;
    if(value === 'false') return false;
    if(value === -1) return false;
    if(value === '-1') return false;
    if(value === 0) return false;
    if(value === '0') return false;
    
    // default
    return false;
}

/**
 * Helper method used to return the maximum number of documents we can query.
 * 
 * @returns {number} Maximum number of documents we can retrieve.
 */
export const getQueryLimit = (): number => {
    return config.mongoQueryLimit;
}

/**
 * Helper method used to create the pagination filter for mongo query.
 * 
 * @param {QueryPaginationFilter} originalPagination pagination filter from request.
 * @returns {PaginationFilter} validated pagination.
 */
export const validatePaginationFilter = (originalPagination: QueryPaginationFilter): PaginationFilter => {
    const fromItem: number = 
        originalPagination.fromItem ? originalPagination.fromItem : 0;
    const pageSize: number = 
        originalPagination.pageSize && originalPagination.pageSize < 50 ? originalPagination.pageSize : 50;
    const orderBy: string = originalPagination.orderBy ?? 'id';
    const orderDir: 'asc' | 'desc' = originalPagination.orderDir ?? 'asc';

    return {
        fromItem: fromItem,
        pageSize: pageSize,
        orderBy: orderBy,
        orderDir: orderDir,
    }
}

export const addTextQuery = (textFilter: string, searchFields: string[], query: object): object => {
    const text = textFilter || '';
    query = _.omit(['text']);
    if(!_.isNil(text) && !_.isEmpty(text) && !_.isEmpty(searchFields)) {
        const formattedText = quote(text);
        try {
            const regExp = new RegExp(formattedText, 'i');
            if(!query['$or'])
                query['$or'] = [];
            query['$or'] = _.concat(query['$or'], _.map(searchFields, (field) => {
                return _.zipObject([field], [regExp]);
            }));
        } catch (error) {}
    }
    
    return query;
}

export const cleanMongoQuery = (query: object): object => {
    return _.omit(query, ['text', 'pagination', 'populate']);
}

const quote = (text: string) => {
    let output = text.replace(/\(/g, '\\(');
    output = output.replace(/\)/g, '\\)');

    // quote square brackets
    output = output.replace(/\[/g, '\\[');
    output = output.replace(/\]/g, '\\]');

    // quote braces
    output = output.replace(/\{/g, '\\{');
    output = output.replace(/\}/g, '\\}');

    // quote backslash
    output = output.replace(/\\/g, '\\');
    return output;
}