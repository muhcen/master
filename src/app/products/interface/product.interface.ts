import { User } from 'src/app/users/entities/user.entity';

export interface IProduct {
  _id?: string;

  name: string;

  description: string;

  price: number;

  user?: User;
}
