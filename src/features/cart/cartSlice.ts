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
import { type ICartItem } from './cartInterfaces';
import { CART_LS_KEY } from '@/config';

const cartItemsFromLS = JSON.parse(localStorage.getItem(CART_LS_KEY) ?? '[]');

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
            const newItem = createItem(action.payload);

            state.cartItems = [...state.cartItems, newItem];
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = [...removeItem(state.cartItems, action.payload)];
        },
        incrementCartItem: (state, action: PayloadAction<number>) => {
            state.cartItems = [
                ...incrementOrDecrementItem(
                    state.cartItems,
                    action.payload,
                    'increment'
                )
            ];
        },
        decrementCartItem: (state, action: PayloadAction<number>) => {
            state.cartItems = [
                ...incrementOrDecrementItem(
                    state.cartItems,
                    action.payload,
                    'decrement'
                )
            ];
        },
        resetCart: (state) => {
            state.cartItems = [];
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
    decrementCartItem,
    resetCart
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
