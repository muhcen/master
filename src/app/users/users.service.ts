import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { FindOneOptions } from 'typeorm';
import { User } from 'src/app/users/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(userDto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepository.create(userDto);
            return this.userRepository.save(user);
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }

    async userExistsWithEmailOrPassword(email: string, username: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    $or: [{ email }, { username }],
                },
            });

            return user;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }

    async userExistsWithEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email,
                },
            });

            return user;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, error.status);
        }
    }
}
