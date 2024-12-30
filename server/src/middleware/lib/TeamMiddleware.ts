import { getUserContext } from "../../routes/helper";
import { RequestWrapper, TeamBrowseFilter, TeamRequest, TeamUpdateRequest } from "../../types";
import * as team from "../../bzl/coreBzl/team";
import _ from "lodash";

export class TeamMiddleware {
    public async create(req: RequestWrapper) {
        const userContext = getUserContext(req);

        const teamRequest: TeamRequest = JSON.parse(JSON.stringify({
            name: req.body.name,
            description: req.body.description,
        }));

        return team.createTeam(userContext, teamRequest);  
    }

    public async browse(req: RequestWrapper) {
        const usercontext = getUserContext(req);

        const filter: TeamBrowseFilter = JSON.parse(JSON.stringify({
            _id: req.body.id,
            pagination: req.body.pagination,
            text: req.body.text,
            populate: req.body.populate,
        }));

        return team.browseTeams(usercontext, filter);
    }

    public async delete(req: RequestWrapper) {
        const usercontext = getUserContext(req);

        const ids: string[] = JSON.parse(JSON.stringify(req.body.ids));

        return team.deleteTeams(usercontext, ids);
    }

    public async update(req: RequestWrapper) {
        const usercontext = getUserContext(req);
        const id: string = JSON.parse(JSON.stringify(req.body.id));
        const teamUpdate: TeamUpdateRequest = JSON.parse(JSON.stringify({
            name: req.body.name,
            description: req.body.description,
        }));

        return team.updateTeam(usercontext, id, teamUpdate);
    }
}