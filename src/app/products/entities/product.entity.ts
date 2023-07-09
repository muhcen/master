import { User } from 'src/app/users/entities/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IProduct } from '../interface/product.interface';

@Entity()
export class Product implements IProduct {
    @ObjectIdColumn()
    _id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    @ManyToOne(() => User, (user) => user.products)
    user: User;
}
