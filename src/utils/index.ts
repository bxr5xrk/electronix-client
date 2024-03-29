import { type ICartItem } from '@/features/cart/cartInterfaces';
import type {
    IPriceRange,
    IProduct
} from '../features/products/productsInterfaces';

// compare classNames
export const cl = (...classes: Array<string | undefined | boolean | null>) => {
    return classes.filter((i) => Boolean(i) && typeof i === 'string').join(' ');
};

// make search param from price values
export const stringifyPriceToParam = ({ min, max }: IPriceRange) =>
    `price_gte=${min}&price_lte=${max}`;

// make search param from filters
export const stringifyFiltersToParam = (arr: string[], label: string) =>
    arr.map((i, index) => `${index !== 0 ? '&' : ''}${label}=${i}`).join('');

// create array with page numbers
export const getPagesArr = (totalItems: number, limit: number) => {
    const pagesCount = Math.ceil(totalItems / limit);

    const pagesArr = [...Array(pagesCount)].map((_, index) => index + 1);

    return pagesArr;
};

// manipulate array (add / remove)
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

// set data to localStorage
export const setToLocalStorage = <T>(key: string, value: T) =>
    localStorage.setItem(key, JSON.stringify(value));

export const arrayFromNumber = (number: number) =>
    [...Array(Math.round(number))].map((_, i) => i);

export const createArrayFromProductIds = (products: ICartItem[]): number[] =>
    products.map((i) => [...Array(i.count)].map((_) => i.id)).flat();

// split a given number into groups of three digits
export const formatPrice = (number: number) => {
    const split = String(number).split('.');
    split[0] = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return `$ ${split.join('.')}`;
};

export const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        hourCycle: 'h24'
    }).format(date);

    return formattedDate.slice(0, -3);
};

export const toggleTheme = (theme: 'dark' | 'light') => {
    const root = document.getElementById('root');

    if (root) {
        theme === 'dark'
            ? root.classList.add('dark')
            : root.classList.remove('dark');
    }
};
