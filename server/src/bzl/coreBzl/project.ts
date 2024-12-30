import { ProjectUpdateRequest, UserContext } from "../../types";

import { ProjectBrowseFilter } from "../../types"

import { authorize } from "../../authorize/authorize";
import { ResourceWithPagination } from "../../types";
import { Factory } from "../../factory";
import { ProjectModelType } from "../../models/types";
import { ProjectRequest } from "../../types";

export const create = async (userContext: UserContext, project: ProjectRequest): Promise<boolean> => {
    return authorize(userContext, 'project', 'create')
        .then(() => Factory.getInstance().getBzl().projectLib.createProject(userContext,project))
        .then((result) => true);
}

export const browse = async (userContext: UserContext, filter: ProjectBrowseFilter): Promise<ResourceWithPagination<ProjectModelType>> => {
    return authorize(userContext, 'project', 'browse')
        .then(() => Factory.getInstance().getBzl().projectLib.browseProjects(filter));
}

export const _delete = async (userContext: UserContext, ids: string[]): Promise<number> => {
    return authorize(userContext, 'project', 'delete')
        .then(() => Factory.getInstance().getBzl().projectLib.deleteProjects(ids));
}

export const update = async (userContext: UserContext, id: string, project: ProjectUpdateRequest): Promise<ProjectModelType> => {
    return authorize(userContext, 'project', 'update')
        .then(() => Factory.getInstance().getBzl().projectLib.updateProject(id, project));
}