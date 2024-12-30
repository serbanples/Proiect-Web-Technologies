import _ from "lodash";
import { GET_REQUEST, POST_REQUEST } from "./requests";
import { TaskStatusEnum } from "./serviceTypes";
import { Task } from "../components/types";

export const browseTasksRequest = async () => {
    return POST_REQUEST('/task/browse', { populate: true })
        .then(async (response) => {
            if(response.status === 200) {
                const tasks = await response.json();
                return tasks.result as Task[];
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        })
}

export const findTaskByIdRequest = async (id: string) => {
    return POST_REQUEST('/task/browse', { id: id, populate: true })
        .then(async (response) => {
            if(response.status === 200) {
                const task = await response.json();
                return task.result[0] as Task;
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        })
}

export const findTasksByAssigneeRequest = async (assigneeId: string, filters: any) => {
    return POST_REQUEST('/task/browse', { assignedTo: assigneeId, populate: true, ...filters })
        .then(async (response) => {
            if(response.status === 200) {
                const task = await response.json();
                return task.result as Task[];
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        })
}

export const getTaskStatusesRequest = async () => {
    return GET_REQUEST('/task/statuses')
        .then(async (response) => {
            if(response.status === 200) {
                const statuses: TaskStatusEnum[] = await response.json();
                return formatStatuses(statuses);
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        })
}

export const updateTaskRequest = async (taskId: string, task: any) => {
    return POST_REQUEST('/task/update', { id: taskId, task: task })
        .then(async (response) => {
            const task = await response.json();
            return task.result as Task;
        })
}

const formatStatuses = (statuses: TaskStatusEnum[]) => {
    return _.map(statuses, (status) => {
        switch(status) {
            case TaskStatusEnum.IN_PROGRESS:
                return { value: TaskStatusEnum.IN_PROGRESS, label: "In Progress" };
            case TaskStatusEnum.DONE:
                return { value: TaskStatusEnum.DONE, label: "Done" };
            case TaskStatusEnum.CLOSED:
                return { value: TaskStatusEnum.CLOSED, label: "Closed" };
            case TaskStatusEnum.DEV_QA:
                return { value: TaskStatusEnum.DEV_QA, label: "Dev QA" };
            case TaskStatusEnum.NEW:
                return { value: TaskStatusEnum.NEW, label: "New" };
        }
    })
}