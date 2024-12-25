import { describe, expect, it } from "@jest/globals";
import * as auth from "../../src/bzl/coreBzl/auth";
import { RegisterRequest } from "../../src/types";
import { UserModel } from "../../src/models/lib/UserModel";
import { UserModelType } from "../../src/models/types";
// import { Factory } from "../../factory";

describe('Tests for register user method', () => {
    
    it('Should create user', async () => {
        const registerForm: RegisterRequest = {
            name: 'serban',
            email: 'serban@mail.com',
            password: 'bubu',
            confirmedPassword: 'bubu'
        };

        const mockUser = {
            name: 'serban',
            password: 'hashashash',
            email: 'serban@mail.com'
        } as unknown as UserModelType;

        // (UserModel.prototype.findOne as jest.Mock).mockReturnValue(Promise.resolve(mockUser))
        jest.spyOn(UserModel.prototype, 'findOne').mockResolvedValue(null);
        jest.spyOn(UserModel.prototype, 'create').mockResolvedValue(mockUser);

        return auth.register(registerForm)
            .then((result) => expect(result).toBeTruthy())
    })

    it('Should throw error if passwords dont match', async () => {
        const registerForm: RegisterRequest = {
            name: 'serban',
            email: 'serban@mail.com',
            password: 'bubu',
            confirmedPassword: 'cucu'
        };

        return auth.register(registerForm)
            .catch(error => expect(error.message).toBe('Passwords dont match!'));
    })

    it('Should throw error if user already exists', async () => {
        const registerForm: RegisterRequest = {
            name: 'serban',
            email: 'serban@mail.com',
            password: 'bubu',
            confirmedPassword: 'bubu'
        };

        const mockUser = {
            name: 'serban',
            password: 'hashashash',
            email: 'serban@mail.com'
        } as unknown as UserModelType;

        jest.spyOn(UserModel.prototype, 'findOne').mockResolvedValue(mockUser);

        return auth.register(registerForm)
            .catch(error => expect(error.message).toBe('User already exists'));
    })
});

describe('Tests for login user method', () => {
    
})