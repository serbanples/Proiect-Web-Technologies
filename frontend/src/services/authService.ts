import { config } from "../config/config";
import { UserContext } from "../types";
import { GET_REQUEST, POST_REQUEST } from "./requests";

/**
 * Method used to make a login request.
 * 
 * @param loginFormData login form sent by user.
 * @returns {Promise<void>} .
 */
export const loginRequest = async (loginFormData: Record<string, string>) => {
    return POST_REQUEST(`${config.baseUrl}/auth/login`, loginFormData)
        .then(async (response) => {
            if(response.status === 200) {
                return whoamiRequest().then(async (response) => {
                    if(response.status === 200) {
                        const userContext: UserContext = await response.json();
                        return userContext;
                    }
                })
            } else {
                const error = await response.json();
                throw new Error(error.error)
            }
        })
}

/**
 * Method used in order to make a register request.
 * 
 * @param registerFormData registration form sent by user.
 * @returns {Promise<void>} .
 */
export const registerRequest = async (registerFormData: Record<string, string>) => {
    return POST_REQUEST(`${config.baseUrl}/auth/register`, registerFormData)
        .then(() => {
            loginRequest({ email: registerFormData.email, password: registerFormData.password });
        });
}

export const whoamiRequest = async () => {
    return GET_REQUEST(`${config.baseUrl}/auth/whoami`);
}