import { type RootState } from '@/app/store';
import { API_URL } from '@/data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type ILog,
    type IUpdateUserRoleProps,
    type IUser
} from './usersInterface';

export const usersApi = createApi({
    reducerPath: 'usersService',
    tagTypes: ['Users', 'Logs'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),

    endpoints: (builder) => ({
        updateUserRole: builder.mutation<unknown, IUpdateUserRoleProps>({
            query: ({ id, role }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: {
                    role
                }
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }]
        }),

        getUsers: builder.query<IUser[], unknown>({
            query: () => 'users',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Users', id } as const)
                          ),
                          { type: 'Users', id: 'LIST' }
                      ]
                    : [{ type: 'Users', id: 'LIST' }]
        }),

        getLogs: builder.query<ILog[], unknown>({
            query: () => 'logs',
            providesTags: () => [{ type: 'Logs', id: 'LIST' }]
        })
    })
});

const {
    useGetUsersQuery: useGetUsers,
    useUpdateUserRoleMutation: useUpdateRole,
    useGetLogsQuery: useGetLogs
} = usersApi;

export { useGetUsers, useUpdateRole, useGetLogs };
