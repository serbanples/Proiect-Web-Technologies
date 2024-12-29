export type PopulateOpts = {
    path: string;
    model?: ModelNameEnum,
    select: string
}[];

export enum ModelNameEnum {
    USER = 'User',
    PROJECT = 'Project',
    TEAM = 'Team',
    TASK = 'Task'
}

export interface PaginationFilter {
    fromItem: number;
    pageSize: number;
    orderBy: string;
    orderDir: 'asc' | 'desc';
}