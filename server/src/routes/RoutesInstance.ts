import { Router } from "express";
import { AuthRoutes } from "./lib/AuthRoutes"
import { MiddlewareInstance } from "../middleware/MiddlewareInstance";

export class RoutesInstance {
    public authRoutes: AuthRoutes;
    private middlewareInstance: MiddlewareInstance;
    private router: Router = Router();

    constructor(middlewares: MiddlewareInstance) {
        this.middlewareInstance = middlewares;
        this.authRoutes = new AuthRoutes(this.middlewareInstance.authMiddleware);
        this.router.use('/api', this.initializeRoutes())
    }

    getRouter(): Router {
        return this.router;
    }

    /**
     * Method used to initialize the routes
     * 
     * @returns {Router} router with all application routes
     */
    private initializeRoutes(): Router {
        const router = Router();
        router.use('/auth', this.authRoutes.getRouter());

        return router;
    }
}