import { UserModelType } from "../../src/models/types";
import { UserContext } from "../../src/types";

export const mockUser = {
    name: 'serban',
    password: 'hashashash',
    email: 'serban@mail.com'
} as unknown as UserModelType;

export const mockUserContext = {
    id: '123',
    email: 'user@email.com'
} as UserContext;