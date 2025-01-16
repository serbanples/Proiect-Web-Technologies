import { POST_REQUEST } from "./requests";

export const browseTeamRequest = async (filters?: object) => {
  return POST_REQUEST('/team/browse', { ...filters, populate: true })
      .then(async (response) => {
          if(response.status === 200) {
              const projects = await response.json();
              return projects.result as any;
          } else {
              const error = await response.json();
              throw new Error(error.error);
          }
      })
}