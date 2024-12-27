import { Request } from "express";
import { browseBodySchema, deleteBodySchema } from "../../schemas/user_schema";
import { BadRequest } from "../../errors/CustomErrors";
import * as user from "../../bzl/coreBzl/user";
import { RequestWrapper, UserBrowseFilter, UserRoleEnum } from "../../types";
import { getUserContext } from "../../routes/helper";
import _ from "lodash";

export class UserMiddleware {
    public async delete(req: RequestWrapper) {
        const userContext = getUserContext(req);

        const deleteRequestBody = deleteBodySchema.safeParse(req.body);
        if(deleteRequestBody.success === false) {
            throw new BadRequest('Invalid parameters');
        }

        return user._delete(userContext, deleteRequestBody.data);
    }

    public async browse(req: RequestWrapper) {
        const usercontext = getUserContext(req);

        const browseBody = browseBodySchema.safeParse(req.body);
        if(browseBody.success === false) {
            throw new BadRequest('Invalid parameters');
        }

        let browseFilter: UserBrowseFilter = _.cloneDeep(browseBody.data) as UserBrowseFilter;
        // browseFilter.role = browseBody.data.role ? UserRoleEnum[browseBody.data.role] : delete browseFilter.role;
        if(browseBody.data.role) {
            browseFilter.role = UserRoleEnum[browseBody.data.role]
        } else {
            delete browseFilter.role;
        }
        return user.browse(usercontext, browseFilter);
    }
}