import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IProduct } from '../products/productsInterfaces';
import {
    createItem,
    incrementOrDecrementItem,
    removeItem
} from '@/utils/cartUtils';

const cartItemsFromLS = JSON.parse(localStorage.getItem('cart') ?? '[]');

export interface ICartItem extends IProduct {
    count: number;
}

interface cartState {
    cartItems: ICartItem[];
}

const initialState: cartState = {
    cartItems: cartItemsFromLS
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<IProduct>) => {
            state.cartItems = [...state.cartItems, createItem(action.payload)];
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = removeItem(state.cartItems, action.payload);
        },
        incrementCartItem: (state, action: PayloadAction<string>) => {
            state.cartItems = [
                ...incrementOrDecrementItem(
                    state.cartItems,
                    action.payload,
                    'increment'
                )
            ];
        },
        decrementCartItem: (state, action: PayloadAction<string>) => {
            state.cartItems = [
                ...incrementOrDecrementItem(
                    state.cartItems,
                    action.payload,
                    'decrement'
                )
            ];
        }
    }
});

export const {
    addItemToCart,
    removeItemFromCart,
    incrementCartItem,
    decrementCartItem
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
