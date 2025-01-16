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