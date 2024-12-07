import { AuthMiddleware } from "./lib/AuthMiddleware";

export class MiddlewareInstance {
    public authMiddleware: AuthMiddleware = new AuthMiddleware();
}