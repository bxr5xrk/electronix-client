export interface IProduct {
    id: string;
    brand: string;
    category: string;
    images: string[];
    price: number;
    rating: number;
    title: string;
}

export interface IGetPaginatedProductsRes {
    products: IProduct[];
    totalCount: number;
}

export interface IGetPaginatedProductsParams {
    page: number;
    query: string;
    brands: string;
    categories: string;
}
