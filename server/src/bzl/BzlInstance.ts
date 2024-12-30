import { ModelsInstance } from "../models/ModelsInstance";
import { AuthLib } from "./lib/AuthLib";
import { ProjectLib } from "./lib/ProjectLib";
import { TaskLib } from "./lib/TaskLib";
import { TeamLib } from "./lib/TeamLib";
import { UserLib } from "./lib/UserLib";

export class BzlInstance {
    public authLib: AuthLib;
    public userLib: UserLib;
    public taskLib: TaskLib;
    public projectLib: ProjectLib;
    public teamLib: TeamLib;
    private modelsInstance: ModelsInstance;

    constructor(models: ModelsInstance, hashSalt: string) {
        this.modelsInstance = models;
        this.authLib = new AuthLib(models.userModel, hashSalt);
        this.userLib = new UserLib(models.userModel);
        this.taskLib = new TaskLib(models.taskModel);
        this.projectLib = new ProjectLib(models.projectModel);
        this.teamLib = new TeamLib(models.teamModel);
    }
}