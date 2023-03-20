import { API_URL } from '@/data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type IRole } from './authInterfaces';

interface LoginRes {
    token: string;
    name: string;
    email: string;
    role: IRole;
}

interface RegisterRes {
    token: string;
    name: string;
    email: string;
    role: IRole;
}

interface LoginProps {
    email: string;
    password: string;
}

interface RegisterProps {
    email: string;
    password: string;
    name: string;
}

export const authApi = createApi({
    reducerPath: 'authService',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/auth` }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginRes, LoginProps>({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: {
                    password,
                    email
                }
            })
        }),

        register: builder.mutation<RegisterRes, RegisterProps>({
            query: ({ email, password, name }) => ({
                url: 'register',
                method: 'POST',
                body: {
                    password,
                    email,
                    name
                }
            })
        })
    })
});

const { useLoginMutation: useLogin, useRegisterMutation: useRegister } =
    authApi;

export { useLogin, useRegister };
