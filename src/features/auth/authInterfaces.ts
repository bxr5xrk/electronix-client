export interface IUser {
    email: string;
    name: string;
    role: IRole;
}

export type IRole = 'client' | 'manager' | 'admin';
