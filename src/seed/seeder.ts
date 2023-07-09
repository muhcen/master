import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from 'src/config/typeOrm.config';
import { User } from 'src/app/users/entities/user.entity';
import { UsersSeeder } from './user.seeder';

seeder({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
}).run([UsersSeeder]);
