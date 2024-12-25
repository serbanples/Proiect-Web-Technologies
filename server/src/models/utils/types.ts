export type PopulateOpts = {
    path: string;
    model?: ModelNameEnum,
    select: string
}[];

export enum ModelNameEnum {
    USER = 'User',
}

export interface PaginationFilter {
    fromItem: number;
    pageSize: number;
    orderBy: string;
    orderDir: 'asc' | 'desc';
}