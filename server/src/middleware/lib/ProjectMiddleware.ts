import { getUserContext } from "../../routes/helper";
import { ProjectBrowseFilter, ProjectRequest, ProjectUpdateRequest, RequestWrapper, TaskBrowseFilter, TaskRequest } from "../../types";
import * as project from "../../bzl/coreBzl/project";
import _ from "lodash";

export class ProjectMiddleware {
    public async create(req: RequestWrapper) {
        const userContext = getUserContext(req);

        const projectRequest: ProjectRequest = JSON.parse(JSON.stringify({
            name: req.body.name,
            description: req.body.description,
        }));

        return project.create(userContext, projectRequest);  
    }

    public async browse(req: RequestWrapper) {
        const usercontext = getUserContext(req);

        const filter: ProjectBrowseFilter = JSON.parse(JSON.stringify({
            _id: req.body.id,
            pagination: req.body.pagination,
            text: req.body.text,
            populate: req.body.populate,
        }));

        return project.browse(usercontext, filter);
    }

    public async delete(req: RequestWrapper) {
        const usercontext = getUserContext(req);

        const ids: string[] = JSON.parse(JSON.stringify(req.body.ids));

        return project._delete(usercontext, ids);
    }

    public async update(req: RequestWrapper) {
        const usercontext = getUserContext(req);
        const id: string = JSON.parse(JSON.stringify(req.body.id));
        const projectUpdate: ProjectUpdateRequest = JSON.parse(JSON.stringify({
            name: req.body.name,
            description: req.body.description,
        }));

        return project.update(usercontext, id, projectUpdate);
    }
}