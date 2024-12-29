import { NextFunction, Response, Router } from "express";
import { sendErrorResponse, sendValidResponse, verifyToken } from "../helper";
import { RequestWrapper } from "../../types";
import { ProjectMiddleware } from "../../middleware/lib/ProjectMiddleware";

export class ProjectRoutes {
    private router: Router = Router();
    private middleware: ProjectMiddleware;

    constructor(authMiddleware: ProjectMiddleware) {
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
        this.router.post('/create', verifyToken, this.create.bind(this));
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
    private async create(req: RequestWrapper, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.create(req)
            .then((response) => {
                sendValidResponse(response, res, 201);
            })
            .catch(error => {sendErrorResponse(error, res)});
    }

}