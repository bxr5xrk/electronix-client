import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IProduct } from '../products/productsInterfaces';
import {
    createItem,
    incrementOrDecrementItem,
    removeItem
} from '@/utils/cartUtils';
import { logout } from '../auth/authSlice';

// const cartItemsFromLS = JSON.parse(localStorage.getItem('cart') ?? '[]');

export interface ICartItem extends IProduct {
    count: number;
}

interface cartState {
    cartItems: ICartItem[];
}

const initialState: cartState = {
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<IProduct>) => {
            const newItem = createItem(action.payload);

            state.cartItems = [...state.cartItems, newItem];
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = [...removeItem(state.cartItems, action.payload)];
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
    },

    extraReducers: (builder) =>
        builder.addCase(logout, (state) => {
            state.cartItems = [];
        })
});

export const {
    addItemToCart,
    removeItemFromCart,
    incrementCartItem,
    decrementCartItem
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
