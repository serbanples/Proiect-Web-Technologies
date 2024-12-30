import _ from "lodash";
import { BadRequest, NotFound } from "../../errors/CustomErrors";
import { Factory } from "../../factory";
import { TaskModel } from "../../models/lib/TaskModel";
import { ResourceWithPagination, TaskBrowseFilter, TaskInfo, TaskRequest, TaskUpdateRequest, UserContext } from "../../types";
import { formatPaginationFilter } from "../utils";
import { TaskModelType, TaskStatusEnum } from "../../models/types";

export class TaskLib {
    private taskModel: TaskModel;

    constructor(model: TaskModel) {
        this.taskModel = model;
    }

    async browse(browseFilter: TaskBrowseFilter): Promise<ResourceWithPagination<TaskModelType>> {
        const pagination = formatPaginationFilter(browseFilter.pagination);

        return this.taskModel.findWithPagination(pagination, browseFilter, browseFilter.populate);
    }

    async deleteTask(taskIds: string[]): Promise<number> {
        const filter = { _id: {
            $in: taskIds,
        }};
        
        return this.taskModel.deleteMany(filter)
            .then(response => response.deletedCount);
    }

    async createTask(usercontext: UserContext, taskObject: TaskRequest): Promise<TaskModelType> {
        console.log(usercontext);
        const savedTask: TaskInfo = {
            name: taskObject.name,
            displayId: await this.generateTaskDisplayId(taskObject.project),
            project: taskObject.project,
            createdBy: usercontext.id,
            createdAt: new Date(),
            dueDate: taskObject.dueDate,
            assignedTo: taskObject.assignedTo,
            priority: taskObject.priority,
            status: taskObject.status || TaskStatusEnum.NEW,
            description: taskObject.description,
            percentageCompleted: 0,
        }

        return this.taskModel.create(savedTask).then();
    }

    async updateTask(taskId: string, taskObject: TaskUpdateRequest): Promise<TaskModelType> {
        const filter = { _id: taskId };
        const update = {
            $set: taskObject
        };

        return this.taskModel.updateOnePartial(filter, taskObject)
            .then(response => {
                if(_.isNil(response)) throw new NotFound('Task not found!');
                return response;
            });
    }

    private async generateTaskDisplayId(projectId: string): Promise<string> {
        console.log(projectId);
        return this.taskModel.count({ project: projectId })
            .then(async (result) => {
                const project = await Factory.getInstance().getModels().projectModel.findOne({ _id: projectId });

                if(_.isNil(project)) throw new NotFound('Invalid project data!');
                return `${this.getProjectInitials(project.name)}-${result + 1}`;
            })
    }

    private getProjectInitials(projectName: string): string {
        const abbreviation = projectName.split(" ").map((word) => {
            return word.charAt(0).toUpperCase();
        })

        return abbreviation.join("");
    }
}