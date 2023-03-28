import { API_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type AuthRes,
    type LoginProps,
    type RegisterProps
} from './authInterfaces';

export const authApi = createApi({
    reducerPath: 'authService',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/auth` }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthRes, LoginProps>({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: {
                    password,
                    email
                }
            })
        }),

        register: builder.mutation<AuthRes, RegisterProps>({
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
