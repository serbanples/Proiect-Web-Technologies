import { AuthMiddleware } from "./lib/AuthMiddleware";
import { UserMiddleware } from "./lib/UserMiddleware";

export class MiddlewareInstance {
    public authMiddleware: AuthMiddleware = new AuthMiddleware();
    public userMiddleware: UserMiddleware = new UserMiddleware();
}