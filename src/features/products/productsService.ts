import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type RootState, useAppSelector } from '../../app/store';
import { API_URL, LIMIT_ITEMS } from '../../data';
import { stringifyFiltersToParam, stringifyPriceToParam } from '../../utils';
import type {
    ICreateProductProps,
    IGetPaginatedProductsParams,
    IGetPaginatedProductsRes,
    IProduct
} from './productsInterfaces';
import { selectProducts } from './productsSlice';

export const productsApi = createApi({
    reducerPath: 'productsService',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPaginatedProducts: builder.query<
            IGetPaginatedProductsRes,
            IGetPaginatedProductsParams
        >({
            query: ({ page, query, brands, categories, priceRange }) => {
                const _query = query.length > 0 ? `q=${query ?? ''}` : '';

                const pagination = `&page=${page}&limit=${LIMIT_ITEMS}`;

                const _brands =
                    brands.length > 0 ? `&${brands.replaceAll(' ', '_')}` : '';

                const _categories =
                    categories.length > 0
                        ? `&${categories.replaceAll(' ', '_')}`
                        : '';

                const _priceRange = `&${priceRange}`;

                return `products?${_query}${pagination}${_brands}${_categories}${_priceRange}`;
            },
            transformResponse: (apiResponse: IProduct[], meta) => {
                return {
                    products: apiResponse,
                    totalCount: Number(
                        meta?.response?.headers.get('X-Total-Count')
                    )
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.products.map(
                              ({ id }) => ({ type: 'Products', id } as const)
                          ),
                          { type: 'Products', id: 'LIST' }
                      ]
                    : [{ type: 'Products', id: 'LIST' }]
        }),

        createProduct: builder.mutation<unknown, ICreateProductProps>({
            query: ({
                title,
                price,
                rating,
                categoryName,
                brandName,
                images
            }) => ({
                url: 'products',
                method: 'POST',
                body: {
                    title,
                    price,
                    rating,
                    categoryName,
                    brandName,
                    images
                }
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }]
        }),

        deleteProduct: builder.mutation<unknown, { id: number }>({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }]
        }),

        getProductById: builder.query<IProduct, string | undefined>({
            query: (id) => `products/${id ?? ''}`
        }),

        getBrands: builder.query<string[], unknown>({
            query: () => 'brands'
        }),

        getCategories: builder.query<string[], unknown>({
            query: () => 'categories'
        })
    })
});

const useProducts = () => {
    const {
        currentPage,
        query,
        activeBrands,
        activeCategories,
        activePriceRange
    } = useAppSelector(selectProducts);

    return productsApi.useGetPaginatedProductsQuery({
        page: currentPage,
        query,
        brands: stringifyFiltersToParam(activeBrands, 'brand'),
        categories: stringifyFiltersToParam(activeCategories, 'category'),
        priceRange: stringifyPriceToParam(activePriceRange)
    });
};

const {
    useGetBrandsQuery: useGetBrands,
    useGetCategoriesQuery: useGetCategories,
    useGetProductByIdQuery: useGetProduct,
    useCreateProductMutation: useCreateProduct,
    useDeleteProductMutation: useDeleteProduct
} = productsApi;

export {
    useProducts,
    useGetBrands,
    useGetCategories,
    useGetProduct,
    useCreateProduct,
    useDeleteProduct
};
