import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { IProduct } from '../products/productsInterfaces';

const wishListItemsFromLS = JSON.parse(
    localStorage.getItem('wishList') ?? '[]'
);

export interface wishListState {
    wishListItems: IProduct[];
}

const initialState: wishListState = {
    wishListItems: wishListItemsFromLS
};

export const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        setWishListItems: (state, action: PayloadAction<IProduct[]>) => {
            state.wishListItems = [...action.payload];
        }
    }
});

export const { setWishListItems } = wishListSlice.actions;

export const selectWishList = (state: RootState) => state.wishList;

export default wishListSlice.reducer;
