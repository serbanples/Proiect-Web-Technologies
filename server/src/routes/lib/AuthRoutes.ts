import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware } from "../../middleware/lib/AuthMiddleware";

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

    private initializeRoutes(): void {
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
    }

    private login(req: Request, res: Response, next?: NextFunction) {
        res.send({login: 'bubu'});
    }

    private register(req: Request, res: Response, next?: NextFunction) {
        res.send({register: 'cucu'});
    }
}