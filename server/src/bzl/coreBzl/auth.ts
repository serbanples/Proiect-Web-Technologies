import { Factory } from "../../factory";
import { LoginRequest, RegisterRequest } from "../../types";

export const login = async (loginRequest: LoginRequest) => {
    return Factory.getInstance().getBzl().authLib.login(loginRequest)
        .then()
}

export const checkLoggedIn = async (authStatusRequest: any) => {

}

export const register = async (registerRequest: RegisterRequest): Promise<boolean> => {
    return Factory.getInstance().getBzl().authLib.register(registerRequest)
        .then((user) => true)
        .catch((error) => { throw error; });
}