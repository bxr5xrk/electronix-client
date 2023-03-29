import { MAX } from '../config';

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
                if (Object.hasOwnProperty.call(params, key)) {
                    const existingValue = params[key];

                    params[key] = [
                        ...existingValue,
                        value.replaceAll('%20', ' ')
                    ];
                } else {
                    params[key] = [value.replaceAll('%20', ' ')];
                }
                break;
            case 'min_price':
            case 'max_price':
            case 'page':
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
                return value.map((v: string) => `${key}=${v}`).join('&');
            } else if (typeof value === 'number') {
                return `${key}=${value}`;
            } else {
                return '';
            }
        })
        .filter((i) => Boolean(i))
        .join('&');
}
