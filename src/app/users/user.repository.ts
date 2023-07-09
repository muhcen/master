import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'src/repositories/base/base.abstract.repository';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository
    extends BaseAbstractRepository<User>
    implements BaseInterfaceRepository<User>
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super(userRepository);
    }

    create(userDto: CreateUserDto): User {
        try {
            const user = this.userRepository.create(userDto);
            return user;
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }
    }
}
