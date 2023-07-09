import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { UsersService } from 'src/app/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Token } from './interface/token.interface';
import { Payload } from './interface/payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async register(createUserDto: CreateUserDto) {
        try {
            const { email, username, password } = createUserDto;

            const userExists =
                await this.usersService.userExistsWithEmailOrPassword(
                    email,
                    username,
                );

            if (userExists)
                throw new ConflictException(
                    "That email address or username is already registered. You sure you don't have an account?",
                );

            const salt = bcrypt.genSaltSync(12);
            const hashPass = await bcrypt.hash(password, salt);

            createUserDto.password = hashPass;

            const user = await this.usersService.createUser(createUserDto);

            return this.generateAccessToken(user);
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error);
        }
    }

    async login(loginAuthDto: LoginAuthDto) {
        try {
            const { email, password } = loginAuthDto;
            const user = await this.usersService.userExistsWithEmail(email);

            if (
                !user ||
                (user && !(await bcrypt.compare(password, user.password)))
            )
                throw new UnauthorizedException(
                    'Username or password may be incorrect. Please try again',
                );

            return this.generateAccessToken(user);
        } catch (error) {
            console.log(error.message);
            throw new BadRequestException(error);
        }
    }

    async generateAccessToken(user: User): Promise<Token> {
        try {
            const payload = {
                sub: user._id,
                email: user.email,
                roles: user.roles,
            };

            return {
                access_token: await this.jwtService.signAsync(payload, {
                    secret: this.configService.get<string>('JWT_SECRET_KEY'),
                }),
            };
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }
    }

    async extractPayload(token: string): Promise<Payload> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET_KEY'),
            });

            return payload;
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }
    }
}
