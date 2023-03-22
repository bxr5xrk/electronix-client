export interface IUser {
    email: string;
    name: string;
    role: IRole;
}

export type IRole = 'client' | 'manager' | 'admin';

export interface AuthRes {
    token: string;
    name: string;
    email: string;
    role: IRole;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegisterProps {
    email: string;
    password: string;
    name: string;
}
