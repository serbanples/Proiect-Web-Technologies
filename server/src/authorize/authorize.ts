import { readFile } from "fs/promises";
import { UserContext, UserRoleEnum } from "../types";
import * as authRules from "./authorization.json";
import { NotAvailable, Unauthorized } from "../errors/CustomErrors";

export const authorize = async (userContext: UserContext, moduleName: string, method: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        const userRole: UserRoleEnum = userContext.role;
        // remove this
        const userRoll = 'master';
    
        const hasAccess = authRules[userRoll][moduleName][method];

        if(hasAccess === "false") {
            throw new Unauthorized('Cannot access this resource!');
        }
        if(hasAccess === undefined) {
            throw new NotAvailable('This service is unavaliable!');
        }

        resolve(hasAccess)
    })
}