import type { IRole, IUserAuth } from '../auth/authInterfaces';

export interface IUser extends IUserAuth {
    id: number;
}

export interface IUpdateUserRoleProps {
    id: number;
    role: IRole;
}

export interface ILog {
    id: string;
    datetime: string;
    action: IAction;
    user_name: string;
    product_name: string;
}

export type IAction = 'add' | 'remove';
