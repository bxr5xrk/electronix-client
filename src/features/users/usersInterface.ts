import type { IRole, IUserAuth } from '../auth/authInterfaces';

export interface IUser extends IUserAuth {
    id: number;
}

export interface IUpdateUserRoleProps {
    id: number;
    role: IRole;
}
