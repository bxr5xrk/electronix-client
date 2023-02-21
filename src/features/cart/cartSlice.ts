import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IProduct } from '../products/productsInterfaces';

const cartItemsFromLS = JSON.parse(localStorage.getItem('cart') ?? '[]');

export interface cartState {
    cartItems: IProduct[];
}

const initialState: cartState = {
    cartItems: cartItemsFromLS
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<IProduct[]>) => {
            state.cartItems = [...action.payload];
        }
    }
});

export const { setCartItems } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
