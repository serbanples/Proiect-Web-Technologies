import _ from "lodash";
import { TeamModel } from "../../models/lib/TeamModel";
import { TeamModelType } from "../../models/types";
import { ResourceWithPagination, TeamBrowseFilter, TeamInfo, TeamRequest, TeamUpdateRequest, UserContext } from "../../types";
import { formatPaginationFilter } from "../utils";
import { NotFound } from "../../errors/CustomErrors";

export class TeamLib {
    private model: TeamModel;
    
    constructor(teamModel: TeamModel) {
        this.model = teamModel;
    }

    public async createTeam(usercontext: UserContext, team: TeamRequest): Promise<TeamModelType> {
        const savedTeam: TeamInfo = {
            name: team.name,
            description: team.description,
            createdAt: new Date(),
            createdBy: usercontext.id
        }

        return this.model.create(savedTeam);
    }

    public async deleteTeams(ids: string[]): Promise<number> {
        return this.model.deleteMany({ _id: { $in: ids } })
            .then((result) => result.deletedCount);
    }

    public async updateTeam(id: string, team: TeamUpdateRequest): Promise<TeamModelType> {
        return this.model.updateOnePartial({ _id: id }, team)
            .then(result => {
                if(_.isNil(result)) {
                    throw new NotFound('Team not found');
                }

                return result;
            });
    }

    public async browseTeams(filter: TeamBrowseFilter): Promise<ResourceWithPagination<TeamModelType>> {
        const paginationFilter = formatPaginationFilter(filter.pagination);
        
        return this.model.findWithPagination(paginationFilter, filter, filter.populate);
    }
}