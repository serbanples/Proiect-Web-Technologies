import * as mongoose from 'mongoose'
import { UserModel } from './lib/UserModel';
import { ProjectModel } from './lib/ProjectModel';
import { TaskModel } from './lib/TaskModel';
import { TeamModel } from './lib/TeamModel';

export class ModelsInstance {
    private mongoose: mongoose.Mongoose;
    public userModel: UserModel;
    public projectModel: ProjectModel;
    public taskModel: TaskModel;
    public teamModel: TeamModel;

    constructor(mongoose: mongoose.Mongoose) {
        this.mongoose = mongoose;
        this.userModel = new UserModel(mongoose);
        this.projectModel = new ProjectModel(mongoose);
        this.taskModel = new TaskModel(mongoose);
        this.teamModel = new TeamModel(mongoose);
    }


}