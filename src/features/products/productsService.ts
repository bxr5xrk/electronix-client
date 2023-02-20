import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProduct } from './products.interfaces';

const API_URL = 'https://e-commerce-server-kappa.vercel.app';
const limit = 9;

export const productsApi = createApi({
    reducerPath: 'productsService',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query<
            { products: IProduct[]; totalCount: number },
            { page: number }
        >({
            query: ({ page }: { page: number }) =>
                `products?_page=${page}&_limit=${limit}`,
            transformResponse(apiResponse: IProduct[], meta) {
                return {
                    products: apiResponse,
                    totalCount: Number(
                        meta?.response?.headers.get('X-Total-Count')
                    )
                };
            }
        })
    })
});

export const { useGetPaginatedProductsQuery: useGetProducts } = productsApi;
