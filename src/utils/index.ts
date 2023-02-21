import type { IPriceRange } from './../features/products/products.interfaces';

export const stringifyPriceToParam = ({ min, max }: IPriceRange) =>
    `price_gte=${min}&price_lte=${max}`;

export const stringifyFiltersToParam = (arr: string[], label: string) =>
    arr.map((i, index) => `${index !== 0 ? '&' : ''}${label}=${i}`).join('');

export const getPagesArr = (totalItems: number, limit: number) => {
    const pagesCount = Math.floor(totalItems / limit);

    const pagesArr = [...Array(pagesCount)].map((_, index) => index + 1);

    return pagesArr;
};
