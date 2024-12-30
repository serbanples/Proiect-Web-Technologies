import _ from "lodash";
import { ProjectModel } from "../../models/lib/ProjectModel";
import { ProjectModelType } from "../../models/types";
import { ProjectBrowseFilter, ProjectInfo, ProjectRequest, ProjectUpdateRequest, ResourceWithPagination, UserContext } from "../../types";
import { formatPaginationFilter } from "../utils";
import { NotFound } from "../../errors/CustomErrors";

export class ProjectLib {
    private projectModel: ProjectModel;

    constructor(model: ProjectModel) {
        this.projectModel = model;
    }

    async createProject(usercontext: UserContext, project: ProjectRequest): Promise<ProjectModelType> {
        const savedProject: ProjectInfo = {
            name: project.name,
            description: project.description,
            createdAt: new Date(),
            createdBy: usercontext.id
        }

        return this.projectModel.create(savedProject);
    }

    async browseProjects(filter: ProjectBrowseFilter): Promise<ResourceWithPagination<ProjectModelType>> {
        const pagination = formatPaginationFilter(filter.pagination);

        return this.projectModel.findWithPagination(pagination, filter, filter.populate);
    }

    async deleteProjects(ids: string[]): Promise<number> {
        const filter = {
            _id: { $in: ids }
        }

        return this.projectModel.deleteMany(filter).then(result => result.deletedCount);
    }

    async updateProject(id: string, project: ProjectUpdateRequest): Promise<ProjectModelType> {
        return this.projectModel.updateOnePartial({ _id: id }, project)
            .then(result => {
                if(_.isNil(result)) {
                    throw new NotFound("Project not found");
                }

                return result;
            });
    }
}