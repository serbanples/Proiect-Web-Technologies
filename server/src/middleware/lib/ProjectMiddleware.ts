import { getUserContext } from "../../routes/helper";
import { RequestWrapper, TaskBrowseFilter, TaskRequest } from "../../types";
import * as task from "../../bzl/coreBzl/task";
import _ from "lodash";

export class ProjectMiddleware {
    public async create(req: RequestWrapper) {
        const userContext = getUserContext(req);

        const createdTask: TaskRequest = JSON.parse(JSON.stringify({
            name: req.body.name,
            project: req.body.project,
            dueDate: req.body.dueDate,
            assignedTo: req.body.assignedTo,
            priority: req.body.priority,
            status: req.body.status,
            description: req.body.description,
        }));

        return task.create(userContext, createdTask);
    }

    public async browse(req: RequestWrapper) {
        const usercontext = getUserContext(req);

        const filter: TaskBrowseFilter = JSON.parse(JSON.stringify({
            _id: req.body.id,
            project: req.body.project,
            createdBy: req.body.createdBy,
            assignedTo: req.body.assignedTo,
            priority: req.body.priority,
            status: req.body.status,
            pagination: req.body.pagination,
            text: req.body.text,
            populate: req.body.populate,
        }));

        return task.browse(usercontext, filter);
    }
}