import { authorize } from "../../authorize/authorize"
import { Factory } from "../../factory";
import { TeamModelType } from "../../models/types";
import { ResourceWithPagination, TeamBrowseFilter, TeamRequest, TeamUpdateRequest, UserContext } from "../../types";

export const browseTeams = async (userContext: UserContext, filter: TeamBrowseFilter): Promise<ResourceWithPagination<TeamModelType>> => {
    return authorize(userContext, 'team', 'browse')
        .then(() => {
            return Factory.getInstance().getBzl().teamLib.browseTeams(filter);
        });
}

export const createTeam = async (userContext: UserContext, team: TeamRequest): Promise<boolean> => {
    return authorize(userContext, 'team', 'create')
        .then(() => {
            return Factory.getInstance().getBzl().teamLib.createTeam(userContext, team)
        })
        .then(() => true);
}

export const deleteTeams = async (userContext: UserContext, ids: string[]): Promise<number> => {
    return authorize(userContext, 'team', 'delete')
        .then(() => {
            return Factory.getInstance().getBzl().teamLib.deleteTeams(ids);
        });
}

export const updateTeam = async (userContext: UserContext, id: string, team: TeamUpdateRequest): Promise<TeamModelType> => {
    return authorize(userContext, 'team', 'update')
        .then(() => {
            return Factory.getInstance().getBzl().teamLib.updateTeam(id, team);
        });
}