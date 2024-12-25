import { Request, Response } from "express";
import * as authBzl from '../../bzl/coreBzl/auth';
import { LoginRequest, RegisterRequest } from "../../types";
import { registerBodySchema } from "../../schemas/auth_schema";
import { BadRequest } from "../../errors/CustomErrors";

export class AuthMiddleware {
    
    login(req: Request, res: Response) {
        const loginRequest: LoginRequest = {
            username: req.body.username,
            password: req.body.password
        }

        
        // return authBzl.login(loginRequest);
    }

    async register(req: Request, res: Response): Promise<boolean> {
        const zodParser = registerBodySchema.safeParse(req.body);
        if(zodParser.success === false) {
            throw new BadRequest('Invalid registration data.');
        }

        return authBzl.register(zodParser.data);
    }
}