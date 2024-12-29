import { Request } from "express";
import { browseBodySchema, deleteBodySchema } from "../../schemas/user_schema";
import { BadRequest } from "../../errors/CustomErrors";
import * as user from "../../bzl/coreBzl/user";
import { RequestWrapper, UserBrowseFilter, UserDeleteFilter, UserRoleEnum } from "../../types";
import { getUserContext } from "../../routes/helper";
import _ from "lodash";

export class UserMiddleware {
    public async delete(req: RequestWrapper) {
        const userContext = getUserContext(req);

        const deleteBody: UserDeleteFilter = {
            ids: req.body.ids,
        };

        return user._delete(userContext, deleteBody);
    }

    public async browse(req: RequestWrapper) {
        const usercontext = getUserContext(req);

        const filter: UserBrowseFilter = {
            _id: req.body.id,
            role: req.body.role,
            pagination: req.body.pagination,
            text: req.body.text,
            populate: req.body.populate,
        }

        return user.browse(usercontext, filter);
    }
}