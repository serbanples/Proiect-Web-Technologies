import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware } from "../../middleware/lib/AuthMiddleware";
import { BadRequest, NotFound } from "../../errors/CustomErrors";

export class AuthRoutes {
    private router: Router = Router();
    private middleware: AuthMiddleware;

    constructor(authMiddleware: AuthMiddleware) {
        this.middleware = authMiddleware;
        this.initializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    /**
     * Method used to initiailize the auth routes
     * 
     * @returns {void} creates the auth routes
     */
    private initializeRoutes(): void {
        this.router.post('/login', this.login.bind(this));
        this.router.post('/register', this.register.bind(this));
    }

    /**
     * Method used to handle the login requests
     * 
     * @param {Request} req request
     * @param {Response} res response
     * @param {NextFunction} next callback function
     * @returns {void} handles login requests
     */
    private login(req: Request, res: Response, next?: NextFunction) {
        this.middleware.login(req, res)
            // .then((data) => res.send(data));
    }

    /**
     * Method used to handle the register requests
     * 
     * @param {Request} req request
     * @param {Response} res response
     * @param {NextFunction} next callback function
     * @returns {void} handles register requests
     */
    private register(req: Request, res: Response, next?: NextFunction) {
        return this.middleware.register(req, res)
            .then((result) => {
                res.statusCode = 201;
                res.send({ success: result })
            })
            .catch((error) => {
                console.log(error);
                if(error instanceof BadRequest) {
                    res.statusCode = 400;
                    res.send({ error: error.message });
                }
                else if(error instanceof NotFound) {
                    res.statusCode = 404;
                    res.send({ error: error.message });
                } else {
                    res.statusCode = 500;
                    res.send({ error: error.message });
                }
            })
    }
}