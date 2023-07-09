import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { User } from 'src/app/users/entities/user.entity';
import { Role } from 'src/app/users/enum/role.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash('password', salt);

    const admin = this.userRepository.create({
      email: 'admin@gmail.com',
      username: 'admin',
      password: hashPass,
      name: 'admin',
      age: 23,
      roles: [Role.ADMIN, Role.USER],
    });

    return this.userRepository.save(admin);
  }

  async drop(): Promise<any> {
    return this.userRepository.delete({ username: 'admin' });
  }
}
