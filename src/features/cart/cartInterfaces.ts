import { type IProduct } from '../products/productsInterfaces';

export interface ICartItem extends IProduct {
    count: number;
}
