import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpInput, UpdatePasswordInput, UpdateProfileInput } from './dto/user.input';
import { hashingPassword, comparePassword } from './hashing/bcrypt';
import { Profile, User } from './models/user.model';
import { NewUserSchema, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(NewUserSchema.name) private userModel: Model<UserDocument>) { }

    async signup(user: SignUpInput): Promise<User> {
        try {
            const isExist = await this.userModel.findOne({ username: user.username })
            if (isExist) throw new Error('Username already exist !')

            const hashedPassword = await hashingPassword(user.password)
            const userInfo: SignUpInput = {
                ...user,
                password: hashedPassword
            }
            const newUser = new this.userModel(userInfo)

            return await newUser.save()
        } catch (error) {
            throw new Error(error)
        }
    }

    async getUser(username: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ username })
            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    async profile(_id: string): Promise<Profile> {
        try {
            const user = await this.userModel
                .findById(_id)
                .select({
                    password: 0,
                    roles: 0,
                    _id: 0
                })

            return user
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProfile(_id: string, update: UpdateProfileInput): Promise<Profile> {
        try {
            await this.userModel.findByIdAndUpdate(_id, update)
            return await this.userModel.findById(_id)
        } catch (error) {
            throw new Error(error)
        }
    }

    async updatePassword(_id: string, update: UpdatePasswordInput): Promise<Profile> {
        try {
            const { currentPassword, newPassword } = update

            const user = await this.userModel.findById(_id)

            const isValidPassword = await comparePassword(currentPassword, user.password)
            if(!isValidPassword) throw new Error('Update Failed')

            let hashedPassword = await hashingPassword(newPassword)

            await this.userModel.findByIdAndUpdate(_id, {
                password: hashedPassword
            })

            return await this.userModel.findById(_id)
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async addNewOrder(_id: string, code: string): Promise<Profile> {
        try {
            return await this.userModel.findByIdAndUpdate(_id, {
                $push: {
                    orders: code
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }

}
