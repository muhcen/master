import { Role } from '../enum/role.enum';

export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password: string;
  name: string;
  age: number;
  roles?: Role[];
  createAt?: Date;
}
