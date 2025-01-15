import * as Bluebird from 'bluebird';
import { Factory } from "../factory";
import users from './generated_users.json';
import teams from './generated_teams.json';
import projects from './generated_projects.json';
import tasks from './generated_tasks.json';

const createUsers = async () => {
  await Bluebird.Promise.each(users, async (user) => {
    const hash = await Factory.getInstance().getBzl().authLib.hashPassword(user.password);

    await Factory.getInstance().getModels().userModel.create({ ...user, password: hash});
  })
}

const createTeams = async () => {
  await Bluebird.Promise.each(teams, async(team) => {
    await Factory.getInstance().getModels().teamModel.create(team);
  })
}

const createProjects = async() => {
  await Bluebird.Promise.each(projects, async(project) => {
    await Factory.getInstance().getModels().projectModel.create(project);
  })
}

const createTasks = async() => {
  await Bluebird.Promise.each(tasks, async(task) => {
    await Factory.getInstance().getModels().taskModel.create(task);
  })
}

createTasks().then(() => (console.log('done')));