export interface IProduct {
    id: number;
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
    priceRange: string;
}

export interface IPriceRange {
    min: number;
    max: number;
}

export interface ICreateProductProps {
    title: string;
    images: string[];
    brandName: string;
    categoryName: string;
    price: number;
    rating: number;
}
