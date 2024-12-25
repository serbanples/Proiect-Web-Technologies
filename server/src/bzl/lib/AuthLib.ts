import { UserModel } from "../../models/lib/UserModel";
import * as jwt from 'jsonwebtoken';
import { LoginRequest, RegisterRequest, UserInfo } from "../../types";
import * as bcrypt from 'bcryptjs';
import _ from "lodash";
import { UserModelType } from "../../models/types";
import { BadRequest } from "../../errors/CustomErrors";


export class AuthLib {
    private userModel: UserModel;
    private hashSalt: string;

    constructor(userModel: UserModel, hashSalt: string) {
        this.userModel = userModel;
        this.hashSalt = hashSalt;
    }

    async login(form: LoginRequest){
        
    }

    /**
     * Method used to register a user.
     * 
     * @param {RegisterRequest} form registration form sent by user.
     * @returns {UserModelType} registered user data.
     */
    async register(form: RegisterRequest): Promise<UserModelType> {
        if(form.password !== form.confirmedPassword)
            throw new BadRequest('Passwords dont match!');

        const user: UserInfo = {
            name: form.name,
            password: this.hashPassword(form.password),
            email: form.email,
            createdAt: new Date()
        };

        return this.userModel.findOne({ email: user.email })
            .then((foundUser) => {
                if(!_.isNil(foundUser))
                    throw new BadRequest('User already exists');
                return this.userModel.create(user as UserModelType);
            })
            .then((user) => {
                return _.omit(user, 'password') as UserModelType;
            })
    }

    async findUser(username: string, password: string) {
        const user = await this.userModel.findOne({ username: username });
        if(!_.isNil(user)) {
            if(bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                throw Error('Incorrect password');
            }
        } else {
            throw Error('User not found');
        }
    }

    private hashPassword(password: string) {
        return bcrypt.hashSync(password, this.hashSalt);
    }

}