import { type ICartItem } from '../cart/cartInterfaces';

export interface ICreateOrderProps {
    productIds: number[];
    city: string;
    address: string;
}

export interface UpdateOrderStatusProps {
    orderId: number;
    status: Status;
}

export type Status = 'processing' | 'shipped' | 'delivered';

export interface ICreateOrderRes {
    id: number;
}

export interface IOrder {
    id: number;
    datetime: string;
    totalprice: number;
    address: string;
    city: string;
    products: ICartItem[];
    status: Status;
}
