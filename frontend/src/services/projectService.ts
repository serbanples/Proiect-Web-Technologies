import { POST_REQUEST } from "./requests";

export const browseProjectsRequest = async (filters?: object) => {
  return POST_REQUEST('/project/browse', { ...filters, populate: true })
      .then(async (response) => {
          if(response.status === 200) {
              const tasks = await response.json();
              return tasks.result as any;
          } else {
              const error = await response.json();
              throw new Error(error.error);
          }
      })
}

export const updateProjectRequest = async (projectId: any, project: any) => {
  return POST_REQUEST('/project/update', { id: projectId, project: project })
      .then(async (response) => {
          const task = await response.json();
          return task.result as any;
      })
}