import { type ICartItem } from '@/features/cart/cartInterfaces';
import type { IProduct } from '@/features/products/productsInterfaces';

const createItem = (item: IProduct): ICartItem => ({ ...item, count: 1 });

const removeItem = (items: ICartItem[], id: number) => [
    ...items.filter((i) => i.id !== id)
];

const incrementOrDecrementItem = (
    items: ICartItem[],
    id: number,
    action: 'increment' | 'decrement'
) => {
    const item = items.find((i) => i.id === id);

    if (!item) {
        return [...items];
    }

    if (action === 'decrement') {
        item.count--;

        if (item.count === 0) {
            return items.filter((item) => item.id !== id);
        }
    } else if (action === 'increment') {
        item.count++;
    }

    return [...items];
};

const manageCartItems = (
    arr: ICartItem[],
    action: 'increment' | 'decrement' | 'remove' | 'add',
    id: number,
    newItem?: IProduct
): ICartItem[] => {
    if (action === 'increment') {
        return arr.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i));
    }

    if (action === 'decrement') {
        return arr
            .map((i) => (i.id === id ? { ...i, count: i.count - 1 } : i))
            .filter((i) => i.count >= 1);
    }

    if (action === 'add' && newItem) {
        return [...arr, { ...newItem, count: 1 }];
    }

    return arr.filter((i) => i.id !== id);
};

export { createItem, removeItem, incrementOrDecrementItem, manageCartItems };
