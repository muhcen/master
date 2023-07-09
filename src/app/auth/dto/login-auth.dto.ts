import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(4)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
