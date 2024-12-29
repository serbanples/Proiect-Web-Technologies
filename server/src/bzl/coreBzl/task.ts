import { authorize } from "../../authorize/authorize";
import { Factory } from "../../factory";
import { TaskModelType } from "../../models/types";
import { ResourceWithPagination, TaskBrowseFilter, TaskRequest, TaskUpdateRequest, UserContext } from "../../types";

export const create = async (userContext: UserContext, task: TaskRequest): Promise<boolean> => {
    return authorize(userContext, 'task', 'create')
        .then(() => Factory.getInstance().getBzl().taskLib.createTask(userContext, task))
        .then((result) => true)
}

export const browse = async (usercontext: UserContext, filter: TaskBrowseFilter): Promise<ResourceWithPagination<TaskModelType>> => {
    return authorize(usercontext, 'task', 'browse')
        .then(() => Factory.getInstance().getBzl().taskLib.browse(filter));
}

export const deleteTasks = async (usercontext: UserContext, taskIds: string[]): Promise<number> => {
    return authorize(usercontext, 'task', 'delete')
        .then(() => Factory.getInstance().getBzl().taskLib.deleteTask(taskIds));
}

export const updateTask = async (usercontext: UserContext, taskId: string, taskObject: TaskUpdateRequest): Promise<TaskModelType> => {
    return authorize(usercontext, 'task', 'update')
        .then(() => Factory.getInstance().getBzl().taskLib.updateTask(taskId, taskObject));
}