import type {
    IPriceRange,
    IProduct
} from './../features/products/products.interfaces';

export const stringifyPriceToParam = ({ min, max }: IPriceRange) =>
    `price_gte=${min}&price_lte=${max}`;

export const stringifyFiltersToParam = (arr: string[], label: string) =>
    arr.map((i, index) => `${index !== 0 ? '&' : ''}${label}=${i}`).join('');

export const getPagesArr = (totalItems: number, limit: number) => {
    const pagesCount = Math.floor(totalItems / limit);

    const pagesArr = [...Array(pagesCount)].map((_, index) => index + 1);

    return pagesArr;
};

export const addOrRemoveItemFromArr = (
    arr: IProduct[],
    currentItem: IProduct
) => {
    const copyArr = [...arr];

    const isIncludes = copyArr.find((i) => i.id === currentItem.id);

    return isIncludes !== undefined
        ? [...copyArr.filter((i) => i.id !== isIncludes.id)]
        : [...copyArr, currentItem];
};

export const setToLocalStorage = <T>(key: string, value: T) =>
    localStorage.setItem(key, JSON.stringify(value));
