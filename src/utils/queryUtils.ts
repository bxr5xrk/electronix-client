import { MAX } from '../data';

export interface IParamsObj {
    categories: string[];
    brands: string[];
    min_price: number;
    max_price: number;
    page: number;
}

export function urlToObj(url: string): IParamsObj {
    const params: IParamsObj = {
        categories: [],
        brands: [],
        min_price: 0,
        max_price: MAX,
        page: 1
    };

    url.split('&').forEach((param) => {
        const [key, value] = param.split('=');

        switch (key) {
            case 'categories':
            case 'brands':
                // If the key is 'categories' or 'brands', convert the value to an array and add it to the object
                if (Object.hasOwnProperty.call(params, key)) {
                    const existingValue = params[key];
                    params[key] = [...existingValue, value];
                } else {
                    params[key] = [value];
                }
                break;
            case 'min_price':
            case 'max_price':
            case 'page':
                // If the key is 'min_price', 'max_price', or 'page', parse the value as a number and add it to the object
                params[key] = Number(value);
                break;
            default:
                break;
        }
    });

    return params;
}

export function objToUrl(params: IParamsObj): string {
    return Object.entries(params)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                // If the value is an array, create multiple parameters with the same key for each value
                return value.map((v: string) => `${key}=${v}`).join('&');
            } else if (typeof value === 'number') {
                // If the value is a number, convert it to a string
                return `${key}=${value}`;
            } else {
                return '';
            }
        })
        .filter((i) => Boolean(i))
        .join('&');
}
