import { Router } from "express";
import { AuthRoutes } from "./lib/AuthRoutes"
import { MiddlewareInstance } from "../middleware/MiddlewareInstance";

export class RoutesInstance {
    public authRoutes: AuthRoutes;
    private middlewareInstance: MiddlewareInstance;
    private router: Router = Router();

    constructor(middlewares: MiddlewareInstance) {
        this.middlewareInstance = middlewares;
        this.authRoutes = new AuthRoutes(middlewares.authMiddleware);
        this.initializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    private initializeRoutes(): void {
        this.router.use('/auth', this.authRoutes.getRouter());
    }
}