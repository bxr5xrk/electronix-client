import { type RootState } from '@/app/store';
import { API_URL } from '@/data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    ICreateOrderRes,
    ICreateOrderProps,
    IOrder
} from './orderInterfaces';

export const orderApi = createApi({
    reducerPath: 'orderService',
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/custom`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation<ICreateOrderRes, ICreateOrderProps>({
            query: ({ productIds, address, city }) => ({
                url: '',
                method: 'POST',
                body: {
                    productIds,
                    address,
                    city
                }
            }),
            invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
        }),

        getOrders: builder.query<IOrder[], unknown>({
            query: () => '',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Orders', id } as const)
                          ),
                          { type: 'Orders', id: 'LIST' }
                      ]
                    : [{ type: 'Orders', id: 'LIST' }]
        })
    })
});

const {
    useCreateOrderMutation: useCreateOrder,
    useGetOrdersQuery: useGetOrders
} = orderApi;

export { useCreateOrder, useGetOrders };
