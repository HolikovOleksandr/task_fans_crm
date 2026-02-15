import { Role } from 'src/common/enums/role.enum';

export interface IJwtPayload {
  sub: string;
  role: Role;
}
