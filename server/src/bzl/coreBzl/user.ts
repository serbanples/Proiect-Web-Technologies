import { authorize } from "../../authorize/authorize";
import { Factory } from "../../factory";
import { UserModelType } from "../../models/types";
import { ResourceWithPagination, UserBrowseFilter, UserContext, UserDeleteFilter, UserDeleteResponse } from "../../types";

export const _delete = async (usercontext: UserContext, filter: UserDeleteFilter): Promise<UserDeleteResponse> => {
    return authorize(usercontext, 'user', 'delete')
        .then(() => {
            return Factory.getInstance().getBzl().userLib.deleteUsers(filter);
        })
        .then((result) => {
            return {
                deleteCount: result
            } as UserDeleteResponse;
        })
}

export const browse = async (usercontext: UserContext, filter: UserBrowseFilter): Promise<ResourceWithPagination<UserModelType>> => {
    return authorize(usercontext, 'user', 'browse')
        .then(() => Factory.getInstance().getBzl().userLib.findUsers(filter));
}