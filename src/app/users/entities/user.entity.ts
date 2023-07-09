import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { IUser } from '../interface/user.interface';
import { Role } from '../enum/role.enum';
import { Product } from 'src/app/products/entities/product.entity';

@Entity()
export class User implements IUser {
  @ObjectIdColumn()
  _id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: true })
  roles: Role[] = [Role.USER];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @CreateDateColumn()
  createAt: Date;
}
