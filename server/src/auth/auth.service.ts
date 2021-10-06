import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/user/hashing/bcrypt';
import { UserService } from 'src/user/user.service';
import { SigninArgs } from './dto/auth.args';
import { SignIn } from './models/jwt.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async signin(user: SigninArgs): Promise<SignIn> {
        try {
            const userFound = await this.userService.getUser(user.username)
            if(!userFound) throw new UnauthorizedException()  

            const isPassMatch = await comparePassword(user.password, userFound.password) 
            if(!isPassMatch) throw new UnauthorizedException()

            const { username, _id, fullname, email, image_path, roles } = userFound
            const payload = { userId: _id, username: username }

            return {
                user: {
                    name: fullname,
                    email,
                    image: image_path,
                    roles
                },
                access_token: this.jwtService.sign(payload),
            }
        } catch (error) {
            throw new Error(error)
        }

    }
}
