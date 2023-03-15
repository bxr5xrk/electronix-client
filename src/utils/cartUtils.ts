import type { ICartItem } from '@/features/cart/cartSlice';
import type { IProduct } from '@/features/products/productsInterfaces';

const createItem = (item: IProduct): ICartItem => ({ ...item, count: 1 });

const removeItem = (items: ICartItem[], id: string) => [
    ...items.filter((i) => i.id !== id)
];

const incrementOrDecrementItem = (
    items: ICartItem[],
    id: string,
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

export { createItem, removeItem, incrementOrDecrementItem };
