import { Role } from 'src/app/users/enum/role.enum';

export interface Payload {
  sub: string;
  email: string;
  roles: Role[];
}
