import { describe, expect, it, jest } from "@jest/globals";
import * as auth from "../../src/bzl/coreBzl/auth";
import { LoginRequest, RegisterRequest } from "../../src/types";
import { UserModel } from "../../src/models/lib/UserModel";
import { UserModelType } from "../../src/models/types";
import { mockUser, mockUserContext } from "../mocks/auth_mocks";
import { BadRequest, NotFound, Unauthorized } from "../../src/errors/CustomErrors";
import { AuthLib } from "../../src/bzl/lib/AuthLib";
import * as jwt from 'jsonwebtoken';
// import { Factory } from "../../factory";

describe('Tests for register user method', () => {
    
    it('Should create user', async () => {
        const registerForm: RegisterRequest = {
            name: 'serban',
            email: 'serban@mail.com',
            password: 'bubu',
            confirmPassword: 'bubu'
        };

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
            confirmPassword: 'cucu'
        };

        return auth.register(registerForm)
            .catch(error => { 
                expect(error.message).toBe('Passwords dont match!');
                expect(error).toBeInstanceOf(BadRequest);
            });
    })

    it('Should throw error if user already exists', async () => {
        const registerForm: RegisterRequest = {
            name: 'serban',
            email: 'serban@mail.com',
            password: 'bubu',
            confirmPassword: 'bubu'
        };

        const mockUser = {
            name: 'serban',
            password: 'hashashash',
            email: 'serban@mail.com'
        } as unknown as UserModelType;

        jest.spyOn(UserModel.prototype, 'findOne').mockResolvedValue(mockUser);

        return auth.register(registerForm)
            .catch(error => { 
                expect(error.message).toBe('User already exists');
                expect(error).toBeInstanceOf(BadRequest);
            });
    })
});

describe('Tests for login user method', () => {
    it('should return jwt token if user exists', () => {
        const loginForm: LoginRequest = {
            email: 'serban@mail.com',
            password: 'cucu'
        }

        jest.spyOn(UserModel.prototype, 'findOneWithPassword').mockResolvedValueOnce(mockUser);
        jest.spyOn(AuthLib.prototype as any, 'comparePasswords').mockResolvedValueOnce(true);

        return auth.login(loginForm)
            .then(result => expect(typeof result === 'string').toBeTruthy());
    })

    it('Should throw error if user does not exist', () => {
        const loginForm: LoginRequest = {
            email: 'serban@mail.com',
            password: 'cucu'
        }

        jest.spyOn(UserModel.prototype, 'findOneWithPassword').mockResolvedValueOnce(null);

        return auth.login(loginForm)
            .catch(error => {
                expect(error.message).toBe('User not found!');
                expect(error).toBeInstanceOf(NotFound);
            })
    })

    it('Should throw error if password is incorrect', () => {
        const loginForm: LoginRequest = {
            email: 'serban@mail.com',
            password: 'cucu'
        }

        jest.spyOn(UserModel.prototype, 'findOneWithPassword').mockResolvedValueOnce(mockUser);

        return auth.login(loginForm)
            .catch(error => {
                expect(error.message).toBe('Incorrect password!');
                expect(error).toBeInstanceOf(BadRequest);
            })
    })
})

describe('Tests for decode token method', () => {
    it('Should return user context if token is valid token', () => {
        const token = 'super secret token';

        jest.spyOn(AuthLib.prototype, 'verifyToken').mockReturnValueOnce(mockUserContext)

        const userContext = auth.decodeToken(token);

        expect(userContext).toStrictEqual({ id: '123', email: 'user@email.com' });
    })

    it('Should throw unauthorized error if token is invalid', () => {
        const token = 'secret token';

        try {
            auth.decodeToken(token);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Unauthorized);
            expect(error.message as any).toBe('Invalid token!');
        }
    })
})