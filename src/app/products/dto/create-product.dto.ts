import { User } from 'src/app/users/entities/user.entity';
import { IProduct } from '../interface/product.interface';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateProductDto implements IProduct {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    name: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(200)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(1000000)
    price: number;
}
