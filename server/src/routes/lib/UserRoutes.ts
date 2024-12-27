import { NextFunction, Request, Response, Router } from "express";
import { UserMiddleware } from "../../middleware/lib/UserMiddleware";
import { sendErrorResponse, sendValidResponse, verifyToken } from "../helper";
import { RequestWrapper } from "../../types";

export class UserRoutes {
    private router: Router = Router();
    private middleware: UserMiddleware;

    constructor(authMiddleware: UserMiddleware) {
        this.middleware = authMiddleware;
        this.initializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    /**
     * Method used to initiailize the user routes
     * 
     * @returns {void} creates the user routes
     */
    private initializeRoutes(): void {
        this.router.delete('/delete', verifyToken, this.delete.bind(this));
        this.router.post('/browse', verifyToken, this.browse.bind(this));
    }

    private async browse(req: RequestWrapper, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.browse(req)
            .then((response) => sendValidResponse(response, res, 200))
            .catch(error => sendErrorResponse(error, res));
    }

    /**
     * Method used to handle the login requests
     * 
     * @param {Request} req request
     * @param {Response} res response
     * @param {NextFunction} next callback function
     * @returns {Promise<void>} handles login requests
     */
    private async delete(req: RequestWrapper, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.delete(req)
            .then((response) => {
                sendValidResponse(response, res, 200);
            })
            .catch(error => {sendErrorResponse(error, res)});
    }

}