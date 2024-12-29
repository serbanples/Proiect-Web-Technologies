import { AuthMiddleware } from "./lib/AuthMiddleware";
import { ProjectMiddleware } from "./lib/ProjectMiddleware";
import { TaskMiddleware } from "./lib/TaskMiddleware";
import { UserMiddleware } from "./lib/UserMiddleware";

export class MiddlewareInstance {
    public authMiddleware: AuthMiddleware = new AuthMiddleware();
    public userMiddleware: UserMiddleware = new UserMiddleware();
    public taskMiddleware: TaskMiddleware = new TaskMiddleware();
    public projectMiddleware: ProjectMiddleware = new ProjectMiddleware();
}