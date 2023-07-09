import {
    IsEAN,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsStrongPassword,
    MaxLength,
    Min,
    MinLength,
    min,
    minLength,
} from 'class-validator';
import { Role } from '../enum/role.enum';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements IUser {
    @IsNotEmpty()
    @IsEmail()
    @MinLength(4)
    @MaxLength(50)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(18)
    age: number;
}
