import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProduct } from './products.interfaces';

const API_URL = 'https://e-commerce-server-kappa.vercel.app';
export const limit = 9;

export const productsApi = createApi({
    reducerPath: 'productsService',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query<
            { products: IProduct[]; totalCount: number },
            { page: number; query: string }
        >({
            query: ({ page, query }: { page: number; query: string }) =>
                `products?q=${query ?? ''}&_page=${page}&_limit=${limit}`,
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
