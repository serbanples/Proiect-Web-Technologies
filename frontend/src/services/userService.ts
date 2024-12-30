import { User } from "../components/types";
import { POST_REQUEST } from "./requests";

export const findUsersRequest = async () => {
    return POST_REQUEST('/user/browse', { populate: true })
        .then(async (response) => {
            if(response.status === 200) {
                const users = await response.json();
                // console.log(users);
                return users.result as User[];
            } else {
                throw new Error('Failed to fetch users');
            }
        })
}